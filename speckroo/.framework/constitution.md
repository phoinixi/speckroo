# Project Constitution

> Durable, project-wide principles. **Every agent reads this first**, every phase.
> Fill this in once per project via `/init-framework`. Keep it short and stable —
> if it changes often, it belongs in a spec, not here.

## Product principles
- _Who we serve and the single most important outcome for them._
- _What we will NOT build (hard out-of-bounds)._

## Quality bar
- _Definition of done (tests, accessibility, performance budgets, etc.)._
- _Code conventions to follow (style, language, frameworks)._

## Technical constraints
- _Stack, platforms, and integrations that are fixed._
- _Things that are off the table (no new infra, no PII storage, etc.)._

## Working agreement
- One persona owns each phase; agents hand off via `.framework/` artifacts.
- No phase proceeds without explicit human "approved".
- Agents write only their own artifact and never edit another phase's file.
- Decisions trace back to numbered requirements (FR-#) wherever possible.
