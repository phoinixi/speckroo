---
description: Autonomous coordinator — processes features from queue.md, stops at the two human approval gates.
argument-hint: "[check | feature-slug] — 'check' = inspect only; slug = target one feature"
---

# /loop — autonomous phase coordinator

You are coordinating the full feature pipeline. You stop at the two human
approval gates and wait for an explicit "yes" before continuing.

## Inspect mode (`check` as first argument)

1. Read `.framework/queue.md`.
2. For each listed feature, read its dir and report its current phase
   (none / shape-draft / plan-draft / building / review / done) in a table.
3. Stop without running anything.

## Run mode (default)

**Step 1 — find work.**
Read `.framework/.active-feature` if it exists. Otherwise read
`.framework/queue.md` and pick the first unchecked item; derive its
kebab-case slug. If both are empty, say "Queue is empty — add ideas to
`.framework/queue.md`" and stop. Write the slug to
`.framework/.active-feature`.

**Step 2 — determine phase.** Read `.framework/<slug>/` and act:

| Feature state | Action |
|---|---|
| No `spec.md` | Use the Task tool to invoke `product-manager` + `product-designer` (as in `/shape`); seed artifacts from templates first. Then ask **"Approve shape and continue to /plan? (yes / revise / stop)"** — STOP |
| `spec.md` is `draft` | Ask **"Approve shape and continue to /plan? (yes / revise / stop)"** — STOP |
| `spec.md` approved, no `plan.md` | Use the Task tool to invoke `software-engineer` in PLAN mode; seed `plan.md` + `tasks.md` from templates first. Then ask **"Approve plan and continue to /build? (yes / revise / stop)"** — STOP |
| `plan.md` is `draft` | Ask **"Approve plan and continue to /build? (yes / revise / stop)"** — STOP |
| `plan.md` approved, unchecked tasks remain | Use the Task tool to invoke `software-engineer` in BUILD mode to implement all unchecked tasks; when done, continue to the next row |
| All tasks checked, no `review.md` | Seed `review.md` from template; use the Task tool to invoke `code-reviewer`; when done, go to Step 3 |
| `review.md` exists, all tasks checked | Go to Step 3 |

**Step 3 — mark done.**
Check the feature's box in `.framework/queue.md`.
Clear `.framework/.active-feature` (delete the file or write an empty value).
Relay the review verdict from `review.md`.
Loop back to Step 1 — if another unchecked item exists in the queue, process
it; if not, say "Queue complete — all features processed."

## Approval gate rule

When the loop stops at a gate, a plain "yes" in the next human message:
- Flips `Status: draft → approved` in the relevant artifact(s)
- Immediately resumes the loop from Step 2

"revise <notes>" or "stop" returns control to the human; Status is not
flipped. The loop cannot self-approve.

## Notes

- `/loop <slug>` processes only that feature and stops after Step 3 rather
  than continuing to the next queue item.
- `/loop check` is always safe: reads and reports, never runs.
- On approval, flip ALL artifacts for that gate: shape → both `spec.md` +
  `design.md`; plan → both `plan.md` + `tasks.md`.

_Match the namespace you were invoked with when naming commands
(e.g. `/speckroo:loop` if installed as a plugin)._
