# speckroo:init-framework — one-time setup

Optional path to speckroo source: $ARGUMENTS

Steps:
1. Find the speckroo source. Check in order: `$ARGUMENTS` if given, then `./speckroo/.framework/`, then `~/workspace/speckroo/speckroo/.framework/`. If none found, ask the human for the path.
2. Create `.framework/` and `.framework/templates/` in the project root.
3. Copy from the source: `constitution.md` → `.framework/constitution.md`, everything in `templates/` → `.framework/templates/`. Skip if `.framework/` already set up.
4. Append `.framework/.active-feature` to `.gitignore` if missing.
5. Walk the human through filling `.framework/constitution.md` — ask one question at a time, write their answers.
6. Done: start a feature with `/speckroo:discover <idea>`.
