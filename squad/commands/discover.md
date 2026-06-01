---
description: Phase 1 — Product Manager drafts spec.md for a new feature.
argument-hint: <idea / feature description>
---

# /discover — start a new feature spec

You are dispatching the **product-manager** subagent to produce `spec.md`.

Idea from the human: **$ARGUMENTS**

Steps:
0. **Setup check:** confirm `.framework/templates/` exists in this project. If
   not, STOP and tell the human to run `/init-framework` once first.
1. Derive a short kebab-case `<feature-slug>` from the idea (e.g. "checkout
   redesign" → `checkout-redesign`).
2. Create `.framework/<feature-slug>/` and seed **only** `spec.md` from
   `.framework/templates/spec.md` (replace the `<feature-slug>` placeholder in
   its title). Later phases seed their own artifacts when they run — do not
   pre-create design/monetization/plan/tasks here.
3. Write the slug to `.framework/.active-feature` (overwrite).
4. **Echo the resolved feature** to the human: `Operating on feature: <feature-slug>`.
5. Use the Task tool to invoke the `product-manager` subagent. Instruct it to
   read `.framework/constitution.md` and fill `.framework/<feature-slug>/spec.md`
   from the idea above.

GATE: This command does ONE thing — produce `spec.md`. Do NOT auto-run /design
or any other phase. After the agent returns, relay its summary and remind the
human to review `spec.md` and run `/approve spec` when satisfied — then
`/design`.

_When you name follow-up commands, match the namespace you were invoked with
(e.g. `/squad:approve` if installed as a plugin)._
