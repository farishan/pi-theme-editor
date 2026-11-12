# theme-shuffle Specification

## Purpose
Generate accessible, visually coherent random theme drafts and load one by default so the preview is immediately visible without saving.

## Requirements

### Requirement: Default in-memory draft
The system SHALL load a shuffled theme draft into the editor on first paint without writing to disk.

#### Scenario: First load
- **WHEN** the editor opens with no saved theme selected
- **THEN** a draft theme is rendered in the form and preview without a file being saved

### Requirement: Shuffle action
The system SHALL provide a Shuffle control that regenerates the current draft's colors, vars, and export tokens.

#### Scenario: Clicking Shuffle
- **WHEN** the user clicks Shuffle
- **THEN** the form and preview update to a new palette without saving

### Requirement: Accessible palette
Generated palettes SHALL maintain readable contrast for critical text/background pairs.

#### Scenario: Text readability
- **WHEN** a draft is generated
- **THEN** text on page background and message/tool backgrounds meets a minimum contrast threshold

### Requirement: Coherent palette
Generated palettes SHALL use related hues and consistent lightness roles rather than fully independent random colors.

#### Scenario: Visual coherence
- **WHEN** a draft is generated
- **THEN** surfaces, text, muted, and accents follow stable lightness/saturation roles

### Requirement: Appearance awareness
Generated palettes SHALL adapt lightness roles to the selected appearance mode.

#### Scenario: Light mode
- **WHEN** appearance is light and Shuffle is used
- **THEN** backgrounds are light and text is dark
