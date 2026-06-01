#!/usr/bin/env node
// squad CLI — projects the canonical core/ into any tool's config layout.
// One source of truth (core/personas, core/commands, core/workflow.md,
// squad/.framework masters); every tool's files are generated from it here.

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, appendFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CWD = process.cwd();

// ---- canonical manifest -----------------------------------------------------

const PERSONAS = [
  { key: "product-manager", desc: "Owns requirements, scope, priorities, success metrics. Drafts spec.md.", bash: false },
  { key: "product-designer", desc: "Owns UX/UI, user flows, design specs. Drafts design.md.", bash: false },
  { key: "monetization-strategist", desc: "Owns pricing, business model, revenue. Drafts monetization.md (optional).", bash: false },
  { key: "software-engineer", desc: "Owns architecture, plan, tasks, and code. Drafts plan.md + tasks.md, then builds.", bash: true },
];

const COMMANDS = [
  { key: "discover", desc: "Phase 1 — Product Manager drafts spec.md.", agent: "product-manager" },
  { key: "design", desc: "Phase 2 — Product Designer drafts design.md.", agent: "product-designer" },
  { key: "monetize", desc: "Phase 3 (optional) — Monetization Strategist drafts monetization.md.", agent: "monetization-strategist" },
  { key: "plan", desc: "Phase 4 — Software Engineer drafts plan.md + tasks.md.", agent: "software-engineer" },
  { key: "build", desc: "Phase 5 — Software Engineer implements one task, then stops.", agent: "software-engineer" },
  { key: "approve", desc: "Record human approval of a phase so the next may run.", agent: null },
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
    agents: { dir: ".opencode/agent", ext: ".md", fm: openCodeAgentFM },
    commands: { dir: ".opencode/command", ext: ".md", fm: openCodeCmdFM },
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
function openCodeCmdFM(c) {
  const agent = c.agent ? `\nagent: ${c.agent}\nsubtask: true` : "";
  return `---
description: ${c.desc}${agent}
---`;
}
function copilotAgentFM(p) {
  const tools = p.bash ? "['read', 'write', 'edit', 'search', 'shell']" : "['read', 'write', 'edit', 'search']";
  return `---
name: ${p.key}
description: squad — ${p.desc}
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

// ---- vendor the shared runtime into the project -----------------------------
function vendorFramework(log) {
  const fwDir = join(CWD, ".framework");
  // constitution (don't clobber a project's filled-in one)
  const constDst = join(fwDir, "constitution.md");
  if (!existsSync(constDst)) {
    write(constDst, read("squad/.framework/constitution.md"));
    log.push(".framework/constitution.md");
  }
  // templates
  for (const f of readdirSync(join(ROOT, "squad/.framework/templates"))) {
    write(join(fwDir, "templates", f), read(`squad/.framework/templates/${f}`));
  }
  log.push(".framework/templates/ (5)");
  // personas (strip .body)
  for (const p of PERSONAS) {
    write(join(fwDir, "personas", `${p.key}.md`), personaBody(p.key));
  }
  log.push(".framework/personas/ (4)");
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
function setup(toolKey) {
  const tool = TOOLS[toolKey];
  if (!tool) {
    console.error(`Unknown tool "${toolKey}". Supported: ${Object.keys(TOOLS).join(", ")}`);
    process.exit(1);
  }
  const log = [];
  vendorFramework(log);

  if (tool.agents) {
    for (const p of PERSONAS) {
      const file = join(CWD, tool.agents.dir, p.key + tool.agents.ext);
      write(file, `${tool.agents.fm(p)}\n\n${personaBody(p.key)}`);
    }
    log.push(`${tool.agents.dir}/ (4 agents)`);
  }
  if (tool.commands) {
    for (const c of COMMANDS) {
      const fm = tool.commands.fm(c);
      const body = commandBody(c.key);
      const file = join(CWD, tool.commands.dir, c.key + tool.commands.ext);
      write(file, fm ? `${fm}\n\n${body}` : body);
    }
    log.push(`${tool.commands.dir}/ (8 commands)`);
  }
  if (tool.instructions) {
    // tools with agents but no commands: put the workflow contract in instructions
    write(join(CWD, tool.instructions), workflowDoc());
    log.push(tool.instructions);
  }
  if (tool.agentsmd) {
    write(join(CWD, "AGENTS.md"), vendorRefs(read("AGENTS.md").trimEnd()));
    log.push("AGENTS.md");
  }

  console.log(`\n✓ squad set up for ${tool.label} in ${CWD}\n`);
  for (const l of log) console.log("  • " + l);
  const hasInitCmd = tool.commands || tool.agentsmd;
  const nextMsg = hasInitCmd
    ? `open this project in ${tool.label}, run the init-framework step,\nthen start a feature with "discover <idea>".`
    : `fill .framework/constitution.md with your project's principles,\nthen ask the agent to "run the discover phase for <idea>".`;
  console.log(`\nNext: ${nextMsg}\n`);
}

// ---- arg parsing ------------------------------------------------------------
const [cmd, arg] = process.argv.slice(2);
if (cmd === "setup") {
  if (!arg) {
    console.error(`Usage: squad setup <${Object.keys(TOOLS).join("|")}>`);
    process.exit(1);
  }
  setup(arg);
} else if (cmd === "list") {
  console.log("Supported tools:\n" + Object.entries(TOOLS).map(([k, v]) => `  ${k}  — ${v.label}`).join("\n"));
} else {
  console.log(`squad — spec-driven multi-agent dev framework

Usage:
  squad setup <tool>   Set up squad for a tool in the current project
  squad list           List supported tools

Tools: ${Object.keys(TOOLS).join(", ")}
Claude Code users: install the plugin instead (see README).`);
}
