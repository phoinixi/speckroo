---
description: Default Phase 1 — PM + Designer draft spec.md + design.md together, then continue to plan.
argument-hint: <idea / feature description>
---

# /shape — default flow: spec + design in one pass

You are orchestrating **product-manager** then **product-designer** to produce
`spec.md` and `design.md` together, then (on approval) continuing to `/plan`.

Idea from the human: **$ARGUMENTS**

Steps:
0. **Setup check:** confirm `.framework/templates/` exists. If not, STOP and
   tell the human to run `/init-framework` once first.
1. Derive a short kebab-case `<feature-slug>` from the idea — or treat
   $ARGUMENTS as a slug if it matches an existing `.framework/<slug>/` dir
   (resume mode: only re-draft unapproved artifacts).
2. Create `.framework/<feature-slug>/` if it does not exist. Write the slug to
   `.framework/.active-feature` (overwrite).
3. **Echo the resolved feature** to the human: `Operating on feature: <feature-slug>`.

**PM pass** (skip if `spec.md` is already `> Status: approved`):
4. Seed `spec.md` from `.framework/templates/spec.md` if it does not exist yet
   (replace the `<feature-slug>` placeholder).
5. Use the Task tool to invoke the `product-manager` subagent. Instruct it to
   read `.framework/constitution.md` and fill `.framework/<feature-slug>/spec.md`.

**Designer pass** (skip if `design.md` is already `> Status: approved`):
6. Seed `design.md` from `.framework/templates/design.md` if it does not exist
   yet (replace the `<feature-slug>` placeholder).
7. Use the Task tool to invoke the `product-designer` subagent. Instruct it to
   read `.framework/constitution.md` + the fresh-draft `spec.md` from step 5
   (the human's `/shape` invocation is consent to use the draft — no approval
   needed between these two passes).

8. Relay both agents' summaries and any open questions, then ask:
   > Approve shape (spec.md + design.md) and continue to /plan? (yes / revise <notes> / stop)

On **"yes"**:
- Replace `> Status: draft` with `> Status: approved` in both `spec.md` and
  `design.md`.
- Immediately proceed to the plan phase:
  - Gate check (should pass; both artifacts just approved).
  - Seed `.framework/<slug>/plan.md` and `tasks.md` from their templates if
    absent (replace the `<feature-slug>` placeholder).
  - Use the Task tool to invoke the `software-engineer` subagent in PLAN mode.
    Instruct it to read `.framework/constitution.md` + all approved artifacts
    and produce `plan.md` + `tasks.md`.
  - Relay the plan summary, then ask:
    > Approve plan and continue to /build? (yes / revise <notes> / stop)
  - On **"yes"**: replace `> Status: draft` with `> Status: approved` in both
    `plan.md` and `tasks.md`, then invoke `software-engineer` in BUILD mode to
    implement all unchecked tasks and return one review summary.
  - On **"revise <notes>"**: re-draft plan/tasks with the notes; do not flip Status.
  - On **"stop"**: confirm Status remains draft and return control.

On **"revise <notes>"**: incorporate the notes, re-invoke the relevant subagent
to re-draft the affected artifact(s); do not flip any Status lines.

On **"stop"**: confirm Status remains draft and return control to the human.

_When you name follow-up commands, match the namespace you were invoked with
(e.g. `/speckroo:approve` if installed as a plugin)._
