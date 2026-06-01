# Project Constitution — speckroo

> Durable, project-wide principles. **Every agent reads this first**, every phase.
> This is speckroo's own constitution — speckroo is built using speckroo (dogfooding).

## Product principles
- Serve a solo builder or small team using Claude Code who wants disciplined,
  reviewable, spec-driven development with a human approving every phase.
- The framework must stay **project-agnostic** and **easy to install/reuse**.
- We will NOT add features that remove the human from the loop or let phases
  auto-chain without explicit approval.

## Quality bar
- Docs and config must match the actual files — no aspirational claims.
- Markdown is the lingua franca; no build step required to read or use the repo.
- A change isn't done until the README/docs and any affected templates agree.

## Technical constraints
- Distribution: a Claude Code plugin served from a git marketplace. No runtime
  dependencies, no package manager, no compiler.
- The GitHub Pages site must be **zero-build** (static HTML, `.nojekyll`).
- Keep agent system prompts tight and role-bound; one owner per artifact.

## Working agreement
- One persona owns each phase; agents hand off via `.framework/` artifacts.
- No phase proceeds without explicit human "approved" (recorded via `/approve`).
- Agents write only their own artifact and never edit another phase's file.
- Decisions trace back to numbered requirements (FR-#) wherever possible.
