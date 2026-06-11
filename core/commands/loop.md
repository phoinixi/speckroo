# loop — autonomous phase coordinator

Follow the workflow contract in `core/workflow.md`. Arguments: $ARGUMENTS —
optional first token `check` enters inspect-only mode; remaining token is an
optional feature slug to target exclusively.

## Inspect mode (`check`)

Read `.framework/queue.md`. For each listed feature, read its artifact dir
and report its current phase (none / shape-draft / plan-draft / building /
review / done) in a table. Stop without running anything.

## Run mode (default)

**Step 1 — find work.**
Check `.framework/.active-feature`. If set, use that slug.
Otherwise read `.framework/queue.md` and pick the first unchecked item;
derive its kebab-case slug; write it to `.framework/.active-feature`.
If both are empty, say "Queue is empty — add ideas to `.framework/queue.md`"
and stop.

**Step 2 — determine phase.** Read `.framework/<slug>/`:

| Feature state | Action |
|---|---|
| No `spec.md` | Run `shape <slug>` then STOP at the approval prompt |
| `spec.md` is `draft` | Ask **"Approve shape and continue to /plan? (yes / revise / stop)"** — STOP |
| `spec.md` approved, no `plan.md` | Run `plan <slug>` then STOP at the approval prompt |
| `plan.md` is `draft` | Ask **"Approve plan and continue to /build? (yes / revise / stop)"** — STOP |
| `plan.md` approved, unchecked tasks remain | Run `build <slug>`, then continue to next row |
| All tasks checked, no `review.md` | Run `review <slug>`, then go to Step 3 |
| `review.md` exists and all tasks checked | Go to Step 3 |

**Step 3 — mark done.**
Check the feature's box in `.framework/queue.md`.
Clear `.framework/.active-feature`.
Report the review verdict from `review.md`.
Loop back to Step 1 — if another unchecked item exists in the queue,
process it; if not, say "Queue complete — all features processed."

## Approval gate

When the loop stops at a gate, a plain "yes" in the next human message flips
`Status: draft → approved` in the relevant artifact(s) and the loop
immediately resumes from Step 2. "revise <notes>" or "stop" returns control
to the human without flipping Status.

## Notes

- The loop respects the same approval rules as standalone commands.
  It cannot self-approve.
- Running `/loop <slug>` processes only that feature and stops after Step 3
  rather than continuing to the next queue item.
- `/loop check` is always safe: reads and reports, never runs.
