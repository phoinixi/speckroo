# speckroo

**Spec-driven dev with five agents, and you in the loop.**

Five role-based agents — PM, designer, monetization strategist, engineer, reviewer — hand off through reviewable Markdown artifacts. By default, two checkpoints and a fully autonomous loop.

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

**Default (3 steps + auto review, 2 checkpoints):**
```
/shape <idea>   → spec.md + design.md   ↓ "yes"
/plan           → plan.md + tasks.md    ↓ "yes"
/build          → code (all tasks, one summary)
/review         → review.md (adversarial check, informational)
```

Each checkpoint is an inline "yes". `/review` chains automatically — no prompt needed.

**Loop mode** (queue-driven, autonomous between gates):
```
# add ideas to .framework/queue.md, then:
/loop           → run next feature in the queue, stop at approval gates
/loop check     → inspect queue state without running anything
```

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

One canonical source in [`core/`](./core) — five persona bodies, eleven command bodies, one workflow contract — projected into each tool's config layout by the CLI. The Claude Code plugin is byte-checked against `core/` by CI.

```
core/personas/          ← 5 role prompts, written once
core/commands/          ← 11 command bodies, written once
core/workflow.md        ← gate rules + loop + skill contract, written once
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
