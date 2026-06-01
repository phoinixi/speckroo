# speckroo:monetize — Phase 3 (optional): Monetization Strategist drafts monetization.md

Feature slug: $ARGUMENTS (or read `.framework/.active-feature` if empty).

Steps:
1. Resolve the feature slug. Echo: `Operating on feature: <slug>`.
2. Gate check: `.framework/<slug>/spec.md` must read `> Status: approved`. If missing or `draft`, STOP — tell them to run `/speckroo:approve spec` first.
3. Seed `.framework/<slug>/monetization.md` from `.framework/templates/monetization.md` if missing (replace `<feature-slug>` placeholder).
4. Read `.framework/constitution.md`, then read `core/personas/monetization-strategist.body.md` and adopt that role.
5. Fill `.framework/<slug>/monetization.md` using the approved spec (and design if present). Produce ONLY monetization.md.
6. Return a summary. End with: "monetization.md ready for review — when satisfied, run /speckroo:approve monetize."
