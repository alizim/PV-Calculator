function getAzimut(gruppe) {
    const azimut = Number(gruppe.azimuthDegrees ?? gruppe.azimut_grad);
    if (!Number.isFinite(azimut)) {
        throw new Error(`Ungültiger Azimutwert: ${gruppe.azimuthDegrees ?? gruppe.azimut_grad}`);
    }

    return ((azimut + 180) % 360 + 360) % 360 - 180;
}

function getDailyIrradiance(hourlyData, date) {
    const day = date.slice(0, 10);
    return hourlyData.time.reduce((summe, timestamp, index) =>
        timestamp.startsWith(day) ? summe + (hourlyData.global_tilted_irradiance[index] || 0) : summe, 0
    ) / 1000;
}

function getDayOfYear(date) {
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    return Math.floor((date - startOfYear) / 86400000);
}

function getSolarNoonElevation(date, latitude) {
    const safeLatitude = Number.isFinite(Number(latitude)) ? Math.min(90, Math.max(-90, Number(latitude))) : 0;
    const dayOfYear = getDayOfYear(date);
    const declination = 23.44 * Math.sin((2 * Math.PI * (dayOfYear - 81)) / 365);
    const elevation = 90 - Math.abs(safeLatitude - declination);
    return Math.max(0, Math.min(90, elevation));
}

function getSolarIncidenceAngle(date, gruppe, latitude) {
    const solarElevation = getSolarNoonElevation(date, latitude);
    const solarZenith = (90 - solarElevation) * Math.PI / 180;
    const moduleTilt = Number(gruppe.tiltDegrees ?? gruppe.neigung_grad) * Math.PI / 180;
    const moduleAzimuth = getAzimut(gruppe) * Math.PI / 180;
    const cosine = Math.cos(solarZenith) * Math.cos(moduleTilt) +
        Math.sin(solarZenith) * Math.sin(moduleTilt) * Math.cos(moduleAzimuth);

    return Math.acos(Math.max(-1, Math.min(1, cosine))) * 180 / Math.PI;
}

function calculateStringYields(date, config, irradianceProfiles) {
    const dateObject = new Date(date);
    const modulLeistung_kWp = (config.systemProfile?.module?.powerPerModuleW ?? config.system_steckbrief?.module?.leistung_pro_modul_w ?? 0) / 1000;

    const stringList = config.stringConfiguration ?? config.string_aufteilung ?? [];

    return stringList.map(string => {
        const stringId = string.stringId ?? string.string_id;
        const stringVerlustfaktor = string.lossFactor ?? string.verlustfaktor ?? config.defaultLossFactor ?? config.verlustfaktor_standard ?? 0.85;
        const calibrationFactor = Number(config.calibrationFactors?.[stringId] ?? 1);

        const gruppen = (string.moduleGroupsByTilt ?? string.modul_gruppen_nach_neigung ?? []).map(gruppe => {
            const leistung_kWp = (gruppe.moduleCount ?? gruppe.anzahl_module ?? 0) * modulLeistung_kWp;
            const azimut = getAzimut(gruppe);
            const irradiance = getDailyIrradiance(
                irradianceProfiles.get(`${gruppe.tiltDegrees ?? gruppe.neigung_grad}:${azimut}`),
                date
            );

            return {
                ...gruppe,
                winkel: getSolarIncidenceAngle(dateObject, gruppe, config.coordinates?.latitude ?? config.koordinaten?.latitude),
                ertrag: irradiance * leistung_kWp *
                    (gruppe.lossFactor ?? gruppe.verlustfaktor ?? stringVerlustfaktor) * calibrationFactor
            };
        });

        return {
            id: stringId,
            name: string.name || `String ${string.stringId ?? string.string_id}`,
            ausrichtung: string.mainOrientation ?? string.haupt_ausrichtung,
            module: string.totalModuleCount ?? string.gesamt_module_anzahl,
            calibrationFactor,
            neigungen: gruppen.map(gruppe =>
                `${gruppe.moduleCount ?? gruppe.anzahl_module}x ${gruppe.tiltDegrees ?? gruppe.neigung_grad}° / ${gruppe.winkel.toFixed(1)}° Einfall`
            ).join(" + "),
            ertrag: gruppen.reduce((summe, gruppe) => summe + gruppe.ertrag, 0),
            gruppen
        };
    });
}
