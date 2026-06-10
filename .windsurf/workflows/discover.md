---
description: Granular Phase 1a — Product Manager drafts spec.md (use shape for the default flow).
---

# discover — start a new feature spec (granular alternative to /shape)

Follow the workflow contract in `.framework/workflow.md`. Idea: $ARGUMENTS

Use `/shape` for the default two-artifact flow. Use `/discover` when you want
to draft and review `spec.md` alone before moving to design.

1. Setup check: `.framework/templates/` must exist. If not, stop and tell the
   human to run `init-framework` first.
2. Derive a short kebab-case `<feature-slug>` from the idea. Create
   `.framework/<feature-slug>/` and seed **only** `spec.md` from
   `.framework/templates/spec.md` (replace the `<feature-slug>` placeholder).
   Record the slug as the active feature.
3. Echo `Operating on feature: <feature-slug>`.
4. Adopt the **product-manager** role (`.framework/personas/product-manager.md`)
   and fill `.framework/<feature-slug>/spec.md`.

Produce only `spec.md`, then return a summary and end with:
> Approve spec and continue to /design? (yes / revise <notes> / stop)

On "yes": replace `> Status: draft` with `> Status: approved` in `spec.md`,
then run the design phase (gate-check, seed design.md template, adopt
product-designer, fill design.md, end with design approval prompt).

On "revise <notes>": incorporate the notes and re-draft; do not flip Status.

On "stop": confirm Status remains draft and return control to the human.
Do not start any other phase without an explicit "yes".
