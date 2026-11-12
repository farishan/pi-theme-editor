# pi-theme-editor

Local web editor for [Pi](https://github.com/earendil-works/pi) themes.

## Run

```bash
bun install   # no deps yet
bun run start # http://127.0.0.1:4317
```

Overrides:
- `PI_THEME_EDITOR_PORT` (default 4317)
- `PI_AGENT_DIR` (default `~/.pi/agent`)

## What it does (v0)

- Lists themes in `<agent-dir>/themes`.
- Loads/saves theme JSON with basic schema validation.
- Creates a draft from the built-in `dark` theme.
- Approximate color swatch preview.
- Writes atomically; Pi hot-reloads the active theme file.

## Notes

- Pi only hot-reloads the *active* theme. Select the edited theme in Pi (`/settings`) to see live changes.
- Validation is basic (required colors + top-level keys). Full JSON Schema validation (ajv) is planned.

## License

MIT
EOF