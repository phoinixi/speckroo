---
description: Phase 1 — Product Manager drafts spec.md for a new feature.
argument-hint: <idea / feature description>
agent: product-manager
subtask: true
---

Idea from the human: **$ARGUMENTS**

Setup check: confirm `.framework/templates/` exists in this project. If not,
STOP and tell the human to run `/speckroo:init-framework` once first.

1. Derive a short kebab-case `<feature-slug>` from the idea.
2. Create `.framework/<feature-slug>/` and seed only `spec.md` from
   `.framework/templates/spec.md` (replace the `<feature-slug>` placeholder).
3. Write the slug to `.framework/.active-feature`.
4. Echo: `Operating on feature: <feature-slug>`.
5. Read `.framework/constitution.md` and fill the spec from the idea above.

Produce only `spec.md`. End with: "spec.md ready for review — when satisfied,
run /speckroo:approve spec, then /speckroo:design."
