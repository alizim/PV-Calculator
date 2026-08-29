# PV Calculator

A lightweight PV yield dashboard for visualizing live forecast production, annual projections, archive history, and plant configuration via JSON files.

## Highlights

- 5-day live forecast overview with current-day focus
- Annual forecast based on current daily forecast plus weighted historical values
- String-level yield calculation and total yield summary
- Manual actual-value entry per string and daily comparison
- Historical archive with export, archive browser, and recalculation
- JSON template download, plant export, and custom upload
- German and English UI support
- Persistent language selection in browser storage
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

- `index.html` — dashboard UI, settings menu, archive, upload/download logic
- `calc.js` — PV calculations and solar geometry
- `i18n.js` — German/English text resources and language switching
- `plant-config.json` — current plant configuration
- `dummy-plant-config.json` — example configuration template for user upload

## Configuration model

The app uses an English-based JSON structure. The sample template contains the relevant PV configuration only and excludes unrelated infrastructure or IP metadata.

Example structure:

```json
{
  "site": "Example site",
  "description": "Residential PV system",
  "coordinates": {
    "latitude": 48.8566,
    "longitude": 2.3522
  },
  "defaultLossFactor": 0.85,
  "systemProfile": {
    "installedPowerKwp": 6.5,
    "module": {
      "count": 18,
      "model": "Premium 400 W",
      "powerPerModuleW": 400,
      "optimizer": "Yes"
    }
  },
  "stringConfiguration": [
    {
      "stringId": 1,
      "name": "South roof",
      "totalModuleCount": 12,
      "mainOrientation": "South",
      "lossFactor": 0.85,
      "moduleGroupsByTilt": [
        {
          "moduleCount": 12,
          "tiltDegrees": 30,
          "azimuthDegrees": 180,
          "orientation": "South",
          "lossFactor": 0.85
        }
      ]
    }
  ]
}
```

## Usage

1. Open the app through a local web server.
2. Use the settings menu to download the dummy template or export the current configuration.
3. Edit the JSON and upload it via the settings menu.
4. View live yield forecasts, compare them with strings, and enter actual values if needed.
5. Use the annual forecast tab to review a weighted estimate using historical API values.

## Notes

- The app is designed for static hosting and browser-based use.
- It must be served via `http://localhost:8000` or a similar local web server, because JSON files cannot be loaded directly from `file://`.
- The configuration is intentionally limited to PV-related settings and plant parameters.
- Browser storage persists the selected language and local archive data.