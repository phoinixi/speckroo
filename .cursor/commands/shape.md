# shape — default Phase 1 (product-manager + product-designer → spec.md + design.md)

Follow the workflow contract in `.framework/workflow.md`. Idea: $ARGUMENTS

1. Setup check: `.framework/templates/` must exist. If not, stop and tell the
   human to run `init-framework` first.
2. Derive a short kebab-case `<feature-slug>` from the idea (or use $ARGUMENTS
   as a slug if it matches an existing `.framework/<slug>/` directory — resume
   mode). Create `.framework/<feature-slug>/` if it does not exist. Record the
   slug as the active feature.
3. Echo `Operating on feature: <feature-slug>`.
4. **Product-manager pass:** seed `.framework/<slug>/spec.md` from the template
   if it does not exist yet. If `spec.md` is already `approved`, skip this pass.
   Otherwise adopt the **product-manager** role (`.framework/personas/product-manager.md`)
   and fill `spec.md`. Leave its Status as `draft`.
5. **Product-designer pass:** seed `.framework/<slug>/design.md` from the
   template if it does not exist yet. If `design.md` is already `approved`,
   skip this pass. Otherwise adopt the **product-designer** role
   (`.framework/personas/product-designer.md`) and fill `design.md`, reading the
   fresh-draft `spec.md` from this same run (the human's invocation of `/shape`
   is consent to draft both artifacts in one pass). Leave its Status as `draft`.
6. Return a combined summary: key spec decisions + key design flows + any open
   questions that need a human decision.

End with:
> Approve shape (spec.md + design.md) and continue to /plan? (yes / revise <notes> / stop)

On "yes": replace `> Status: draft` with `> Status: approved` in both
`spec.md` and `design.md`, then run the plan phase (gate-check, seed
plan/tasks templates if absent, adopt software-engineer in PLAN mode and
produce `plan.md` + `tasks.md`). After plan is drafted, end with the plan
approval prompt.

On "revise <notes>": incorporate the notes and re-draft only the affected
artifact(s); do not flip Status.

On "stop": confirm Status remains draft and return control to the human.
