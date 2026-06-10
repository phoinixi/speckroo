---
description: One-time setup — scaffold the speckroo framework into the current project.
---

# /init-framework — bootstrap the framework in this project

Run this once in any project after installing the speckroo plugin. It copies the
bundled masters into this repo so the framework's artifacts live in *your*
project's git history (the plugin itself is in an ephemeral cache).

In the paths below, `${CLAUDE_PLUGIN_ROOT}` is the plugin's installed location
(the cache dir holding this plugin's files) and `${CLAUDE_PROJECT_DIR}` is the
root of the project you're working in. Resolve them to real paths — do not paste
the literal `${...}` into a filename.

Steps:
1. Create `${CLAUDE_PROJECT_DIR}/.framework/` and
   `${CLAUDE_PROJECT_DIR}/.framework/templates/`.
2. Copy the bundled masters into the project:
   - `${CLAUDE_PLUGIN_ROOT}/.framework/constitution.md`
       → `${CLAUDE_PROJECT_DIR}/.framework/constitution.md`
   - everything in `${CLAUDE_PLUGIN_ROOT}/.framework/templates/`
       → `${CLAUDE_PROJECT_DIR}/.framework/templates/`
   Do not overwrite files that already exist — if `.framework/` is already set
   up, say so and stop.
3. Ensure `.gitignore` in the project root ignores
   `.framework/.active-feature` (append the line if missing).
4. Walk the human through filling `.framework/constitution.md` with this
   project's durable principles (tech constraints, quality bar, out-of-bounds).
   Ask one question at a time; write their answers into the file.
5. Tell the human they're ready: start a feature with `/shape <idea>`.
   (If installed as a plugin, commands are namespaced — e.g. `/speckroo:shape`.)

This command edits only the project's `.framework/` and `.gitignore`. It creates
no feature.
