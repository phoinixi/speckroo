# Changelog

All notable changes to squad are documented here. Format based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
