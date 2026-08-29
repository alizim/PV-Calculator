const I18N = {
  de: {
    appTitle: "☀️ Live PV-Ertragsprognose & Historie",
    subtitle: "Echtzeitdaten via Open-Meteo API",
    settings: "⚙️ Einstellungen",
    downloadTemplate: "Template herunterladen",
    exportPlant: "Anlage exportieren",
    uploadJson: "JSON hochladen",
    toggleStrings: "String-Konfiguration anzeigen",
    toggleStringsHide: "String-Konfiguration ausblenden",
    loading: "Lade Live-Wetterdaten und berechne Erträge...",
    errorLoading: "Fehler beim Laden der Live-Daten: ",
    configLoadError: "Anlagenkonfiguration konnte nicht geladen werden: ",
    fileServerWarning: "Bitte index.html über einen Webserver öffnen, damit anlage.json geladen werden kann",
    invalidNumber: "Bitte nur gültige Zahlen in der String-Konfiguration verwenden.",
    invalidLossFactor: "Der Verlustfaktor muss zwischen 0 und 1 liegen.",
    changesLoading: "Änderungen werden geladen...",
    jsonRestored: "JSON-Werte wiederhergestellt.",
    stringConfigTitle: "String-Konfiguration",
    applyChanges: "Änderungen anwenden",
    resetConfig: "JSON-Werte wiederherstellen",
    archiveTitle: "Historisches Archiv",
    archiveExport: "Archiv exportieren",
    archiveClear: "Archiv löschen",
    archiveEmpty: "Noch keine historischen API-Daten gespeichert.",
    archiveTableDate: "Datum",
    archiveTableWeather: "Wetter",
    archiveTableForecast: "Prognose",
    archiveTableActual: "Realwert",
    archiveTableDeviation: "Abweichung",
    archiveCard: "Archivkarte:",
    archivePrev: "Vorheriger Archivtag",
    archiveNext: "Nächster Archivtag",
    archiveDetailMissing: "noch kein Realwert",
    archiveRecalculate: "Prognose neu berechnen",
    archiveRecalculateBusy: "Berechne neu...",
    realValuesTitle: "Realwerte eingeben",
    realValuesComparison: "📊 Realwerte & Vergleich:",
    dateLabel: "Datum:",
    cancel: "Abbrechen",
    save: "Speichern",
    requiredDate: "Bitte ein Datum auswählen",
    requiredValue: "Bitte mindestens einen Wert eingeben",
    apiDataError: "Fehler beim Laden der API-Daten",
    weatherCode: "Wettercode",
    horizontalRadiation: "horizontale Strahlung",
    storedTiltedHours: "gespeicherte geneigte Stundenwerte",
    confirmClearArchive: "Alle historischen Prognose-, Wetter- und Einstrahlungsdaten löschen?",
    exampleValue: "z.B. 22.85",
    weather: {
      sun: "☀️ Sonne",
      variable: "🌗 Wechselhaft",
      rain: "🌧️ Regen",
      cloud: "☁️ Bewölkt"
    },
    labels: {
      today: "Heute",
      tomorrow: "Morgen",
      yesterday: "Gestern",
      dayBeforeYesterday: "Vorgestern",
      dayAfterTomorrow: "Übermorgen",
      archive: "Archiv",
      string: "String",
      forecastTotal: "Prognose Gesamt:",
      realTotal: "Realwert Gesamt:",
      edit: "Realwerte eingeben",
      solarNoon: "☀️ Sonnenhöchststand:",
      weatherInfo: "🌡️ Max:",
      radiation: "🌤️ Strahlung:",
      perModule: "Module",
      azimuth: "Azimut",
      tilt: "Neigung",
      loss: "Verlustfaktor",
      noOrientation: "Ausrichtung nicht angegeben",
      moduleGroup: "Modulgruppe",
      configurationStatus: "Änderungen werden geladen...",
      notSet: "nicht gesetzt"
    },
    locale: {
      switchToEnglish: "EN",
      switchToGerman: "DE"
    }
  },
  en: {
    appTitle: "☀️ Live PV Yield Forecast & History",
    subtitle: "Live data via Open-Meteo API",
    settings: "⚙️ Settings",
    downloadTemplate: "Download template",
    exportPlant: "Export plant",
    uploadJson: "Upload JSON",
    toggleStrings: "Show string configuration",
    toggleStringsHide: "Hide string configuration",
    loading: "Loading live weather data and calculating yields...",
    errorLoading: "Error loading live data: ",
    configLoadError: "Could not load plant configuration: ",
    fileServerWarning: "Please open index.html through a web server so anlage.json can be loaded",
    invalidNumber: "Please use only valid numbers in the string configuration.",
    invalidLossFactor: "The loss factor must be between 0 and 1.",
    changesLoading: "Applying changes...",
    jsonRestored: "JSON values restored.",
    stringConfigTitle: "String configuration",
    applyChanges: "Apply changes",
    resetConfig: "Restore JSON values",
    archiveTitle: "Historical archive",
    archiveExport: "Export archive",
    archiveClear: "Clear archive",
    archiveEmpty: "No historical API data saved yet.",
    archiveTableDate: "Date",
    archiveTableWeather: "Weather",
    archiveTableForecast: "Forecast",
    archiveTableActual: "Actual",
    archiveTableDeviation: "Deviation",
    archiveCard: "Archive card:",
    archivePrev: "Previous archive day",
    archiveNext: "Next archive day",
    archiveDetailMissing: "no real value yet",
    archiveRecalculate: "Recalculate forecast",
    archiveRecalculateBusy: "Recalculating...",
    realValuesTitle: "Enter actual values",
    realValuesComparison: "📊 Actual values & comparison:",
    dateLabel: "Date:",
    cancel: "Cancel",
    save: "Save",
    requiredDate: "Please select a date",
    requiredValue: "Please enter at least one value",
    apiDataError: "Error loading API data",
    weatherCode: "Weather code",
    horizontalRadiation: "horizontal radiation",
    storedTiltedHours: "stored tilted hourly values",
    confirmClearArchive: "Delete all historical forecast, weather, and irradiance data?",
    exampleValue: "e.g. 22.85",
    weather: {
      sun: "☀️ Sunny",
      variable: "🌗 Variable",
      rain: "🌧️ Rain",
      cloud: "☁️ Cloudy"
    },
    labels: {
      today: "Today",
      tomorrow: "Tomorrow",
      yesterday: "Yesterday",
      dayBeforeYesterday: "Day before yesterday",
      dayAfterTomorrow: "Day after tomorrow",
      archive: "Archive",
      string: "String",
      forecastTotal: "Forecast total:",
      realTotal: "Actual total:",
      edit: "Enter actual values",
      solarNoon: "☀️ Solar noon:",
      weatherInfo: "🌡️ Max:",
      radiation: "🌤️ Radiation:",
      perModule: "modules",
      azimuth: "Azimuth",
      tilt: "Tilt",
      loss: "Loss factor",
      noOrientation: "Orientation not specified",
      moduleGroup: "Module group",
      configurationStatus: "Applying changes...",
      notSet: "not set"
    },
    locale: {
      switchToEnglish: "EN",
      switchToGerman: "DE"
    }
  }
};

