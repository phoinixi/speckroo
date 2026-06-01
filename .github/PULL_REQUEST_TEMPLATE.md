## What & why

<!-- What does this change and why? Link any issue. -->

## Checklist

- [ ] No command auto-chains into another phase.
- [ ] Each agent still writes only its own artifact.
- [ ] Every `squad/.framework/templates/*.md` still has a `> Status: draft` line.
- [ ] Agents do not self-approve (only `/approve` sets `approved`/`n/a`).
- [ ] README / `docs/` updated to match any behavior change.
- [ ] `CHANGELOG.md` updated (for user-facing changes).
- [ ] `jq . .claude-plugin/marketplace.json squad/.claude-plugin/plugin.json` passes.
