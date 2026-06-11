# Changelog

All notable changes to speckroo are documented here. Format based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] — unreleased

### Added
- **`/loop`** — autonomous phase coordinator. Reads `.framework/queue.md`,
  chains shape → plan → build → review, and stops only at the two human
  approval gates. `/loop check` inspects queue state without running anything;
  `/loop <slug>` targets a single feature.
- **`/review`** — adversarial build verification. A new `code-reviewer` persona
  reads the finished build against spec/design/plan and writes `review.md` with
  structured findings (✗ blockers / ⚠ warnings / ✓ notes). Informational —
  does not block the pipeline. Auto-chained by `/loop` after every build.
- **`queue.md`** — project-level feature backlog (`.framework/queue.md`).
  A checklist of feature ideas; `/loop` picks the first unchecked item.
  Seeded by `init-framework` and the CLI setup command.
- **`skill.md`** — project-level skill accumulator (`.framework/skill.md`).
  Every persona reads it before starting a phase; the software-engineer
  appends new learnings after each build. Makes each subsequent feature
  faster and better-aligned to project conventions.
- `code-reviewer` persona body (`core/personas/code-reviewer.body.md`) and
  matching plugin agent (`speckroo/agents/code-reviewer.md`). Added to
  PERSONAS manifest — generated for all tool adapters.

### Changed
- All personas now read `.framework/skill.md` at the start of each phase.
- Software-engineer persona appends discoveries to `skill.md` after each build.
- `init-framework` command now seeds `queue.md` and `skill.md` alongside
  `constitution.md`.
- `bin/speckroo.mjs`: persona and template counts are now dynamic (no more
  hardcoded `(4)`/`(5)` in log output).
- CI lint now checks `code-reviewer` persona sync alongside the other four.
- `core/workflow.md`: added Loop mode and Skill accumulation sections.
- Review phase row added to the phases table in `core/workflow.md` and `AGENTS.md`.

### Migration
No migration needed. Existing feature dirs and workflows are unaffected.
New files (`queue.md`, `skill.md`) are seeded by `init-framework` or on next
`setup` run; they are not required for existing flows to continue working.

## [0.2.0] — unreleased

### Added
- `/shape <idea>` — new default Phase 1 command that runs product-manager then
  product-designer in one pass, producing `spec.md` + `design.md`, then asks for
  a single combined inline approval before continuing to plan.
- **Inline approvals.** Every phase command ends with an "Approve and continue?"
  prompt; a plain "yes" flips `Status: draft → approved` and immediately starts
  the next phase. `/approve` remains as an explicit fallback.
- `/approve shape` token — flips both `spec.md` and `design.md` together.
- **Batch `/build`** (new default): implements all unchecked tasks in order,
  checks boxes as it goes, ends with one consolidated review summary.
- `/build next` — explicit single-task mode (the previous default behavior).

### Changed
- Default flow reduced from 5 phases + 4 `/approve` steps to 3 steps + 2 inline
  checkpoints: `/shape` → yes → `/plan` → yes → `/build`.
- `/discover` and `/design` repositioned as granular strict-mode alternatives
  (still fully functional; no breaking change to existing muscle memory).
- Personas neutralized: closing messages no longer hardcode next-step commands
  (the orchestrating command owns that wording).
- `core/workflow.md` updated with inline-approval rule, shape phase, batch-build
  discipline, and "Default vs strict mode" section.
- All templates: updated header comments to reflect inline-approval path.
- `AGENTS.md`: updated with shape phase, inline-approval gate, batch-build rule.
- `bin/speckroo.mjs` COMMANDS manifest: added `shape`; updated descriptions;
  dynamic command count; next-step hints now say `shape <idea>`.

### Migration
No migration needed. Existing `.framework/<slug>/` dirs with old artifact sets
work unchanged — same five files, same `Status:` mechanism. Old commands
(`/discover`, `/design`, `/approve`, `/build next`) all still work.

## [0.1.0] — unreleased

Initial release.

### Added
- Four role-based subagents: product-manager, product-designer,
  monetization-strategist, software-engineer.
- Workflow slash commands: `/discover`, `/design`, `/monetize`, `/plan`,
  `/build`, plus `/approve`, `/status`, and `/init-framework`.
- Recorded approval gate: a `Status: draft` line per artifact, flipped to
  `approved` by `/approve`; each phase gate-checks the upstream artifact.
- Per-feature artifact routing under `.framework/<slug>/`, with an active-feature
  pointer and seed-on-demand templates (each phase seeds only its own artifact).
- Project `constitution.md` read first by every agent.
- Distribution as a Claude Code plugin via a git marketplace
  (`.claude-plugin/marketplace.json` + `squad/.claude-plugin/plugin.json`).
- **Multi-tool support.** Canonical source in `core/` (personas, command bodies,
  workflow contract) projected into each tool by a Node CLI
  (`npx github:phoinixi/squad setup <tool>`): OpenCode, Copilot CLI, Cursor, Windsurf,
  and Codex. CI asserts the Claude plugin's personas stay byte-identical to core.
- **Universal `AGENTS.md`** — a zero-install driver that runs the workflow in any
  `AGENTS.md`-aware tool (single-agent / degraded mode).
- Zero-build GitHub Pages landing page in `docs/`.
- Worked example: squad's own docs feature in `.framework/squad-docs/`.
- `CONTRIBUTING.md`, `NOTICE` (MIT attributions to Spec Kit and BMAD), and CI
  that lints the manifests and asserts the template gate lines.
