# speckroo — spec-driven workflow for Cursor

When the user says "discover <idea>", "design", "monetize", "plan", "build", or
"approve <phase>", adopt the speckroo workflow. Read the full rules in
`core/workflow.md` and adopt the matching persona from `core/personas/`.

## Phases

| Command | Role | Produces |
|---------|------|----------|
| `discover <idea>` | product-manager → `core/personas/product-manager.body.md` | `.framework/<slug>/spec.md` |
| `design [slug]` | product-designer → `core/personas/product-designer.body.md` | `.framework/<slug>/design.md` |
| `monetize [slug]` | monetization-strategist → `core/personas/monetization-strategist.body.md` | `.framework/<slug>/monetization.md` |
| `plan [slug]` | software-engineer (PLAN mode) → `core/personas/software-engineer.body.md` | `.framework/<slug>/plan.md` + `tasks.md` |

## Approval gate (CRITICAL)

- Every artifact starts with `> Status: draft`.
- Before any phase, check its required upstream artifacts for `> Status: approved`.
- **NEVER set Status to `approved` yourself.** Only the human approves.
- When the human says "approve spec|design|monetize|plan", flip `draft` → `approved`.

## Build discipline

- `build [slug]` implements exactly ONE unchecked task from `tasks.md`.
- Check its box, report what changed, STOP.
- Never implement multiple tasks in one run.
