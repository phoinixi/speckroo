# speckroo:discover — Phase 1: Product Manager drafts spec.md

Idea from the human: $ARGUMENTS

Steps:
1. Confirm `.framework/templates/` exists in this project. If not, STOP and tell them to run `/speckroo-init-framework` first.
2. Derive a kebab-case `<feature-slug>` from the idea.
3. Create `.framework/<feature-slug>/` and seed `spec.md` from `.framework/templates/spec.md` (replace `<feature-slug>` placeholder).
4. Write the slug to `.framework/.active-feature`.
5. Echo: `Operating on feature: <feature-slug>`.
6. Read `.framework/constitution.md`, then read `core/personas/product-manager.body.md` and adopt that role.
7. Fill `.framework/<feature-slug>/spec.md` from the idea above. Produce ONLY spec.md.
8. Return a summary. End with: "spec.md ready for review — when satisfied, run /speckroo-approve spec, then /speckroo-design."
