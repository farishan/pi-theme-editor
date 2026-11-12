# Design

## Context

The editor is a single-page Bun app (`public/index.html`) with client-side color resolution (`toHex`, vars/OKHSL/OKLCH/etc.) and live form inputs. The preview today is a grid of swatches in the `#preview` div inside the "Preview (approx)" card. We add an approximate Pi interface preview that reuses the same resolved colors and updates on every input via `updatePreview()`.

No server/API changes. All work is in `public/index.html`.

## Goals / Non-Goals

**Goals:**
- Render an approximate Pi interactive interface (header, message list with user/assistant messages, tool card, markdown sample, editor input) styled from the active theme's color tokens.
- Update live as colors/vars change (reuse existing `updatePreview` hook).
- Keep it approximate (vibe-check), no pixel-perfect parity.

**Non-Goals:**
- Real Pi rendering or running Pi.
- Server-side changes.
- Full markdown rendering engine; use a small static sample.

## Decisions

- **Single preview pane in existing card**: Replace swatch grid with a styled Pi-like panel; keep a compact swatch strip below/above optional. Decision: render the Pi-like panel in `#preview`, and retain a small swatch row for quick reference? Simpler: make `#preview` the Pi panel; swatches become less important. I'll keep both: a Pi panel plus a collapsed swatch row. Actually to minimize scope, replace the swatches with the Pi panel entirely; the color inputs already show chips. But the swatch strip is useful. Decision: render Pi panel in `#preview`, and move swatches into a separate `#swatches` div to preserve existing behavior. Keep both.
- **Color resolution**: Reuse `toHex(value, vars)` for each token; fall back to a sensible default if unresolved.
- **Styling via CSS variables**: Set CSS custom properties on the preview root from resolved tokens so markup stays simple and updates are cheap. `updatePreview()` recomputes vars and sets `style` on root.
- **Static markup**: Build the Pi interface DOM once (on first render) and only update CSS variables + text colors thereafter. Use a template injected into `#preview`.
- **Mapping**: pageBg/cardBg/infoBg from `export`; UI regions from colors (border, borderMuted, text, muted, accent, userMessageBg/Text, tool*Bg/Title/Output, md*, selectedBg, success/error/warning).

## Risks / Trade-offs

- [Unresolved color] → fall back to a default hex so panel never breaks.
- [Color resolution cost] → only resolve ~30 tokens per update; acceptable.
- [Live update perf] → setting CSS vars on root is O(tokens), fine.

## Migration Plan

None (client-only). Save/validate unchanged.

## Open Questions

None.
