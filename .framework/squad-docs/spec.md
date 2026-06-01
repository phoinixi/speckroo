# Spec — squad-docs

> Owner: **product-manager** · Phase: `/discover`
> Status: approved   <!-- flipped to "approved" by /approve · do not edit by hand -->

## Problem & context
squad is functionally complete but not presentable. A stranger landing on the
GitHub repo has only a README and no at-a-glance way to understand what it is,
whether to trust it, or how to install it. There is no docs site, no worked
example, and none of the OSS scaffolding (CONTRIBUTING, CHANGELOG) that signals
a maintained project. We need squad to be **understandable in 30 seconds and
installable in two commands** — and we will build that using squad itself.

## Goals
- A zero-build GitHub Pages landing page that explains squad and shows the
  install + workflow at a glance.
- Complete, accurate documentation for first-time users and contributors.
- A real, in-repo worked example (these very artifacts) proving the workflow.

## Non-goals
- No JS framework, build pipeline, or Jekyll theme (zero-build constraint).
- No change to the framework's behavior, commands, or agents.
- No marketing copy beyond what's true; no pricing (this is OSS — see
  `monetization.md` status: n/a).

## Users & jobs-to-be-done
- As a **prospective user**, I want to grasp what squad does and install it
  without reading the whole README. Priority: P0
- As a **first-time user**, I want a worked example so the workflow clicks.
  Priority: P0
- As a **contributor**, I want to know how to propose changes safely. Priority: P1

## Functional requirements
- **FR-1** — A landing page at `docs/index.html` with: tagline, the two install
  commands, the five-phase workflow, the four-agent roster, and a repo link.
- **FR-2** — The page is zero-build: `docs/.nojekyll` present; no Liquid/theme.
- **FR-3** — A worked example committed in-repo showing real filled artifacts
  (spec → design → plan → tasks) for a non-trivial feature.
- **FR-4** — `CONTRIBUTING.md` covering how to edit agents/commands/templates
  and the rule that no command may auto-chain.
- **FR-5** — `CHANGELOG.md` seeded with a `0.1.0` entry to back a release tag.
- **FR-6** — README gains a Troubleshooting section and a link to the site.
- **FR-7** — `.github/` issue + PR templates and a CI job that JSON-lints both
  manifests and asserts every template still contains `> Status: draft`.

## Success metrics
- A new visitor can install squad using only the landing page (no README needed).
- `jq` lint + template-gate check pass in CI on every push.
- The worked example is internally consistent (every task traces to an FR).

## Open questions / assumptions
- Assumes the repo will be published as `github.com/phoinixi/squad` and Pages is
  served from `main` `/docs`. If the handle differs, install URLs must change.
