# init-framework — scaffold speckroo into this project (no persona)

One-time setup. The `speckroo` CLI has already scaffolded `.framework/` masters
(constitution, templates, personas, workflow) into this project during install —
this command finishes setup by filling the constitution.

1. Confirm `.framework/templates/` and `.framework/constitution.md` exist. If
   not, re-run the speckroo installer for this tool.
2. Ensure `.gitignore` ignores `.framework/.active-feature` (append if missing).
3. Seed `.framework/queue.md` (feature backlog) and `.framework/skill.md`
   (project conventions) from templates if they do not exist yet.
4. Walk the human through filling `.framework/constitution.md` with this
   project's durable principles. Ask one question at a time; write the answers in.
5. Tell the human they're ready: start a feature with `shape <idea>`, or add
   ideas to `queue.md` and run `loop` to process the queue automatically.

Edits only `.framework/` and `.gitignore`. Creates no feature.
