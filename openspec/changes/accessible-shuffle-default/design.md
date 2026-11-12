# Design

## Context

The editor already has live preview and color resolution. The gap is first-run UX: built-in themes are not listed, so the form starts empty. See proposal.md.

## Goals / Non-Goals

- Goals: immediate visible preview on load; one-click shuffle; accessible and coherent palette; regenerate vars/export tokens.
- Non-Goals: perfect color harmony; WCAG certification; server-side generation; persisting drafts.

## Decisions

- **Palette generation in browser**: Use a role-based OKHSL generator with one base hue and derived accent hues. Rationale: keeps implementation client-side and reuses existing color inputs.
- **Lightness roles**: Fixed tiers per appearance mode (dark: bg 0.12-0.18, card 0.18-0.26, text 0.88-0.94, muted 0.62-0.70, borders 0.45-0.55, accents 0.62-0.72; invert for light).
- **Contrast guard**: Adjust text/muted lightness until critical pairs meet a minimum ratio.
- **Vars regeneration**: Generate a small set of base vars (text, muted, accent, blue, etc.) and map color tokens to vars or direct okhsl values, matching dark theme style.
- **Default draft**: On load, if no user theme is selected, create an in-memory draft from a shuffled palette with name "my-theme".
- **Shuffle button**: Add to preview card; regenerates in place without DOM rebuild to preserve focus where possible.

## Risks / Trade-offs

- Random palettes may still feel off → mitigate with constrained hues and lightness roles.
- Regenerating vars can break user edits → Shuffle replaces entire draft, as intended.

## Migration Plan

No migration; client-only change.

## Open Questions

None.
