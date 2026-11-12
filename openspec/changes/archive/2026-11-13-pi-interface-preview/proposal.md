# Proposal

## Why

The editor currently only shows color swatches, so users cannot feel how a theme will look in Pi. A close-enough Pi interface preview lets them vibe-check colors in context before saving.

## What Changes

- Add an in-browser preview pane that renders an approximation of Pi's interactive interface using the currently edited theme colors.
- Map theme color tokens to Pi UI regions (header, messages, tool cards, markdown, editor, borders, etc.).
- Update preview live as colors/vars change.
- Keep the preview approximate; no need for pixel-perfect Pi parity.

## Capabilities

### New Capabilities
- `theme-preview`: Render an approximate Pi interface preview from a theme's color tokens.

### Modified Capabilities
<!-- none -->

## Impact

- `public/index.html` (preview markup/styles/JS)
- Reuses existing color resolution (vars/OKHSL/OKLCH/etc.)
- No server/API changes required initially
