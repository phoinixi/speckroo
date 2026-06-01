# speckroo:plan — Phase 4: Software Engineer drafts plan.md + tasks.md

Feature slug: $ARGUMENTS (or read `.framework/.active-feature` if empty).

Steps:
1. Resolve the feature slug. Echo: `Operating on feature: <slug>`.
2. Gate check: `.framework/<slug>/spec.md` must read `> Status: approved`. If `design.md` exists it must be `approved`; if `monetization.md` exists it must be `approved` or `n/a`. STOP if any required artifact is missing or draft.
3. Seed `.framework/<slug>/plan.md` and `tasks.md` from templates if missing (replace `<feature-slug>` placeholder).
4. Read `.framework/constitution.md`, then read `core/personas/software-engineer.body.md` and adopt that role in PLAN mode.
5. Produce `plan.md` + `tasks.md`. Produce ONLY these two files. Do NOT start building.
6. Return a summary. End with: "plan.md + tasks.md ready for review — when satisfied, run /speckroo-approve plan, then /speckroo-build."
