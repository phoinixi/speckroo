# squad

**Spec-driven dev with four agents, and you in the loop.**

Four role-based agents — PM, designer, monetization strategist, engineer — hand off through reviewable Markdown artifacts. No phase moves forward until you approve it.

Works in **Claude Code · OpenCode · Copilot CLI · Cursor · Windsurf · Codex** · and any `AGENTS.md` tool.

→ **[francescoesposito.dev/squad](https://francescoesposito.dev/squad/)** for the full docs

---

## Install

**Claude Code** — native plugin:
```
/plugin marketplace add phoinixi/squad
/plugin install squad@squad
```

**Everything else** — one command in your project:
```
npx github:phoinixi/squad setup <tool>
```
`<tool>` is `opencode`, `copilot`, `cursor`, `windsurf`, or `codex`.

---

## The workflow

```
/discover <idea>    → spec.md          ↓ /approve spec
/design             → design.md        ↓ /approve design
/monetize           → monetization.md  ↓ /approve monetize   (optional)
/plan               → plan.md + tasks  ↓ /approve plan
/build              → code             ↺ one task at a time
```

`/status` shows where every feature stands.  
`/approve` flips `Status: draft → approved` in the artifact — the next phase won't run until it does.

---

## How it's built

One canonical source in [`core/`](./core) — four persona bodies, eight command bodies, one workflow contract — projected into each tool's config layout by the CLI. The Claude Code plugin is byte-checked against `core/` by CI.

```
core/personas/          ← 4 role prompts, written once
core/commands/          ← 8 command bodies, written once
core/workflow.md        ← gate rules, written once
bin/squad.mjs           ← projects core/ into any tool
squad/                  ← the Claude Code plugin
docs/                   ← GitHub Pages site
AGENTS.md               ← universal fallback (no install needed)
```

---

## Worked example

This repo is built using squad. The full artifact trail — `spec.md → design.md → plan.md → tasks.md` — lives in [`.framework/squad-docs/`](./.framework/squad-docs).

---

MIT · [NOTICE](./NOTICE) · [CONTRIBUTING](./CONTRIBUTING.md)
