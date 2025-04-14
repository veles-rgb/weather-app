// display.js
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

    // Append elements
    document.body.appendChild(weatherContainer);
    weatherContainer.appendChild(topGrid);
    topGrid.append(locationInfo, currentTempInfo, currentConditionInfo);
    currentTempInfo.append(tempDisplay, feelsLikeDisplay, highLowDisplay);
    currentConditionInfo.append(conditionIcon, conditionDesc);
}