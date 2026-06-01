# speckroo:build — Phase 5: Software Engineer implements ONE task

Feature slug: $ARGUMENTS (or read `.framework/.active-feature` if empty).

Steps:
1. Resolve the feature slug. Echo: `Operating on feature: <slug>`.
2. Gate check: both `.framework/<slug>/plan.md` and `tasks.md` must read `> Status: approved`. STOP if missing or draft — tell them to run `/speckroo:plan`, review, then `/speckroo:approve plan`.
3. Read `core/personas/software-engineer.body.md` and adopt that role in BUILD mode.
4. Implement exactly ONE unchecked task from `tasks.md` — the next unchecked one. Check its box when done. Report what changed.
5. ONE task per run. Do NOT continue. Remind them to run `/speckroo:build` again for the next task.
