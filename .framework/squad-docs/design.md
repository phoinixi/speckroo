# Design — squad-docs

> Owner: **product-designer** · Phase: `/design` · Reads: approved `spec.md`
> Status: approved   <!-- flipped to "approved" by /approve · do not edit by hand -->

## Primary user flow
1. Visitor arrives at `https://francescoesposito.dev/squad/`.
2. Hero states what squad is in one line + a primary "Install" focus.
3. Visitor copies the two install commands (one-click copy affordance).
4. Visitor skims the 5-phase workflow and the 4-agent roster.
5. Visitor clicks through to the GitHub repo / worked example for depth.

## Screen / component inventory
| Component | Purpose | Satisfies |
|---|---|---|
| Hero | tagline + subhead + primary CTA to GitHub | FR-1 |
| Install block | the two `/plugin …` commands, copyable | FR-1 |
| Workflow strip | discover → design → monetize → plan → build, with gates | FR-1 |
| Agent cards | 4 personas, what each owns + its artifact | FR-1 |
| "Why not one agent" note | the artifact-handoff differentiator | FR-1 |
| Footer | repo link, license, attribution to Spec Kit + BMAD | FR-1 |

## States
- **Empty/loading:** none — fully static HTML, renders instantly.
- **Error:** none — no JS dependencies; copy buttons degrade to selectable text.
- **Edge cases:** must read well with CSS disabled (semantic HTML), and on
  mobile (single-column stack).

## Interaction & accessibility notes
- Single `<main>` with semantic sections; headings in order (h1→h2→h3).
- Copy buttons are progressive enhancement; the command text is always
  selectable even if JS is off.
- Color contrast ≥ WCAG AA. Respect `prefers-color-scheme` (dark default,
  light fallback). Visible focus rings on interactive elements.

## Visual direction
Developer-tool aesthetic: dark, calm, high-contrast, monospace accents.

```
┌───────────────────────────────────────────────┐
│  squad                              [GitHub →] │
│                                                │
│  Spec-driven dev with four agents              │
│  and you in the loop.                          │
│                                                │
│   ┌──────────────────────────────────────┐    │
│   │ /plugin marketplace add phoinixi/squad│ ⧉ │
│   │ /plugin install squad@squad           │ ⧉ │
│   └──────────────────────────────────────┘    │
├───────────────────────────────────────────────┤
│  discover → design → monetize → plan → build   │
│     spec     design   money    plan    code    │
│        └ you /approve between every step ┘      │
├───────────────────────────────────────────────┤
│  [PM]  [Designer]  [Monetization]  [Engineer]  │
└───────────────────────────────────────────────┘
```

- Accent color: a single hue (electric blue/green) for links + CTA only.
- Generous spacing; max content width ~760px; system + monospace font stack.

## Open design questions
- None blocking. Logo/wordmark is just the text "squad" set in monospace.