let currentLocale = "de";

function getText(key) {
  const segments = key.split(".");
  const localeData = I18N[currentLocale] || I18N.de;
  let value = localeData;
  for (const segment of segments) {
    if (value && typeof value === "object") {
      value = value[segment];
    } else {
      value = undefined;
      break;
    }
  }
  return value ?? I18N.de[key] ?? key;
}

function setLanguage(locale) {
  if (!I18N[locale]) return;
  currentLocale = locale;
  document.documentElement.lang = locale;
  applyUiTranslations();
}

function toggleLanguage() {
  setLanguage(currentLocale === "de" ? "en" : "de");
  if (typeof anlagenKonfiguration !== "undefined" && anlagenKonfiguration) {
    renderStringDefinitions(anlagenKonfiguration);
    renderArchive();
    if (document.getElementById("dashboard-grid")) {
      fetchAndCalculate();
    }
  }
}

function applyUiTranslations() {
  const title = document.getElementById("app-title");
  if (title) title.textContent = getText("appTitle");

  const subtitle = document.getElementById("anlage-subtitle");
  if (subtitle) subtitle.textContent = getText("subtitle");

  const toggleButton = document.getElementById("toggle-string-definitions");
  if (toggleButton) {
    const isVisible = toggleButton.dataset.visible === "true";
    toggleButton.textContent = isVisible ? getText("toggleStringsHide") : getText("toggleStrings");
  }

  const loadingText = document.getElementById("loading-text");
  if (loadingText) loadingText.textContent = getText("loading");

  const archiveTitle = document.getElementById("archive-title");
  if (archiveTitle) archiveTitle.textContent = getText("archiveTitle");

  const archiveEmpty = document.getElementById("archive-empty");
  if (archiveEmpty) archiveEmpty.textContent = getText("archiveEmpty");

  const exportButton = document.querySelector(".btn-archive-export");
  if (exportButton) exportButton.textContent = getText("archiveExport");

  const clearButton = document.querySelector(".btn-archive-clear");
  if (clearButton) clearButton.textContent = getText("archiveClear");

  const archiveBrowserLabel = document.getElementById("archive-browser-label");
  if (archiveBrowserLabel) archiveBrowserLabel.textContent = getText("archiveCard");

  const archivePrev = document.getElementById("archive-prev-button");
  if (archivePrev) archivePrev.setAttribute("aria-label", getText("archivePrev"));

  const archiveNext = document.getElementById("archive-next-button");
  if (archiveNext) archiveNext.setAttribute("aria-label", getText("archiveNext"));

  const archiveRecalculate = document.querySelector(".btn-recalculate");
  if (archiveRecalculate) archiveRecalculate.textContent = getText("archiveRecalculate");

  const modalTitle = document.getElementById("actual-values-title");
  if (modalTitle) modalTitle.textContent = getText("realValuesTitle");

  const dateLabel = document.getElementById("actual-date-label");
  if (dateLabel) dateLabel.textContent = getText("dateLabel");

  const cancelBtn = document.querySelector(".btn-cancel");
  if (cancelBtn) cancelBtn.textContent = getText("cancel");

  const saveBtn = document.querySelector(".btn-save");
  if (saveBtn) saveBtn.textContent = getText("save");

  const languageSwitch = document.getElementById("language-switch");
  if (languageSwitch) {
    languageSwitch.textContent = currentLocale === "de" ? "🌐 EN" : "🌐 DE";
    languageSwitch.setAttribute("aria-label", currentLocale === "de" ? "Switch to English" : "Wechsel zu Deutsch");
  }

  const settingsButton = document.getElementById("settings-button");
  if (settingsButton) {
    settingsButton.textContent = getText("settings");
    settingsButton.setAttribute("aria-label", getText("settings"));
  }

  const downloadTemplateButton = document.getElementById("download-template-btn");
  if (downloadTemplateButton) downloadTemplateButton.textContent = getText("downloadTemplate");

  const exportPlantButton = document.getElementById("export-plant-btn");
  if (exportPlantButton) exportPlantButton.textContent = getText("exportPlant");

  const uploadJsonButton = document.getElementById("upload-json-btn");
  if (uploadJsonButton) {
    const uploadLabel = uploadJsonButton.querySelector("span");
    if (uploadLabel) uploadLabel.textContent = getText("uploadJson");
  }

  const tableHeaders = document.querySelectorAll("#archive-table th");
  const tableKeys = ["archiveTableDate", "archiveTableWeather", "archiveTableForecast", "archiveTableActual", "archiveTableDeviation"];
  tableHeaders.forEach((header, index) => {
    if (tableKeys[index]) header.textContent = getText(tableKeys[index]);
  });
}

applyUiTranslations();
