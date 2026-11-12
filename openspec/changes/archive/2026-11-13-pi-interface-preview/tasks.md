# Tasks

## 1. Preview markup and styling

- [x] 1.1 Add a Pi-like preview container (#piPreview) to the preview card and swatch row (#swatches) and verify both render in the page
- [x] 1.2 Style the Pi preview with CSS variables driven by theme tokens and verify layout resembles Pi interface

## 2. Color mapping and live updates

- [x] 2.1 Implement resolvePreviewColors() mapping theme tokens to CSS variables and verify unresolved tokens fall back
- [x] 2.2 Wire updatePreview() to set CSS variables on #piPreview root and verify live updates on color edit
- [x] 2.3 Keep swatch strip updating alongside preview and verify swatches still reflect colors

## 3. Verification

- [x] 3.1 Load dark theme and confirm preview renders with themed regions; save a theme and reload to confirm persistence
