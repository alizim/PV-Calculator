function getAzimut(gruppe) {
    const azimut = Number(gruppe.azimut_grad);
    if (!Number.isFinite(azimut)) {
        throw new Error(`Ungültiger Azimutwert: ${gruppe.azimut_grad}`);
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
    const dayOfYear = getDayOfYear(date);
    const declination = 23.44 * Math.sin((2 * Math.PI * (dayOfYear - 81)) / 365);
    return 90 - Math.abs(latitude - declination);
}

function getSolarIncidenceAngle(date, gruppe, latitude) {
    const solarElevation = getSolarNoonElevation(date, latitude);
    const solarZenith = (90 - solarElevation) * Math.PI / 180;
    const moduleTilt = Number(gruppe.neigung_grad) * Math.PI / 180;
    const moduleAzimuth = getAzimut(gruppe) * Math.PI / 180;
    const cosine = Math.cos(solarZenith) * Math.cos(moduleTilt) +
        Math.sin(solarZenith) * Math.sin(moduleTilt) * Math.cos(moduleAzimuth);

    return Math.acos(Math.max(-1, Math.min(1, cosine))) * 180 / Math.PI;
}

function calculateStringYields(date, config, irradianceProfiles) {
    const dateObject = new Date(date);
    const modulLeistung_kWp = config.system_steckbrief.module.leistung_pro_modul_w / 1000;

    return config.string_aufteilung.map(string => {
        const stringVerlustfaktor = string.verlustfaktor !== undefined ?
            string.verlustfaktor : config.verlustfaktor_standard;

        const gruppen = string.modul_gruppen_nach_neigung.map(gruppe => {
            const leistung_kWp = gruppe.anzahl_module * modulLeistung_kWp;
            const azimut = getAzimut(gruppe);
            const irradiance = getDailyIrradiance(
                irradianceProfiles.get(`${gruppe.neigung_grad}:${azimut}`),
                date
            );

            return {
                ...gruppe,
                winkel: getSolarIncidenceAngle(dateObject, gruppe, config.koordinaten.latitude),
                ertrag: irradiance * leistung_kWp *
                    (gruppe.verlustfaktor !== undefined ? gruppe.verlustfaktor : stringVerlustfaktor)
            };
        });

        return {
            id: string.string_id,
            name: string.name || `String ${string.string_id}`,
            ausrichtung: string.haupt_ausrichtung,
            module: string.gesamt_module_anzahl,
            neigungen: gruppen.map(gruppe =>
                `${gruppe.anzahl_module}x ${gruppe.neigung_grad}° / ${gruppe.winkel.toFixed(1)}° Einfall`
            ).join(" + "),
            ertrag: gruppen.reduce((summe, gruppe) => summe + gruppe.ertrag, 0),
            gruppen
        };
    });
}
