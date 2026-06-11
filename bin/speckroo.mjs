#!/usr/bin/env node
// speckroo CLI — projects the canonical core/ into any tool's config layout.
// One source of truth (core/personas, core/commands, core/workflow.md,
// speckroo/.framework masters); every tool's files are generated from it here.

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, appendFileSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CWD = process.cwd();
const HOME = homedir();
const resolveHome = (p) => p.startsWith("~/") ? join(HOME, p.slice(2)) : p;

// ---- canonical manifest -----------------------------------------------------

const PERSONAS = [
  { key: "product-manager", desc: "Owns requirements, scope, priorities, success metrics. Drafts spec.md.", bash: false },
  { key: "product-designer", desc: "Owns UX/UI, user flows, design specs. Drafts design.md.", bash: false },
  { key: "monetization-strategist", desc: "Owns pricing, business model, revenue. Drafts monetization.md (optional).", bash: false },
  { key: "software-engineer", desc: "Owns architecture, plan, tasks, and code. Drafts plan.md + tasks.md, then builds.", bash: true },
  { key: "code-reviewer", desc: "Adversarially verifies finished builds against spec — spots drift, gaps, and bugs. Writes review.md.", bash: true },
];

const COMMANDS = [
  { key: "loop", desc: "Autonomous coordinator — processes features from queue.md, stops at the two human approval gates.", agent: null },
  { key: "shape", desc: "Default Phase 1 — PM + Designer draft spec.md + design.md together, then continue to plan.", agent: null },
  { key: "discover", desc: "Granular Phase 1a — Product Manager drafts spec.md (use shape for the default flow).", agent: "product-manager" },
  { key: "design", desc: "Granular Phase 1b — Product Designer drafts design.md from an approved spec.", agent: "product-designer" },
  { key: "monetize", desc: "Optional phase — Monetization Strategist drafts monetization.md.", agent: "monetization-strategist" },
  { key: "plan", desc: "Phase 2 — Software Engineer drafts plan.md + tasks.md.", agent: "software-engineer" },
  { key: "build", desc: "Phase 3 — Software Engineer implements all tasks (or one with 'next'), then summarizes.", agent: "software-engineer" },
  { key: "review", desc: "Phase 4 — Code Reviewer adversarially checks the build against spec. Writes review.md.", agent: "code-reviewer" },
  { key: "approve", desc: "Explicit fallback — record human approval of a phase so the next may run.", agent: null },
  { key: "status", desc: "Show every feature and its phase status.", agent: null },
  { key: "init-framework", desc: "One-time setup — finish scaffolding into this project.", agent: null },
];

// ---- per-tool config --------------------------------------------------------
// Each tool says where its agent/command/instruction files go and how to wrap
// the canonical bodies in that tool's frontmatter. This object is the ONLY
// place tool-specific knowledge lives.

const TOOLS = {
  opencode: {
    label: "OpenCode",
    agents: { dir: ".opencode/agents", ext: ".md", fm: openCodeAgentFM },
    // OpenCode commands use the config file approach to get speckroo: namespace
    commands: {
      type: "json",
      config: "opencode.json",
      namespace: "speckroo",
      legacyDir: ".opencode/commands/speckroo",
    },
    global: {
      agents: { dir: "~/.config/opencode/agents", ext: ".md", fm: openCodeAgentFM },
      commands: {
        type: "json",
        config: "~/.config/opencode/opencode.jsonc",
        namespace: "speckroo",
        legacyDir: "~/.config/opencode/commands/speckroo",
      },
    },
  },
  copilot: {
    label: "GitHub Copilot CLI",
    agents: { dir: ".github/agents", ext: ".agent.md", fm: copilotAgentFM },
    instructions: ".github/copilot-instructions.md",
  },
  cursor: {
    label: "Cursor",
    commands: { dir: ".cursor/commands", ext: ".md", fm: plainCmdFM },
    agentsmd: true,
  },
  windsurf: {
    label: "Windsurf",
    commands: { dir: ".windsurf/workflows", ext: ".md", fm: windsurfCmdFM },
    agentsmd: true,
  },
  codex: {
    label: "Codex CLI",
    agentsmd: true, // AGENTS.md only — Codex has no subagents / native commands
  },
};

// ---- frontmatter builders ---------------------------------------------------

