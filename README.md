# PV Calculator

A lightweight PV yield dashboard for visualizing forecast production, comparing it with actual string output, and managing plant configuration via JSON files.

## Highlights

- 5-day forecast overview with current-day focus
- String-level yield calculation and total yield summary
- Manual actual-value entry per string
- Historical archive with export and re-calculation
- JSON template download, config export, and custom upload
- German and English UI support
- No build step required; runs from a static web server

## Quick start

```bash
cd /workspaces/PV-Calculator
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Files

- `index.html` — dashboard UI and interaction logic
- `calc.js` — PV calculations and solar geometry
- `i18n.js` — German/English text resources
- `plant-config.json` — active plant configuration
- `dummy-plant-config.json` — example configuration template

## Configuration

The app loads the plant data from JSON. Use the provided example file as a template, adapt it for your system, and upload it through the settings menu.

## Notes

- The project is designed for static hosting.
- The app expects a local web server because JSON files cannot be loaded directly via `file://`.
- The configuration includes only PV-related data, not IP or infrastructure metadata.