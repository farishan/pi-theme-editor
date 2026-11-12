# theme-preview Specification

## Purpose
Provide an approximate Pi interface preview so users can vibe-check theme colors in context before saving.

## Requirements

### Requirement: Preview renders Pi-like interface
The system SHALL render a preview pane approximating Pi's interactive interface using the active edited theme colors.

#### Scenario: Theme colors applied
- **WHEN** a theme is loaded or edited
- **THEN** the preview updates to use the theme's color tokens for UI regions

### Requirement: Approximate fidelity
The preview SHALL aim for visual vibe rather than pixel-perfect accuracy.

#### Scenario: Non-exact layout accepted
- **WHEN** minor spacing or component differences exist
- **THEN** the preview is still considered valid

### Requirement: Live updates
The preview SHALL update in real time as color or var values change.

#### Scenario: Editing a color
- **WHEN** the user changes a color value
- **THEN** the preview reflects the change without requiring save
