# Contributing to squad

squad has **one canonical source** (`core/`) projected into every tool. It's
Markdown + JSON + a tiny Node CLI. **Edit roles and commands in `core/` — never
in a generated adapter.**

## Project layout

```
core/                             ← THE source of truth — edit here
  personas/*.body.md             4 role prompts (no frontmatter)
  commands/*.md                  8 tool-agnostic command bodies
  workflow.md                    gate / phase / routing contract
bin/squad.mjs                    CLI: projects core/ into a tool's layout
package.json                     `npx github:phoinixi/squad setup <tool>`
AGENTS.md                        universal zero-install driver
.claude-plugin/marketplace.json  Claude Code marketplace catalog
squad/                           Claude Code plugin (native channel)
  .claude-plugin/plugin.json     bump version on release
  agents/                        CC personas — bodies MUST equal core/ (CI-checked)
  commands/                      CC commands (Task-tool dispatch)
  .framework/{constitution.md, templates/}   masters the CLI vendors
docs/                            zero-build GitHub Pages site
.framework/squad-docs/           squad's own design record (worked example)
```

Per-tool knowledge (file paths + frontmatter) lives only in `bin/squad.mjs`.
Add a new tool by adding one entry to its `TOOLS` map — no new persona/command
copies.

## The rules that must not break

1. **No phase auto-chains.** A command produces its artifact and stops. It must
   never run the next phase. The human is the gate.
2. **One owner per artifact.** Each agent writes only its own file and never
   edits another phase's artifact.
3. **Every template keeps its gate line.** Each file in
   `squad/.framework/templates/` must contain a `> Status: draft` line — the
   `/approve` command flips it to `approved`, and the phase gates check for it.
   CI fails if a template loses this line.
4. **Agents never self-approve.** Only the human, via `/approve`, sets a
   `Status` to `approved` (or `n/a` for monetization).
5. **Docs match files.** If you change a command, agent, or template, update the
   README and `docs/` so claims stay true.

## Making a change

1. Fork and branch.
2. Edit the role/command in **`core/`** (and the matching `squad/agents/` copy
   for the Claude plugin — CI checks they're equal). Keep prompts tight.
3. Validate locally (same checks as CI):
   ```sh
   jq . .claude-plugin/marketplace.json squad/.claude-plugin/plugin.json package.json
   grep -rL '> Status: draft' squad/.framework/templates   # should print nothing
   node --check bin/squad.mjs
   ( cd "$(mktemp -d)" && node "$OLDPWD/bin/squad.mjs" setup opencode )  # smoke test
   ```
4. If you changed behavior, add a `CHANGELOG.md` entry.
5. Open a PR. Squad's own workflow (`.framework/squad-docs/`) is a good example
   of the spec→plan→tasks rigor we like in non-trivial changes.

## Testing changes

**Claude Code plugin:** install your local copy in a throwaway project —
`/plugin marketplace add ~/path/to/your/clone`, `/plugin install squad@squad` —
then walk `/squad:init-framework` → `/squad:discover` → `/squad:approve` →
`/squad:design` … and confirm each gate behaves.

**Other tools:** `cd` into a throwaway project and run
`node ~/path/to/clone/bin/squad.mjs setup <tool>`; open it in that tool and walk
the same flow.

## Releases

Bump `version` in `squad/.claude-plugin/plugin.json`, add a `CHANGELOG.md`
entry, then tag (`git tag v0.x.0 && git push --tags`).
