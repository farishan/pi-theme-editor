# Proposal

## Why

On first load the editor shows an empty form because built-in themes are not listed, so users cannot see the visual preview without manually creating a draft. A default in-memory draft plus a one-click shuffle makes the preview immediately demonstrable and produces usable random themes.

## What Changes

- Load a shuffled, accessible theme draft into the editor on first paint (in-memory until Save).
- Add a **Shuffle** button that regenerates the draft using a coherent, contrast-safe palette.
- Regenerate vars alongside colors and export tokens.
- Respect the current appearance mode (dark/light) when generating.

## Capabilities

### New Capabilities
- `theme-shuffle`: Generate accessible, coherent random theme drafts and load one by default.

### Modified Capabilities
<!-- none -->

## Impact

- `public/index.html` (default load flow, shuffle button, palette generator)
- Reuses existing color resolution/preview pipeline
- No server/API changes required
