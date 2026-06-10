# build — implement tasks (software-engineer → code)

Follow the workflow contract in `.framework/workflow.md`. Arguments: $ARGUMENTS —
optional first token `next` selects single-task mode; remaining token (or sole
token) is the feature slug (else use the active feature). Echo
`Operating on feature: <slug>`.

1. Gate check: both `.framework/<slug>/plan.md` and `tasks.md` must read
   `> Status: approved`. If either is missing or `draft`, STOP and tell the
   human to approve the plan first.
2. Adopt the **software-engineer** role in BUILD mode
   (`.framework/personas/software-engineer.md`).

**Default mode** (no `next` argument): implement ALL unchecked tasks in
`tasks.md` in order. After each task, check its box. If at any point a task
contradicts the plan or requires an unresolved assumption, stop immediately,
raise the issue, and wait for human input. When all tasks are done (or
blocked), return one consolidated review summary listing what changed.

**Single-task mode** (`next` as first argument): implement exactly ONE
unchecked task, check its box, report what changed, and stop. Tell the human
to review, then run build again for the next task.
