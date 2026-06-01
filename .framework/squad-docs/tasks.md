# Tasks — squad-docs

> Owner: **software-engineer** · Phase: `/plan` → `/build`
> Status: approved   <!-- flipped to "approved" by /approve (together with plan.md) · do not edit by hand -->
> `/build` implements exactly ONE unchecked task per run, then stops for review.

- [x] **T-1** — Build the landing page.
  - Files: `docs/index.html`, `docs/.nojekyll`
  - Acceptance: self-contained, renders with CSS off, mobile-friendly, has both
    install commands, the 5-phase workflow, the 4 agents, and a repo link.
  - Satisfies: FR-1, FR-2
- [x] **T-2** — Add `CONTRIBUTING.md`.
  - Files: `CONTRIBUTING.md`
  - Acceptance: explains editing agents/commands/templates + the no-auto-chain
    rule + the "every template keeps its Status line" invariant.
  - Satisfies: FR-4
- [x] **T-3** — Add `CHANGELOG.md` with a `0.1.0` entry.
  - Files: `CHANGELOG.md`
  - Acceptance: Keep-a-Changelog format; `0.1.0` lists the initial feature set.
  - Satisfies: FR-5
- [x] **T-4** — README: troubleshooting + site link + example pointer.
  - Files: `README.md`
  - Acceptance: a Troubleshooting section, a link to the Pages site, and a
    pointer to `.framework/squad-docs/` as the worked example.
  - Satisfies: FR-6, FR-3
- [x] **T-5** — `.github/` templates + manifest-lint CI.
  - Files: `.github/ISSUE_TEMPLATE.md`, `.github/PULL_REQUEST_TEMPLATE.md`,
    `.github/workflows/lint.yml`
  - Acceptance: CI runs on push/PR, `jq`-lints both manifests, and greps every
    template for `> Status: draft`.
  - Satisfies: FR-7
