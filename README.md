# PV-Calculator

Statisches Dashboard zur täglichen PV-Ertragsprognose und zum Vergleich mit
tatsächlich gemessenen String-Erträgen. Die Anwendung ist auf die konfigurierte
Photovoltaikanlage in Norderstedt zugeschnitten.

## Funktionen

- Anzeige von zwei vergangenen, dem aktuellen und zwei kommenden Tagen
- Wetterdaten, Temperatur und horizontale Globalstrahlung
- Sonnenhöchststand je Tag auf Basis von Breitengrad und Jahresdatum
- Ertragsberechnung je String und als Gesamtsumme
- Berücksichtigung von Modulanzahl, Neigung, Ausrichtung und String-Verlustfaktor
- Eingabe von Realwerten je String mit prozentualem Vergleich zur Prognose
- Speicherung der Realwerte lokal im Browser
- Automatische Nutzung einer lokalen oder der öffentlichen GitHub-Konfiguration

## Starten

Die Anwendung benötigt einen Webserver, weil der Browser `anlage.json` nicht
beim direkten Öffnen über `file://` laden darf.

```bash
python3 -m http.server 8000
```

Danach im Browser öffnen:

```text
http://localhost:8000
```

Alternativ kann jeder andere einfache statische Webserver verwendet werden.
Es gibt kein Build-System und keine Paketinstallation.

## Verwendung

1. Dashboard über einen Webserver öffnen.
2. Die fünf Tageskarten prüfen. Der aktuelle Tag ist hervorgehoben.
3. Für einen Tag `Realwerte eingeben` auswählen.
4. Gemessene Erträge in kWh für einen oder mehrere Strings eintragen und speichern.
5. Die Abweichung zur Prognose wird anschließend direkt auf der Tageskarte angezeigt.

Die gespeicherten Realwerte liegen ausschließlich im `localStorage` des jeweils
verwendeten Browsers. Ein Löschen der Browserdaten entfernt diese Werte.

## Konfiguration

Die Anlagendaten stehen in [anlage.json](anlage.json). Wichtige Felder sind:

- `standort`: Anzeige des Anlagenstandorts
- `koordinaten.latitude`: Breitengrad des Anlagenstandorts
- `koordinaten.longitude`: Längengrad des Anlagenstandorts
- `verlustfaktor_standard`: Standardfaktor für System- und Stringverluste,
  falls ein String keinen eigenen Faktor besitzt
- `system_steckbrief.installierte_leistung_kwp`: installierte Gesamtleistung
- `system_steckbrief.module.leistung_pro_modul_w`: Modulleistung in Watt
- `string_aufteilung`: Liste der Strings
- `string_aufteilung[].string_id`: eindeutige ID des Strings
- `string_aufteilung[].name`: optionaler Anzeigename; ohne Angabe wird
	`String <string_id>` verwendet
- `string_aufteilung[].verlustfaktor`: Faktor für System- und Stringverluste
- `modul_gruppen_nach_neigung`: Modulgruppen mit Anzahl, Neigung und Azimut
- `modul_gruppen_nach_neigung[].azimut_grad`: Azimut der Modulgruppe in Grad
- `modul_gruppen_nach_neigung[].ausrichtung`: optionaler Anzeigename der Ausrichtung
- `modul_gruppen_nach_neigung[].verlustfaktor`: optionaler, gruppenspezifischer
	Faktor; dieser überschreibt den String-Faktor, z. B. für verschattete
	Fassadenmodule

Die konkreten Azimutwerte werden in `anlage.json` konfiguriert. `index.html`
verwendet diese Werte dynamisch für die API-Abfragen; der Ausrichtungstext
dient nur der Anzeige.

Die Oberfläche erzeugt Eingabefelder und Prognosezeilen automatisch aus
`string_aufteilung`. Daher können beliebig viele Strings konfiguriert werden.
Jeder String benötigt eine eindeutige `string_id`. Bei Änderungen an der
JSON-Datei sollte die Summe der Modulgruppen pro String mit
`gesamt_module_anzahl` übereinstimmen.

## Berechnung

Für jede Modulgruppe wird die geneigte Einstrahlung über die Open-Meteo-API
abgerufen. Der prognostizierte Tagesertrag wird näherungsweise berechnet als:

```text
Ertrag [kWh] = Einstrahlung [kWh/m²]
			 × Modulanzahl × Modulleistung [kWp]
			 × Verlustfaktor
```

Die Anzeige des Sonnenhöchststands verwendet die jahresabhängige solare
Deklination und den Anlagen-Breitengrad. Die Open-Meteo-Variable
`global_tilted_irradiance` berücksichtigt diesen Sonnenstand bereits für jede
Stunde sowie die konfigurierte Modulneigung und den Azimut. Deshalb wird der
Sonnenhöchststand nicht zusätzlich als Ertragsmultiplikator verwendet, da dies
die Einstrahlung doppelt gewichten würde.

Die Anwendung ruft für den Zeitraum von vorgestern bis übermorgen sowohl
Wetter- als auch geneigte Einstrahlungsdaten ab. Die Werte sind Prognosen bzw.
API-Daten und ersetzen keine geeichte Messung.

## Datenquellen und Voraussetzungen

- Browser mit aktiviertem JavaScript
- Netzwerkzugriff auf `api.open-meteo.com`
- Zugriff auf `anlage.json` über den gestarteten Webserver
- Standortkoordinaten und API-Abfragen werden aus `anlage.json` verwendet

Open-Meteo liefert die Wetter- und Einstrahlungsdaten. Bei fehlendem Netzwerk- oder
API-Zugriff zeigt das Dashboard eine Fehlermeldung an.

## Projektstruktur

```text
.
├── index.html   # Oberfläche und API-Anbindung
├── calc.js      # PV-Berechnung und Sonnenstandslogik
├── anlage.json  # Anlagen- und String-Konfiguration
└── README.md    # Projektdokumentation
```
