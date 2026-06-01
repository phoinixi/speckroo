# speckroo:design — Phase 2: Product Designer drafts design.md

Feature slug: $ARGUMENTS (or read `.framework/.active-feature` if empty).

Steps:
1. Resolve the feature slug. Echo: `Operating on feature: <slug>`.
2. Gate check: `.framework/<slug>/spec.md` must read `> Status: approved`. If missing or `draft`, STOP — tell them to run `/speckroo:discover`, review, then `/speckroo:approve spec`.
3. Seed `.framework/<slug>/design.md` from `.framework/templates/design.md` if missing (replace `<feature-slug>` placeholder).
4. Read `.framework/constitution.md`, then read `core/personas/product-designer.body.md` and adopt that role.
5. Fill `.framework/<slug>/design.md` using the approved spec as input. Produce ONLY design.md.
6. Return a summary. End with: "design.md ready for review — when satisfied, run /speckroo:approve design."
