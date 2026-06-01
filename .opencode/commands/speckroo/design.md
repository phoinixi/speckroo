---
description: Phase 2 — Product Designer drafts design.md.
agent: product-designer
subtask: true
---

# design — design the experience (product-designer → design.md)

Follow the workflow contract in `.framework/workflow.md`. Feature: $ARGUMENTS
(if empty, use the active feature). Echo `Operating on feature: <slug>`.

1. Gate check: `.framework/<slug>/spec.md` must read `> Status: approved`. If
   missing or still `draft`, STOP and tell the human to approve the spec first.
2. Seed `.framework/<slug>/design.md` from the template if it does not exist yet.
3. Adopt the **product-designer** role (`.framework/personas/product-designer.md`)
   and fill `design.md`.

Produce only `design.md`, then STOP. Tell the human to review and approve it
(next: monetize if relevant, otherwise plan).
