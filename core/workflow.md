# speckroo workflow contract

The single source of truth for how the speckroo workflow behaves, independent of
any tool. Every adapter (Claude Code, OpenCode, Copilot, AGENTS.md) implements
*this* — it is not re-described per tool.

## Default flow vs strict mode

**Default (2 checkpoints):**
```
/shape <idea>  → spec.md + design.md   ↓ human "yes" (inline)
/plan          → plan.md + tasks.md    ↓ human "yes" (inline)
/build         → all tasks implemented, one review summary
```

**Strict mode (granular, every phase explicit):**
`/discover` → `/approve spec` → `/design` → `/approve design` → `/monetize` (opt) → `/approve monetize` → `/plan` → `/approve plan` → `/build next` (one task at a time)

Both modes use the same artifact files and `Status:` gate mechanism. Strict mode
is opt-in; the default is the three-step flow above.

## Phases, owners, artifacts

| Phase | Owner persona | Artifact(s) | Required upstream |
|---|---|---|---|
| **shape** *(default)* | product-manager + product-designer | `spec.md` + `design.md` | — |
| discover *(granular)* | product-manager | `spec.md` | — |
| design *(granular)* | product-designer | `design.md` | approved `spec.md` |
| monetize *(optional)* | monetization-strategist | `monetization.md` | approved `spec.md` |
| plan | software-engineer | `plan.md`, `tasks.md` | approved `spec.md` (+ `design.md`/`monetization.md` if present) |
| build | software-engineer | code | approved `plan.md` + `tasks.md` |
| review *(informational)* | code-reviewer | `review.md` | all tasks checked in `tasks.md` |

Artifacts live in `.framework/<feature-slug>/`. Agents hand off through these
files — never through chat or live agent state. Each persona reads the
constitution + its required upstream artifacts, writes **only its own**
artifact, and stops.

Inside `/shape`, the product-designer may read a same-run draft `spec.md`
(the human's `/shape` invocation is consent to draft both in one pass).
In all other contexts, `design.md` still requires an approved `spec.md`.

## The approval gate

- Each artifact's header carries a line: `> Status: draft`.
- A phase may begin only when every required upstream artifact reads
  `> Status: approved` (monetization may also read `n/a`). If a required
  artifact is missing or still `draft`, STOP and tell the human what to approve.
- **Only the human approves.** An agent may flip `Status: draft` → `approved`
  and immediately continue to the next phase **only** when the human has given
  an explicit, unqualified affirmative ("yes", "approve", "lgtm", etc.) to the
  end-of-phase prompt in the current exchange. Ambiguous or qualified responses
  are NOT approval. Silent continuation, assuming consent, or flipping Status
  without a fresh human yes in the current turn are all forbidden.
- `/approve` remains available as an explicit fallback command. The normal path
  is answering "yes" to the end-of-phase prompt.

## End-of-phase prompt

Every phase command ends by asking:

> Approve **\<phase\>** and continue to **\<next\>**? (yes / revise \<notes\> / stop)

On a plain "yes": the orchestrator flips `Status: draft` → `approved` in the
artifact(s) and immediately runs the next phase. On "revise …" or "stop": do
not flip; return control to the human.

## Feature routing

- Starting a feature (`shape` or `discover`) derives a kebab-case
  `<feature-slug>`, creates `.framework/<slug>/`, seeds its artifact(s) from
  templates, and records the slug as the active feature
  (`.framework/.active-feature` where supported).
- Each later phase seeds **only its own** artifact from the template when it
  runs. An absent artifact therefore means that phase was skipped.
- Commands act on the active feature by default, or an explicitly named slug.
- `/shape <slug>` on an existing feature is an idempotent resume: it drafts
  only the artifact(s) not yet approved.

## Build discipline

- `/build [slug]` implements **all** unchecked tasks in `tasks.md` in order,
  checking each box as it completes, and ends with one consolidated review
  summary. It stops early only if blocked by a contradicted assumption or
  unresolved ambiguity — raising the issue rather than improvising.
- `/build next [slug]` implements exactly **one** unchecked task, checks its
  box, reports what changed, and stops for review. Use this for careful
  step-by-step review.

## Loop mode

`/loop` processes a queue of features autonomously, chaining phases and
stopping only at the two human approval gates.

```
/loop           → process next item from .framework/queue.md
/loop check     → inspect queue state, run nothing
/loop <slug>    → process a specific feature only, then stop
```

`.framework/queue.md` (project-level) is a checklist of feature ideas. The
loop picks the first unchecked item, runs: shape → waits for approval → plan
→ waits for approval → build → review → marks item done → picks next.

The same approval gate rules apply inside the loop as in standalone commands:
only an explicit, unqualified "yes" in the current exchange may flip a Status
or advance a phase. The loop cannot self-approve.

## Skill accumulation

`.framework/skill.md` (project-level) stores conventions, gotchas, and
patterns discovered during builds. Every persona reads it before starting a
phase; the software-engineer appends new learnings after each build. This file
is seeded empty by `init-framework` and grows richer over time — making each
subsequent feature faster and better-aligned to the project's evolving
standards.

It is not a gate artifact: no phase requires it, and it may be edited freely.

## Fidelity note across tools

The workflow is fully structural in Claude Code and OpenCode (real commands +
subagent dispatch). In single-agent / AGENTS.md tools the same rules apply but
are enforced by instruction-following: one agent adopts one role at a time, and
the "never self-approve" and build rules become prose guarantees rather than
command-enforced ones. The file-based `Status:` gate works identically everywhere.
