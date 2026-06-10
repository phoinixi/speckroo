---
description: Granular Phase 1a — Product Manager drafts spec.md alone (use /shape for the default two-artifact flow).
argument-hint: <idea / feature description>
---

# /discover — draft spec.md alone (granular alternative to /shape)

Use `/shape` for the default flow. Use `/discover` when you want to draft and
review `spec.md` separately before moving to design.

You are dispatching the **product-manager** subagent to produce `spec.md`.

Idea from the human: **$ARGUMENTS**

Steps:
0. **Setup check:** confirm `.framework/templates/` exists. If not, STOP and
   tell the human to run `/init-framework` once first.
1. Derive a short kebab-case `<feature-slug>` from the idea (e.g. "checkout
   redesign" → `checkout-redesign`).
2. Create `.framework/<feature-slug>/` and seed **only** `spec.md` from
   `.framework/templates/spec.md` (replace the `<feature-slug>` placeholder in
   its title). Later phases seed their own artifacts when they run — do not
   pre-create design/monetization/plan/tasks here.
3. Write the slug to `.framework/.active-feature` (overwrite).
4. **Echo the resolved feature** to the human: `Operating on feature: <feature-slug>`.
5. Use the Task tool to invoke the `product-manager` subagent. Instruct it to
   read `.framework/constitution.md` and fill `.framework/<feature-slug>/spec.md`.
6. Relay the agent's summary, then ask:
   > Approve spec and continue to /design? (yes / revise <notes> / stop)

On **"yes"**: replace `> Status: draft` with `> Status: approved` in `spec.md`,
then run the design phase: seed `design.md` template if absent, invoke
`product-designer` subagent, relay summary, ask the design approval prompt.

On **"revise <notes>"**: incorporate the notes, re-invoke the subagent to
re-draft; do not flip Status.

On **"stop"**: confirm Status remains draft and return control to the human.
Do not auto-run any phase without an explicit "yes".

_When you name follow-up commands, match the namespace you were invoked with
(e.g. `/speckroo:approve` if installed as a plugin)._
