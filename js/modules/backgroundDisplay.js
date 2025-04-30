// backgroundDisplay.js
// This module handles the background display based on weather conditions

import { isBefore, isAfter } from "https://cdn.skypack.dev/date-fns";
import SunCalc from "https://cdn.skypack.dev/suncalc";


// Check IP time (for night / day) and change background
async function getLocalTime() {
    const styles = getComputedStyle(document.documentElement);
    const bgDay = styles.getPropertyValue('--bg-day').trim();
    const bgDark = styles.getPropertyValue('--bg-dark').trim();
    const bgNight = styles.getPropertyValue('--bg-night').trim();

    try {
        const res = await fetch('https://ip-api.com/json/');
        const data = await res.json();
        const { lat: latitude, lon: longitude } = data;
        const now = new Date();
        const times = SunCalc.getTimes(now, latitude, longitude);
        const isDark = isBefore(now, times.sunrise) || isAfter(now, times.sunset);
        if (isDark) {
            document.body.style.background = bgNight;
            console.log("Let there be darkness!");
        } else {
            document.body.style.background = bgDay;
            console.log("Let there be light!");
        }
    } catch (error) {
        console.error(err);
    }
}

// Check if night time (for searched city)
function isNightTime(weather) {
    // Convert time strings "HH:mm" or "HH:mm:ss" to minutes since midnight
    const toMinutes = (timeStr) => {
        const [hours, minutes] = timeStr.split(":").map(Number);
        return hours * 60 + minutes;
    };

    const current = toMinutes(weather.currentConditions.datetime);
    const sunset = toMinutes(weather.currentConditions.sunset);
    const sunrise = toMinutes(weather.currentConditions.sunrise);


    // Nighttime is from sunset (today) until sunrise (next day)
    return current >= sunset || current <= sunrise;
}

// Load background animations
function loadBackground(weather) {
    const styles = getComputedStyle(document.documentElement);
    const bgDay = styles.getPropertyValue('--bg-day').trim();
    const bgDark = styles.getPropertyValue('--bg-dark').trim();
    const bgNight = styles.getPropertyValue('--bg-night').trim();

    sky.innerHTML = "";
    if (weather.currentConditions.icon === "partly-cloudy-day") {
        for (let i = 0; i < 5; i++) {
            sun();
            setTimeout(partlyCloudy, i * 1000);
        }
        document.body.style.background = bgDay;
    } else if (weather.currentConditions.icon === "partly-cloudy-night") {
        for (let i = 0; i < 5; i++) {
            moon();
            setTimeout(partlyCloudy, i * 1000);
        }
        document.body.style.background = bgNight;
    } else if (weather.currentConditions.icon === "clear-day") {
        sun();
        document.body.style.background = bgDay;
    } else if (weather.currentConditions.icon === "clear-night") {
        moon();
        document.body.style.background = bgNight;
    } else if (weather.currentConditions.icon === "cloudy") {
        if (isNightTime(weather)) {
            cloudy();
            document.body.style.background = bgNight;
        } else {
            cloudy();
            document.body.style.background = bgDark;
        }
    } else if (weather.currentConditions.icon === "thunder") {
        if (isNightTime(weather)) {
            thunder();
            document.body.style.background = bgNight;
        } else {
            thunder();
            document.body.style.background = bgDark;
        }
    } else if (weather.currentConditions.icon === "rain") {
        if (isNightTime(weather)) {
            cloudy();
            rain(15);
            document.body.style.background = bgNight;
        } else {
            cloudy();
            rain(15);
            document.body.style.background = bgDark;
        }
    } else if (weather.currentConditions.icon === "snow") {
        if (isNightTime(weather)) {
            cloudy();
            snow(5);
            document.body.style.background = bgNight;
        } else {
            cloudy();
            snow(5);
            document.body.style.background = bgDark;
        }
    } else if (weather.currentConditions.icon === "hail") {
        if (isNightTime(weather)) {
            cloudy();
            hail(5);
            document.body.style.background = bgNight;
        } else {
            cloudy();
            hail(5);
            document.body.style.background = bgDark;
        }
    } else if (weather.currentConditions.icon === "fog") {
        if (isNightTime(weather)) {
            fog(4);
            document.body.style.background = bgNight;
        } else {
            fog(4);
            document.body.style.background = bgDark;
        }
    } else if (weather.currentConditions.icon === "wind") {
        if (isNightTime(weather)) {
            wind(1);
            document.body.style.background = bgNight;
        } else {
            wind(1);
            document.body.style.background = bgDay;
        }
    } else if (weather.currentConditions.icon === "showers-day") {
        sun();
        partlyCloudy();
        rain(5);
        document.body.style.background = bgDay;
    } else if (weather.currentConditions.icon === "showers-night") {
        moon();
        partlyCloudy();
        rain(5);
        document.body.style.background = bgNight;
    } else if (weather.currentConditions.icon === "thunder-rain") {
        if (isNightTime(weather)) {
            cloudy();
            thunder();
            rain(10);
            document.body.style.background = bgNight;
        } else {
            cloudy();
            thunder();
            rain(10);
            document.body.style.background = bgDark;
        }
    } else if (weather.currentConditions.icon === "thunder-showers-day") {
        sun();
        cloudy();
        thunder();
        rain(8);
        document.body.style.background = bgDay;
    } else if (weather.currentConditions.icon === "thunder-showers-night") {
        moon();
        cloudy();
        thunder();
        rain(8);
        document.body.style.background = bgNight;
    } else if (weather.currentConditions.icon === "snow-showers-day") {
        sun();
        partlyCloudy();
        snow(5);
        document.body.style.background = bgDay;
    } else if (weather.currentConditions.icon === "snow-showers-night") {
        moon();
        partlyCloudy();
        snow(5);
        document.body.style.background = bgNight;
    } else if (weather.currentConditions.icon === "rain-snow") {
        if (isNightTime(weather)) {
            cloudy();
            rain(5);
            snow(3);
            document.body.style.background = bgNight;
        } else {
            cloudy();
            rain(5);
            snow(3);
            document.body.style.background = bgDark;
        }
    } else if (weather.currentConditions.icon === "rain-snow-showers-day") {
        sun();
        cloudy();
        rain(5);
        snow(3);
        document.body.style.background = bgDay;
    } else if (weather.currentConditions.icon === "rain-snow-showers-night") {
        moon();
        cloudy();
        rain(5);
        snow(3);
        document.body.style.background = bgNight;
    } else if (weather.currentConditions.icon === "sleet") {
        if (isNightTime(weather)) {
            cloudy();
            rain(5);
            hail(3);
            document.body.style.background = bgNight;
        } else {
            cloudy();
            rain(5);
            hail(3);
            document.body.style.background = bgDark;
        }
    }
}

export { loadBackground, isNightTime, getLocalTime };
import { sun, moon, cloudy, rain, snow, hail, fog, wind, thunder, partlyCloudy } from "./background.js";