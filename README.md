# PV-Calculator

Statisches Dashboard zur täglichen PV-Ertragsprognose und zum Vergleich mit
tatsächlich gemessenen String-Erträgen. Die Anwendung ist auf die konfigurierte
Photovoltaikanlage in Norderstedt zugeschnitten.

## Funktionen

- Anzeige von zwei vergangenen, dem aktuellen und zwei kommenden Tagen
- String-Konfiguration über einen Button oberhalb der Tageskarten einblendbar
- Laufzeit-Simulation von Azimut/Ausrichtung, Neigung und Verlustfaktor je Modulgruppe
- Wetterdaten, Temperatur und horizontale Globalstrahlung
- Sonnenhöchststand je Tag auf Basis von Breitengrad und Jahresdatum
- Ertragsberechnung je String und als Gesamtsumme
- Berücksichtigung von Modulanzahl, Neigung, Ausrichtung und String-Verlustfaktor
- Eingabe von Realwerten je String mit prozentualem Vergleich zur Prognose
- Speicherung der Realwerte lokal im Browser
- Historisches Archiv für Wetter-, Einstrahlungs-, Prognose- und Realwertdaten
- Archivansicht mit Tagesdetails und JSON-Export für spätere Modellauswertung
- Archivkarten mit Datumsnavigation und erneuter Tagesprognose
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
6. Unter `String-Konfiguration anzeigen` können Azimut, Neigung und Verlustfaktor
	geändert und mit `Änderungen anwenden` neu berechnet werden. Die geänderte
	Konfiguration bleibt im Browser gespeichert; `JSON-Werte wiederherstellen`
	setzt sie auf die Werte aus `anlage.json` zurück.
7. Im Bereich `Historisches Archiv` kann eine gespeicherte Tageszeile angeklickt
	werden, um Wetter-, Strahlungs- und Realwertdetails zu sehen. Mit `Archiv
	exportieren` werden alle Daten als JSON-Datei für eine spätere Auswertung oder
	Modellverfeinerung heruntergeladen.
8. Über `Archivkarte` können gespeicherte Tage mit den Pfeilen oder der
	Datums-Auswahl geöffnet werden. `Prognose neu berechnen` ruft Wetter- und
	Einstrahlungsdaten für genau diesen Tag erneut ab und aktualisiert den
	Archivdatensatz mit der aktuellen Anlagenkonfiguration.

Die gespeicherten Realwerte und Archivdaten liegen ausschließlich im `localStorage`
des jeweils verwendeten Browsers. Das Archiv enthält pro Tag den Wettercode, die
Maximaltemperatur, die horizontale Globalstrahlung, die berechneten String- und
Gesamtprognosen sowie die stündlichen geneigten Einstrahlungswerte je Profil.
Ein Löschen der Browserdaten entfernt diese Werte. Für eine dauerhafte Sicherung
regelmäßig `Archiv exportieren` verwenden.

## Konfiguration

Die Anlagendaten stehen in [anlage.json](anlage.json). Wichtige Felder sind:

- `standort`: Anzeige des Anlagenstandorts
- `beschreibung`: Beschreibung der Anlage für den Kopfbereich
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

Die Oberfläche übernimmt diese Werte zunächst aus der JSON und stellt sie als
Laufzeitfelder je Modulgruppe bereit. Der Azimut wird dabei als numerische
Ausrichtung in Grad verwendet, die Neigung ist auf 0 bis 90 Grad begrenzt und
der Verlustfaktor auf 0 bis 1. Beim Anwenden werden die geneigten
Einstrahlungsprofile mit den neuen Werten erneut von Open-Meteo geladen. Die
Laufzeitänderungen werden ausschließlich im `localStorage` des Browsers
gespeichert und verändern `anlage.json` nicht.

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
