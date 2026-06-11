# speckroo — agent instructions (universal)

This file makes the **speckroo** spec-driven workflow usable in any tool that reads
`AGENTS.md` (Codex, Cursor, Windsurf, Gemini CLI, OpenCode, Copilot, Zed, …).
Tools with native speckroo adapters (Claude Code, OpenCode, Copilot, Windsurf) give a richer
experience; this file is the universal baseline. The full, tool-independent
rules live in [`core/workflow.md`](./core/workflow.md); the full role contracts
live in [`core/personas/`](./core/personas).

You are a **single agent adopting one role at a time.** speckroo's hand-offs happen
through Markdown files in `.framework/`, not through chat — so even without
subagents or slash commands, the workflow works: you write an artifact, the
human approves it, you read it back in the next phase.

## Default flow (2 checkpoints)

```
shape <idea>  → spec.md + design.md   ↓ human "yes"
plan          → plan.md + tasks.md    ↓ human "yes"
build         → all tasks, one summary
review        → review.md (auto-chained, informational)
```

**Loop mode** (fully autonomous between gates):
Add ideas to `.framework/queue.md`, say "loop" — the agent processes each
feature through the full pipeline, stopping only at the two "yes" gates.

**Strict mode** (granular, every phase explicit): discover → approve spec →
design → approve design → (optional) monetize → approve monetize → plan →
approve plan → build next (one task at a time)

## How the human drives it (no slash commands needed)

The human will say things like "shape <idea>", "run plan", "build everything",
"loop", or the strict-mode equivalents. Map those to the phases below. When a
phase starts, **read the matching role file in `core/personas/` and adopt it as
your operating instructions for that phase.**

## Phases

| When the human asks for… | You become… | You produce | Requires |
|---|---|---|---|
| **shape** *(default)* | product-manager, then product-designer | `spec.md` + `design.md` | — |
| discover *(granular)* | product-manager | `spec.md` | — |
| design *(granular)* | product-designer | `design.md` | approved `spec.md` |
| monetize *(optional)* | monetization-strategist | `monetization.md` | approved `spec.md` |
| plan | software-engineer | `plan.md` + `tasks.md` | approved `spec.md` |
| build | software-engineer | code, all tasks | approved `plan.md` + `tasks.md` |
| review *(informational)* | code-reviewer | `review.md` | all tasks checked |

For each phase: read `.framework/constitution.md` and the required upstream
artifact(s), then read `core/personas/<role>.body.md` and follow it exactly.
Seed the artifact from `.framework/templates/<artifact>.md` if it doesn't exist
yet (replace the `<feature-slug>` placeholder). Write **only your own** artifact.

For the **shape** phase: adopt product-manager, write `spec.md`, then adopt
product-designer and write `design.md` (you may read the fresh-draft `spec.md` —
the human's "shape" request is consent to draft both in one pass).

## The approval gate — read carefully

- Every artifact header has a line `> Status: draft`.
- **Do not begin a phase until its required upstream artifacts read
  `> Status: approved`** (monetization may read `n/a`). If not, STOP and tell the
  human exactly what to review and approve.
- After completing a phase, ask: **"Approve and continue to <next>? (yes / revise / stop)"**
- **Flip `Status: draft` → `approved` only on an explicit, unqualified "yes" from
  the human in the current exchange.** Ambiguous or qualified responses are NOT
  approval. Never flip on your own initiative or assume consent from silence.

## Build discipline

- **Default** (`build`): implement ALL unchecked tasks in `tasks.md` in order,
  checking each box as you go. Stop early only if blocked by a contradicted
  assumption. End with one consolidated review summary. Append new discoveries
  to `.framework/skill.md` before finishing.
- **Single-task** (`build next`): implement exactly one unchecked task, check
  its box, report what changed, and STOP for review.

## Skill accumulation

`.framework/skill.md` (project-level, not per-feature) stores accumulated
conventions, gotchas, and patterns discovered during builds. Every role reads
it before starting a phase; the software-engineer appends new learnings after
each build. It grows richer over time — each feature benefits from the last.

## Setup in a new project

If `.framework/` doesn't exist here, create it and copy in `constitution.md`,
`templates/`, `queue.md`, and `skill.md` (and, for this universal mode,
`core/personas/` + `core/workflow.md` so they're available locally). Fill
`constitution.md` with this project's durable principles before starting. Add
`.framework/.active-feature` to `.gitignore`. Then start a feature with
"shape <idea>", or add ideas to `queue.md` and say "loop".

## Roles in one line each (full contracts in `core/personas/`)

- **product-manager** — requirements, scope, priorities, success metrics → `spec.md`
- **product-designer** — UX, flows, design specs → `design.md`
- **monetization-strategist** — pricing, business model (optional) → `monetization.md`
- **software-engineer** — architecture, plan, tasks, code → `plan.md`, `tasks.md`, code
- **code-reviewer** — adversarial verification of the finished build → `review.md`