function openCodeAgentFM(p) {
  return `---
description: ${p.desc}
mode: subagent
tools:
  read: true
  write: true
  edit: true
  grep: true
  glob: true
  bash: ${p.bash}
---`;
}
function copilotAgentFM(p) {
  const tools = p.bash ? "['read', 'write', 'edit', 'search', 'shell']" : "['read', 'write', 'edit', 'search']";
  return `---
name: ${p.key}
description: speckroo — ${p.desc}
tools: ${tools}
---`;
}
function plainCmdFM() {
  return null; // no frontmatter; the body's heading is the command
}
function windsurfCmdFM(c) {
  return `---
description: ${c.desc}
---`;
}

// ---- helpers ----------------------------------------------------------------

const read = (p) => readFileSync(join(ROOT, p), "utf8");
function write(absPath, content) {
  mkdirSync(dirname(absPath), { recursive: true });
  writeFileSync(absPath, content.endsWith("\n") ? content : content + "\n");
}
// Rewrite canonical core/ references to the vendored .framework/ locations.
function vendorRefs(body) {
  return body
    .replace(/core\/personas\/([a-z<>-]+)\.body\.md/g, "core/personas/$1.md")
    .replace(/core\/personas/g, ".framework/personas")
    .replace(/core\/workflow\.md/g, ".framework/workflow.md");
}
const personaBody = (key) => read(`core/personas/${key}.body.md`).trimEnd();
const commandBody = (key) => vendorRefs(read(`core/commands/${key}.md`).trimEnd());

// ---- the framework contract, rendered for instruction-only tools ------------
function workflowDoc() {
  return vendorRefs(read("core/workflow.md").trimEnd());
}

// ---- OpenCode JSON config command writer ------------------------------------
// OpenCode's `command` config key uses the map key as the slash command name,
// so { "speckroo:plan": { template, description, agent, subtask } } renders
// as /speckroo:plan — the colon separator signals a namespaced command.

