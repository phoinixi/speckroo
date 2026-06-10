# speckroo

**Spec-driven dev with four agents, and you in the loop.**

Four role-based agents — PM, designer, monetization strategist, engineer — hand off through reviewable Markdown artifacts. By default, two checkpoints; each one is a single "yes".

Works in **Claude Code · OpenCode · Copilot CLI · Cursor · Windsurf · Codex** · and any `AGENTS.md` tool.

→ **[francescoesposito.dev/speckroo](https://francescoesposito.dev/speckroo/)** for the full docs

---

## Install

**Claude Code** — native plugin:
```
/plugin marketplace add phoinixi/speckroo
/plugin install speckroo@speckroo
```

**Everything else** — one command in your project:
```
npx github:phoinixi/speckroo setup <tool>
```
`<tool>` is `opencode`, `copilot`, `cursor`, `windsurf`, or `codex`.

---

## The workflow

**Default (3 steps, 2 checkpoints):**
```
/shape <idea>   → spec.md + design.md   ↓ "yes"
/plan           → plan.md + tasks.md    ↓ "yes"
/build          → code (all tasks, one summary)
```

Each checkpoint is an inline "yes" — no separate command needed. The next phase starts immediately.

**Strict mode** (granular, every phase explicit):
```
/discover <idea>  → spec.md          ↓ /approve spec
/design           → design.md        ↓ /approve design
/monetize         → monetization.md  ↓ /approve monetize   (optional)
/plan             → plan.md + tasks  ↓ /approve plan
/build next       → code             ↺ one task at a time
```

`/status` shows where every feature stands.  
`/approve` is the explicit fallback for approvals — the normal path is an inline "yes".

---

## How it's built

One canonical source in [`core/`](./core) — four persona bodies, nine command bodies, one workflow contract — projected into each tool's config layout by the CLI. The Claude Code plugin is byte-checked against `core/` by CI.

```
core/personas/          ← 4 role prompts, written once
core/commands/          ← 9 command bodies, written once
core/workflow.md        ← gate rules, written once
bin/speckroo.mjs        ← projects core/ into any tool
speckroo/               ← the Claude Code plugin
docs/                   ← GitHub Pages site
AGENTS.md               ← universal fallback (no install needed)
```

---

## Worked example

This repo is built using speckroo. The full artifact trail — `spec.md → design.md → plan.md → tasks.md` — lives in [`.framework/speckroo-docs/`](./.framework/speckroo-docs).

---

MIT · [NOTICE](./NOTICE) · [CONTRIBUTING](./CONTRIBUTING.md)
