---
name: speckroo
description: Use the Speckroo spec-driven workflow in this repository. Trigger when the user asks to shape, discover, design, monetize, plan, approve, build, review, status, or loop a feature.
---

# Speckroo

Use the repository's `.framework/workflow.md` as the source of truth. Before
acting, read that file and the relevant role file under `.framework/personas/`.
Store feature artifacts only under `.framework/<feature-slug>/` and use the
active feature in `.framework/.active-feature` when no slug is supplied.

Codex does not expose project-defined slash commands. Treat these phrases as
the equivalent commands:

- `speckroo init` or `init-framework` — complete one-time framework setup.
- `speckroo loop`, `loop`, or `loop check` — process or inspect the feature queue.
- `speckroo shape <idea>` or `shape <idea>` — draft `spec.md` and `design.md`.
- `speckroo discover <idea>` or `discover <idea>` — draft `spec.md` only.
- `speckroo design [slug]` or `design [slug]` — draft `design.md`.
- `speckroo monetize [slug]` or `monetize [slug]` — draft optional `monetization.md`.
- `speckroo plan [slug]` or `plan [slug]` — draft `plan.md` and `tasks.md`.
- `speckroo approve <phase> [slug]` or `approve <phase> [slug]` — record explicit human approval.
- `speckroo build [slug]` or `build [slug]` — implement all unchecked tasks.
- `speckroo build next [slug]` or `build next [slug]` — implement exactly one task.
- `speckroo review [slug]` or `review [slug]` — write the informational review.
- `speckroo status [slug]` or `status [slug]` — report artifact and task status read-only.

Never infer approval. Only an explicit, unqualified human `yes` (or equivalent
such as `approve` or `lgtm`) may change an artifact's `Status: draft` to
`Status: approved` or advance the workflow. On a gate, ask whether to approve,
revise, or stop.

For each phase, adopt only its assigned persona, obey its artifact ownership,
and stop at the phase's approval gate. Preserve the project's existing
instructions in `AGENTS.md` and follow its testing and architecture rules.