function stripJsonc(src) {
  return src.replace(/\/\/[^\n]*/g, "").replace(/\/\*[\s\S]*?\*\//g, "");
}

function writeOpenCodeJson(configPath, namespace) {
  let config = {};
  if (existsSync(configPath)) {
    try { config = JSON.parse(stripJsonc(readFileSync(configPath, "utf8"))); } catch {}
  }
  if (!config.command) config.command = {};
  // Remove stale entries for this namespace before rewriting
  for (const key of Object.keys(config.command)) {
    if (key.startsWith(`${namespace}:`)) delete config.command[key];
  }
  for (const c of COMMANDS) {
    const entry = { template: commandBody(c.key), description: c.desc };
    if (c.agent) { entry.agent = c.agent; entry.subtask = true; }
    config.command[`${namespace}:${c.key}`] = entry;
  }
  mkdirSync(dirname(configPath), { recursive: true });
  writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");
}

// ---- vendor the shared runtime into the project -----------------------------
function vendorFramework(log) {
  const fwDir = join(CWD, ".framework");
  // constitution (don't clobber a project's filled-in one)
  const constDst = join(fwDir, "constitution.md");
  if (!existsSync(constDst)) {
    write(constDst, read("speckroo/.framework/constitution.md"));
    log.push(".framework/constitution.md");
  }
  // templates
  const templateFiles = readdirSync(join(ROOT, "speckroo/.framework/templates"));
  for (const f of templateFiles) {
    write(join(fwDir, "templates", f), read(`speckroo/.framework/templates/${f}`));
  }
  log.push(`.framework/templates/ (${templateFiles.length})`);
  // personas (strip .body)
  for (const p of PERSONAS) {
    write(join(fwDir, "personas", `${p.key}.md`), personaBody(p.key));
  }
  log.push(`.framework/personas/ (${PERSONAS.length})`);
  // queue (don't clobber project's queue)
  const queueDst = join(fwDir, "queue.md");
  if (!existsSync(queueDst)) {
    write(queueDst, read("speckroo/.framework/queue.md"));
    log.push(".framework/queue.md");
  }
  // skill (don't clobber accumulated skills)
  const skillDst = join(fwDir, "skill.md");
  if (!existsSync(skillDst)) {
    write(skillDst, read("speckroo/.framework/skill.md"));
    log.push(".framework/skill.md");
  }
  // workflow contract
  write(join(fwDir, "workflow.md"), workflowDoc());
  log.push(".framework/workflow.md");
  // gitignore
  const gi = join(CWD, ".gitignore");
  const line = ".framework/.active-feature";
  const cur = existsSync(gi) ? readFileSync(gi, "utf8") : "";
  if (!cur.includes(line)) {
    appendFileSync(gi, (cur && !cur.endsWith("\n") ? "\n" : "") + line + "\n");
    log.push(".gitignore (+.active-feature)");
  }
}

// ---- emit tool-specific files -----------------------------------------------
function setup(toolKey, isGlobal) {
  const tool = TOOLS[toolKey];
  if (!tool) {
    console.error(`Unknown tool "${toolKey}". Supported: ${Object.keys(TOOLS).join(", ")}`);
    process.exit(1);
  }
  if (isGlobal && !tool.global) {
    console.error(`"${toolKey}" does not support global install.`);
    process.exit(1);
  }
  const log = [];
  const base = isGlobal ? resolveHome : (p) => join(CWD, p);
  const agentsCfg = isGlobal ? tool.global.agents : tool.agents;
  const commandsCfg = isGlobal ? tool.global.commands : tool.commands;

  if (!isGlobal) vendorFramework(log);

  if (agentsCfg) {
    for (const p of PERSONAS) {
      const file = base(join(agentsCfg.dir, p.key + agentsCfg.ext));
      write(file, `${agentsCfg.fm(p)}\n\n${personaBody(p.key)}`);
    }
    log.push(`${agentsCfg.dir}/ (${PERSONAS.length} agents)`);
  }
  if (commandsCfg) {
    if (commandsCfg.type === "json") {
      const configPath = base(commandsCfg.config);
      writeOpenCodeJson(configPath, commandsCfg.namespace);
      log.push(`${commandsCfg.config} (${COMMANDS.length} commands, namespace: ${commandsCfg.namespace})`);
      // Clean up legacy markdown commands dir if it exists
      const legacyDir = base(commandsCfg.legacyDir);
      if (existsSync(legacyDir)) {
        rmSync(legacyDir, { recursive: true, force: true });
        log.push(`${commandsCfg.legacyDir}/ (removed legacy)`);
      }
    } else {
      for (const c of COMMANDS) {
        const fm = commandsCfg.fm(c);
        const body = commandBody(c.key);
        const file = base(join(commandsCfg.dir, c.key + commandsCfg.ext));
        write(file, fm ? `${fm}\n\n${body}` : body);
      }
      log.push(`${commandsCfg.dir}/ (${COMMANDS.length} commands)`);
    }
  }
  if (!isGlobal && tool.instructions) {
    write(join(CWD, tool.instructions), workflowDoc());
    log.push(tool.instructions);
  }
  if (!isGlobal && tool.agentsmd) {
    write(join(CWD, "AGENTS.md"), vendorRefs(read("AGENTS.md").trimEnd()));
    log.push("AGENTS.md");
  }

  const dest = isGlobal ? `${HOME}/.config/${toolKey}` : CWD;
  console.log(`\n✓ speckroo set up for ${tool.label} in ${dest}\n`);
  for (const l of log) console.log("  • " + l);
  const hasInitCmd = tool.commands || tool.agentsmd;
  const nextMsg = isGlobal
    ? `agents and commands are now available in every project.\nUse "speckroo setup ${toolKey}" in a project to scaffold the framework there.`
    : hasInitCmd
      ? `open this project in ${tool.label}, run the init-framework step,\nthen start a feature with "shape <idea>".`
      : `fill .framework/constitution.md with your project's principles,\nthen ask the agent to "shape <idea>".`;
  console.log(`\nNext: ${nextMsg}\n`);
}

// ---- arg parsing ------------------------------------------------------------
const args = process.argv.slice(2);
const isGlobal = args.includes("--global") || args.includes("-g");
const positional = args.filter(a => a !== "--global" && a !== "-g");
const cmd = positional[0];
const arg = positional[1];

if (cmd === "setup") {
  if (!arg) {
    console.error(`Usage: speckroo setup <${Object.keys(TOOLS).join("|")}> [--global]`);
    process.exit(1);
  }
  setup(arg, isGlobal);
} else if (cmd === "list") {
  console.log("Supported tools:\n" + Object.entries(TOOLS).map(([k, v]) => `  ${k}  — ${v.label}`).join("\n"));
} else {
  console.log(`speckroo — spec-driven multi-agent dev framework

Usage:
  speckroo setup <tool> [--global]   Set up speckroo for a tool
  speckroo list                      List supported tools

Options:
  --global, -g    Install agents & commands globally (where supported)

Tools: ${Object.keys(TOOLS).join(", ")}
Claude Code users: install the plugin instead (see README).`);
}
