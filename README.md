# PV Calculator

A lightweight PV yield dashboard for visualizing live forecast production, annual projections, archive history, and plant configuration via JSON files.

## Highlights

- 5-day live forecast overview with current-day focus
- Annual forecast based on current daily forecast plus weighted historical values
- String-level yield calculation and total yield summary
- Manual actual-value entry per string and daily comparison
- Historical archive with export, archive browser, and recalculation
- Historical archive import from a previously exported JSON file
- JSON template download, plant export, and custom upload
- German and English UI support
- Persistent language selection in browser storage
- No build step required; runs from a static web server

## Quick start

Open the project page here:

- https://alizim.github.io/PV-Calculator/

For local development, run:

```bash
cd /workspaces/PV-Calculator
python3 -m http.server 8000
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
  "description": "Residential PV system with roof and facade modules and shading model",
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
          "moduleCount": 8,
          "tiltDegrees": 30,
          "azimuthDegrees": 180,
          "orientation": "South",
          "lossFactor": 0.85,
          "shadingReference": "south_roof_morning_shadow"
        },
        {
          "moduleCount": 4,
          "tiltDegrees": 90,
          "azimuthDegrees": 180,
          "orientation": "Wall",
          "lossFactor": 0.7,
          "shadingReference": "wall_winter_shadow"
        }
      ]
    }
  ],
  "shadingRules": {
    "south_roof_morning_shadow": {
      "description": "Morning shade from the dormer or neighbor building",
      "condition": "azimuthDegrees < 120.0 && elevationDegrees < 25.0",
      "impact": "linear_reduction_based_on_elevation"
    },
    "wall_winter_shadow": {
      "description": "Low winter sun on vertical facade",
      "condition": "elevationDegrees < 15.0 && azimuthDegrees >= 150.0 && azimuthDegrees <= 210.0",
      "impact": "total_shade_loss_factor_0.10"
    }
  },
  "shadingTimeWindows": {
    "winter_solstice_december": {
      "south_roof_morning_shadow": { "start": "08:30", "end": "10:30", "loss": 0.60 },
      "wall_winter_shadow": { "start": "10:30", "end": "13:00", "loss": 0.90 }
    }
  }
}
```

## Schattenmodell

Die Ertragsberechnung berücksichtigt Verschattung stündlich auf Ebene der jeweiligen Modulgruppe. Für jeden Wetterdaten-Zeitstempel werden aus den Standortkoordinaten Sonnenhöhe (`elevationDegrees`) und Sonnenazimut (`azimuthDegrees`) berechnet. Liegt die Sonne unter dem Horizont oder erfüllt die konfigurierte Bedingung nicht, wird kein zusätzlicher Schattenverlust angewendet.

Eine Modulgruppe wird über `shadingReference` mit einem Eintrag aus `shadingRules` verknüpft. Die Regel besteht aus einer Bedingung und einer Auswirkung:

- `linear_reduction_based_on_elevation` — linearer Faktor aus der Sonnenhöhe, begrenzt auf mindestens `0.40` und höchstens `1.00`
- `partial_shade_loss_factor_0.50` — Einstrahlung wird mit `0.50` multipliziert
- `total_shade_loss_factor_0.10` — Einstrahlung wird mit `0.10` multipliziert
- `diffuse_radiation_only_factor_0.20` — Einstrahlung wird mit `0.20` multipliziert

Die Bedingung darf die Variablen `azimuthDegrees` und `elevationDegrees` sowie numerische Vergleichs-, Rechen- und Logikoperatoren verwenden, zum Beispiel:

```json
{
  "shadingRules": {
    "low_winter_sun": {
      "condition": "elevationDegrees < 18.0 && azimuthDegrees >= -40.0 && azimuthDegrees <= 20.0",
      "impact": "total_shade_loss_factor_0.10"
    }
  }
}
```

Die resultierende Einstrahlung wird anschließend mit Modulanzahl, Modulleistung, Verlustfaktor und gegebenenfalls Kalibrierungsfaktor der Modulgruppe verrechnet. `shadingTimeWindows` kann ergänzende, grobe Zeitfenster dokumentieren; die eigentliche Berechnung verwendet derzeit ausschließlich Sonnenstand und `shadingRules`.

## Usage

1. Open the app through a local web server.
2. Use the settings menu to download the dummy template or export the current configuration.
3. Edit the JSON and upload it via the settings menu. Previously exported archive files can be uploaded there as well; imported days are merged by date.
4. View live yield forecasts, compare them with strings, and enter actual values if needed.
5. Use the annual forecast tab to review a weighted estimate using historical API values.

## Notes

- The app is designed for static hosting and browser-based use.
- It must be served via `http://localhost:8000` or a similar local web server, because JSON files cannot be loaded directly from `file://`.
- The configuration is intentionally limited to PV-related settings and plant parameters.
- Browser storage persists the selected language and local archive data.