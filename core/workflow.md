# squad workflow contract

The single source of truth for how the squad workflow behaves, independent of
any tool. Every adapter (Claude Code, OpenCode, Copilot, AGENTS.md) implements
*this* — it is not re-described per tool.

## Phases, owners, artifacts

| Phase | Owner persona | Artifact(s) | Required upstream |
|---|---|---|---|
| discover | product-manager | `spec.md` | — |
| design | product-designer | `design.md` | approved `spec.md` |
| monetize *(optional)* | monetization-strategist | `monetization.md` | approved `spec.md` |
| plan | software-engineer | `plan.md`, `tasks.md` | approved `spec.md` (+ `design.md`/`monetization.md` if present) |
| build | software-engineer | code | approved `plan.md` + `tasks.md` |

Artifacts live in `.framework/<feature-slug>/`. Agents hand off through these
files — never through chat or live agent state. Each persona reads the
constitution + its required upstream artifacts, writes **only its own**
artifact, and stops.

## The approval gate

- Each artifact's header carries a line: `> Status: draft`.
- A phase may begin only when every required upstream artifact reads
  `> Status: approved` (monetization may also read `n/a`). If a required
  artifact is missing or still `draft`, STOP and tell the human what to approve.
- **Only the human approves.** Approval flips `Status: draft` → `approved`
  (the `/approve` command where commands exist; an explicit human instruction
  otherwise). **An agent must NEVER set its own or any artifact's Status to
  `approved` on its own initiative — only when the human explicitly says so.**
  This is the most important rule in single-agent tools, where it is enforced by
  instruction rather than by a separate command.

## Feature routing

- Starting a feature (`discover`) derives a kebab-case `<feature-slug>`, creates
  `.framework/<slug>/`, seeds **only** `spec.md` from the template, and records
  the slug as the active feature (`.framework/.active-feature` where supported).
- Each later phase seeds **only its own** artifact from the template when it
  runs. An absent artifact therefore means that phase was skipped.
- Commands act on the active feature by default, or an explicitly named slug.

## Build discipline

- `build` implements **exactly one** unchecked task from `tasks.md` per run,
  checks its box, reports what changed, and stops for review. It never runs
  multiple tasks without a fresh human go-ahead. Where the tool lacks
  per-invocation commands, this is an instruction the single agent must obey.

## Fidelity note across tools

The workflow is fully structural in Claude Code and OpenCode (real commands +
subagent dispatch). In single-agent / AGENTS.md tools the same rules apply but
are enforced by instruction-following: one agent adopts one role at a time, and
the "never self-approve" and "one task per build" rules become prose guarantees
rather than command-enforced ones. The file-based `Status:` gate works
identically everywhere.
