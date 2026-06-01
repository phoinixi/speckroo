# monetize — define the money model (optional; monetization-strategist → monetization.md)

Follow the workflow contract in `core/workflow.md`. Feature: $ARGUMENTS
(if empty, use the active feature). Echo `Operating on feature: <slug>`. Skip
this phase entirely for features with no revenue angle.

1. Gate check: `.framework/<slug>/spec.md` must read `> Status: approved`. If
   missing or still `draft`, STOP and tell the human to approve the spec first.
2. Seed `.framework/<slug>/monetization.md` from the template if it does not
   exist yet.
3. Adopt the **monetization-strategist** role
   (`core/personas/monetization-strategist.body.md`) and fill `monetization.md`.

Produce only `monetization.md`, then STOP. Tell the human to review and approve
it (or skip to plan — an absent file means the phase was skipped).
