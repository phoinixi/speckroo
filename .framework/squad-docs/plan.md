# Technical Plan — squad-docs

> Owner: **software-engineer** · Phase: `/plan` · Reads: approved `spec.md` (+ `design.md`, `monetization.md` if present)
> Status: approved   <!-- flipped to "approved" by /approve · do not edit by hand -->

## Architecture overview
Pure static assets plus repo metadata. No runtime, no build. GitHub Pages serves
`/docs` from `main`. Everything else is plain Markdown the repo already renders.

## Components & boundaries
| Component | Responsibility | Depends on | Satisfies |
|---|---|---|---|
| `docs/index.html` | self-contained landing page (inline CSS + tiny copy JS) | — | FR-1, FR-2 |
| `docs/.nojekyll` | disable Jekyll processing | — | FR-2 |
| worked example | real artifacts in `.framework/squad-docs/` (these files) | the framework | FR-3 |
| `CONTRIBUTING.md` | contribution rules | README | FR-4 |
| `CHANGELOG.md` | release history, `0.1.0` | — | FR-5 |
| README edits | troubleshooting + site link + example link | site | FR-6 |
| `.github/` | issue/PR templates + lint CI | manifests, templates | FR-7 |

## Data model
None. Content only.

## Key technical decisions
- **Zero-build static HTML over Jekyll** — avoids a Ruby build and theme/plugin
  allowlist friction for zero benefit on a Markdown+prompts project. (FR-2)
- **Inline CSS in `index.html`** — one file, nothing to misload on Pages. A
  separate stylesheet was considered and rejected for robustness/simplicity.
- **The dogfood IS the example** — `.framework/squad-docs/` doubles as the
  worked example, so it can never drift from how the framework actually works.
- **CI = `jq` + grep** — cheapest guard against the most likely regression
  (manifest typo, or a template losing its `> Status: draft` gate string).

## Dependencies & risks
- Risk: GitHub handle/repo name assumption (`phoinixi/squad`). If wrong, install
  URLs in the page + manifests are dead. Mitigation: single source the handle in
  one obvious place and call it out in the release checklist.
- Risk: Pages not enabled. Mitigation: document the Settings → Pages steps.

## Test strategy
- Manual: open `docs/index.html` locally; verify it reads with CSS off and on
  mobile width; verify copy buttons.
- CI: `jq . ` on both manifests; grep each template for `> Status: draft`.
- Consistency: every task in `tasks.md` cites an FR; README claims match files.
