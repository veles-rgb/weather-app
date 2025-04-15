// display.js
import { parse, parseISO, format } from 'https://cdn.skypack.dev/date-fns';
import { fetchWeather } from "./getWeather.js";
const searchForm = document.querySelector("form");
const citySearch = document.querySelector("input[type='search']");
const unitSelect = document.querySelector("select");
let cityInput = null;
let tempUnit = null;
let speedUnit = null;


// Listen for form submit
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (cityInput === null || cityInput === "") {
        return;
    }
    renderInfo();
});

// Listen for input change in citySearch box
citySearch.addEventListener("input", (e) => {
    cityInput = e.target.value;
});

// Render all weather data to DOM
async function renderInfo() {
    // Get API weather data
    const weather = await fetchWeather(cityInput, unitSelect.value);

    // Set unit type
    if (unitSelect.value === "metric") {
        tempUnit = "°C";
        speedUnit = "km/h";
    } else if (unitSelect.value === "us") {
        tempUnit = "°F";
        speedUnit = "mp/h";
    } else if (unitSelect.value === "uk") {
        tempUnit = "°C";
        speedUnit = "mp/h";
    }

    // Clear body elements (form)
    document.body.innerHTML = "";

    // Create html Elements
    const weatherContainer = document.createElement("div");
    weatherContainer.setAttribute("id", "weather-container");

    // Top weather information
    const topGrid = document.createElement('div');
    topGrid.setAttribute("id", "top-grid");

    // Top left weather information
    const locationInfo = document.createElement("div");
    locationInfo.setAttribute("id", "current-location");
    locationInfo.textContent = weather.resolvedAddress;

    // Top middle weather information
    // Current temp info div
    const currentTempInfo = document.createElement("div");
    currentTempInfo.setAttribute("id", "current-temp");
    // Temp display div
    const tempDisplay = document.createElement("div");
    tempDisplay.setAttribute("id", "current-temp-display");
    tempDisplay.textContent = `${weather.currentConditions.temp}${tempUnit}`;
    // Feels like div
    const feelsLikeDisplay = document.createElement('div');
    feelsLikeDisplay.setAttribute("id", "feels-like");
    feelsLikeDisplay.textContent = `Feels: ${weather.currentConditions.feelslike}${tempUnit}`;
    // High-Low display div
    const highLowDisplay = document.createElement("div");
    highLowDisplay.setAttribute("id", "high-low-display");
    highLowDisplay.textContent = `Hi: ${weather.days[0].tempmax}° - Lo: ${weather.days[0].tempmin}°`;

    // Top right weather information
    const currentConditionInfo = document.createElement("div");
    currentConditionInfo.setAttribute("id", "current-condition");
    // Current condition icon
    const conditionIcon = document.createElement("img");
    conditionIcon.setAttribute("id", "condition-icon");
    conditionIcon.src = `/assets/icons/${weather.currentConditions.icon}.svg`;
    // Current condition descriptions
    const conditionDesc = document.createElement("div");
    conditionDesc.setAttribute("id", "condition-desc");
    conditionDesc.textContent = weather.currentConditions.conditions;

    // Current date and time div
    const currentDateTimeDiv = document.createElement("div");
    currentDateTimeDiv.setAttribute("id", "date-time-div");
    // Current date formatted with date-fns
    const currentDate = document.createElement("div");
    currentDate.setAttribute("id", "current-date");
    const parsedDate = parseISO(weather.days[0].datetime);
    const prettyDate = format(parsedDate, "MMMM do, yyyy");
    currentDate.textContent = prettyDate;
    // Last update time div
    const lastUpdate = document.createElement("div");
    lastUpdate.setAttribute("id", "last-update-time");
    const parsedTime = parse(weather.currentConditions.datetime, 'HH:mm:ss', new Date());
    const formattedTime = format(parsedTime, 'h:mma');
    lastUpdate.textContent = `Last updated @ ${formattedTime}`;

    // Other info grid
    const otherInfoGrid = document.createElement('div');
    otherInfoGrid.setAttribute("id", "other-info-grid");

    // Sunrise / Sunset info
    const riseSet = document.createElement("div");
    riseSet.classList.add("other-info-div");
    riseSet.setAttribute("id", "rise-set-div");
    // sunrise / sunset date
    const riseSetDate = document.createElement("div");
    riseSetDate.setAttribute("id", "rise-set-date");
    riseSetDate.textContent = prettyDate;
    // sunrise / sunset icon
    const riseSetIcon = document.createElement("img");
    riseSetIcon.setAttribute("id", "rise-set-icon");
    riseSetIcon.src = "/assets/icons/riseset.svg";
    // Sunrise Sunset inner info divs
    const riseSetInner = document.createElement("div");
    riseSetInner.setAttribute("id", "rise-set-inner");
    // Sunset inner div
    const riseInner = document.createElement("div");
    riseInner.setAttribute("id", "rise-inner");
    const riseInnerText = document.createElement("div");
    riseInnerText.setAttribute("id", "rise-inner-text");
    riseInnerText.textContent = "Sunrise";
    const riseInnerTime = document.createElement("div");
    riseInnerTime.setAttribute("id", "rise-inner-time");
    const riseTime = parse(weather.currentConditions.sunrise, 'HH:mm:ss', new Date());
    const formattedRiseTime = format(riseTime, 'h:mma');
    riseInnerTime.textContent = formattedRiseTime;
    // Sunset inner div
    const setInner = document.createElement("div");
    setInner.setAttribute("id", "set-inner");
    const setInnerText = document.createElement("div");
    setInnerText.setAttribute("id", "set-inner-text");
    setInnerText.textContent = "Sunset";
    const setInnerTime = document.createElement("div");
    setInnerTime.setAttribute("id", "set-inner-time");
    const setTime = parse(weather.currentConditions.sunset, 'HH:mm:ss', new Date());
    const formattedSetTime = format(setTime, 'h:mma');
    setInnerTime.textContent = formattedSetTime;

    // Wind info
    const windInfo = document.createElement("div");
    windInfo.classList.add("other-info-div");
    windInfo.setAttribute("id", "wind-info");

    // Humidity info
    const humidityInfo = document.createElement("div");
    humidityInfo.classList.add("other-info-div");
    humidityInfo.setAttribute("id", "humidity-info");

    // Visibility info
    const visibilityInfo = document.createElement("div");
    visibilityInfo.classList.add("other-info-div");
    visibilityInfo.setAttribute("id", "visibility-info");

    // UV Index
    const uvIndexInfo = document.createElement("div");
    uvIndexInfo.classList.add("other-info-div");
    uvIndexInfo.setAttribute("id", "uvIndex-info");

    // Append elements
    document.body.appendChild(weatherContainer);
    // Top grid
    weatherContainer.appendChild(topGrid);
    topGrid.append(locationInfo, currentTempInfo, currentConditionInfo);
    currentTempInfo.append(tempDisplay, feelsLikeDisplay, highLowDisplay);
    currentConditionInfo.append(conditionIcon, conditionDesc);
    weatherContainer.appendChild(currentDateTimeDiv);
    // Date & time
    currentDateTimeDiv.append(currentDate, lastUpdate);
    // Other info
    weatherContainer.appendChild(otherInfoGrid);
    // Sunrise & Sunset
    otherInfoGrid.append(riseSet);
    riseSet.append(riseSetDate, riseSetIcon, riseSetInner);
    riseSetInner.append(riseInner, setInner);
    riseInner.append(riseInnerText, riseInnerTime);
    setInner.append(setInnerText, setInnerTime);
    // Wind info
    otherInfoGrid.append(windInfo);
    // Humidity info
    otherInfoGrid.append(humidityInfo);
    // Visibility info
    otherInfoGrid.append(visibilityInfo);
    // UV Index
    otherInfoGrid.append(uvIndexInfo);
}