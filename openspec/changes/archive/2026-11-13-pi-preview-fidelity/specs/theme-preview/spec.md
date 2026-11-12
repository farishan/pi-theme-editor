# Spec Delta

## ADDED Requirements

### Requirement: Expanded Pi preview coverage
The system SHALL render additional Pi interface regions in the preview, including search matches, selected rows, badges, thinking text, scrollbars, and status/input areas.

#### Scenario: Additional regions visible
- **WHEN** a theme is loaded
- **THEN** the preview displays the expanded regions using theme tokens

### Requirement: Expanded token mapping
The system SHALL map additional theme color tokens to preview CSS variables, including border, scrollbar, search match, markdown hr, accent, warning, error, and success.

#### Scenario: Token changes reflected
- **WHEN** one of the additional tokens changes
- **THEN** the corresponding preview region updates
