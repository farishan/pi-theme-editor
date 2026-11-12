# Tasks

## 1. Default draft

- [x] 1.1 Change initial load to create an in-memory shuffled draft when no saved theme is selected
- [x] 1.2 Ensure the draft is not written to disk until Save

## 2. Shuffle palette generator

- [x] 2.1 Implement role-based OKHSL palette generator with base hue and derived accents
- [x] 2.2 Add contrast guard for critical text/background pairs
- [x] 2.3 Regenerate vars and export tokens alongside colors
- [x] 2.4 Respect appearance mode when generating lightness tiers

## 3. UI

- [x] 3.1 Add Shuffle button to preview card
- [x] 3.2 Wire Shuffle to regenerate draft and update form/preview
- [x] 3.3 Keep color pickers/swatches in sync after shuffle

## 4. Verification

- [x] 4.1 Open editor with no saved themes and confirm preview renders
- [x] 4.2 Shuffle multiple times and confirm preview updates and contrast remains readable
- [x] 4.3 Save a shuffled draft and reload to confirm persistence
