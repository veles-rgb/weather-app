// display.js
import { parse, parseISO, format } from 'https://cdn.skypack.dev/date-fns';
import { fetchWeather } from "./getWeather.js";
const searchForm = document.querySelector("form");
const citySearch = document.querySelector("input[type='search']");
const unitSelect = document.querySelector("select");
let cityInput = null;
let tempUnit = null;
let speedUnit = null;
let distanceUnit = null;


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
        distanceUnit = "km";
    } else if (unitSelect.value === "us") {
        tempUnit = "°F";
        speedUnit = "mp/h";
        distanceUnit = "miles";
    } else if (unitSelect.value === "uk") {
        tempUnit = "°C";
        speedUnit = "mp/h";
        distanceUnit = "miles";
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
    riseSetIcon.classList.add("other-info-icon");
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
    const windInfoText = document.createElement("div");
    windInfoText.setAttribute("id", "wind-info-text");
    windInfoText.textContent = "Wind";
    const windInfoSpeed = document.createElement("div");
    windInfoSpeed.setAttribute("id", "wind-info-speed");
    windInfoSpeed.textContent = `Speed: ${weather.currentConditions.windspeed} ${speedUnit}`;
    const windSpeedIcon = document.createElement("img");
    windSpeedIcon.classList.add("other-info-icon");
    windSpeedIcon.src = "/assets/icons/windspeed.svg";
    const windGust = document.createElement("div");
    windGust.setAttribute("id", "wind-gust-info");
    windGust.textContent = `Gust: ${weather.currentConditions.windgust} ${speedUnit}`;

    // Humidity info
    const humidityInfo = document.createElement("div");
    humidityInfo.classList.add("other-info-div");
    humidityInfo.setAttribute("id", "humidity-info");
    const humidityInfoText = document.createElement("div");
    humidityInfoText.setAttribute("id", "humidity-info-text");
    humidityInfoText.textContent = "Humidity";
    const humidityIcon = document.createElement("img");
    humidityIcon.classList.add("other-info-icon");
    humidityIcon.src = "/assets/icons/humidity.svg";
    const humidity = document.createElement("div");
    humidity.setAttribute("id", "humidity");
    humidity.textContent = weather.currentConditions.humidity + "%";
    const humidityLevel = document.createElement("div");
    let humidityCategory = null;
    if (weather.currentConditions.humidity < 30) {
        humidityCategory = "Low";
    } else if (weather.currentConditions.humidity >= 30 && weather.currentConditions.humidity < 60) {
        humidityCategory = "Medium";
    } else {
        humidityCategory = "High";
    }
    humidityLevel.textContent = humidityCategory;

    // Visibility info
    const visibilityInfo = document.createElement("div");
    visibilityInfo.classList.add("other-info-div");
    visibilityInfo.setAttribute("id", "visibility-info");
    const visibilityInfoText = document.createElement("div");
    visibilityInfoText.setAttribute("id", "visibility-info-text");
    visibilityInfoText.textContent = "Visibility";
    const visibilityIcon = document.createElement("img");
    visibilityIcon.classList.add("other-info-icon");
    visibilityIcon.src = "/assets/icons/visibility.svg";
    const visibilityDistance = document.createElement("div");
    visibilityDistance.setAttribute("id", "visibility");
    visibilityDistance.textContent = `${weather.currentConditions.visibility} ${distanceUnit}`;
    const visibilityLevel = document.createElement("div");
    const visibility = weather.currentConditions.visibility;
    let visibilityCategory = null;
    if (unitSelect.value === "metric") {
        // Visibility is in kilometers
        if (visibility > 10) {
            visibilityCategory = "High";
        } else if (visibility >= 4 && visibility <= 10) {
            visibilityCategory = "Medium";
        } else if (visibility >= 1 && visibility < 4) {
            visibilityCategory = "Low";
        } else if (visibility < 1) {
            visibilityCategory = "Very Low";
        }
    } else if (unitSelect.value === "us" || unitSelect.value === "uk") {
        // Visibility is in miles
        if (visibility > 6.2) {
            visibilityCategory = "High";
        } else if (visibility >= 2.5 && visibility <= 6.2) {
            visibilityCategory = "Medium";
        } else if (visibility >= 0.6 && visibility < 2.5) {
            visibilityCategory = "Low";
        } else if (visibility < 0.6) {
            visibilityCategory = "Very Low";
        }
    }
    visibilityLevel.textContent = visibilityCategory;

    // UV Index info
    const uvIndexInfo = document.createElement("div");
    uvIndexInfo.classList.add("other-info-div");
    uvIndexInfo.setAttribute("id", "uvIndex-info");
    const uvIndexInfoText = document.createElement("div");
    uvIndexInfoText.setAttribute("id", "uvindex-info-text");
    uvIndexInfoText.textContent = "UV Index";
    const uvIndexIcon = document.createElement("img");
    uvIndexIcon.classList.add("other-info-icon");
    uvIndexIcon.src = "/assets/icons/uvindex.svg";
    const uvIndexIndex = document.createElement("div");
    uvIndexIndex.setAttribute("id", "uv-index");
    uvIndexIndex.textContent = weather.currentConditions.uvindex;
    const uvIndexLevel = document.createElement("div");
    const uvIndex = weather.currentConditions.uvindex;
    let uvIndexCategory = null;
    if (uvIndex <= 2) {
        uvIndexCategory = "Low";
    } else if (uvIndex <= 5) {
        uvIndexCategory = "Moderate";
    } else if (uvIndex <= 7) {
        uvIndexCategory = "High";
    } else if (uvIndex <= 10) {
        uvIndexCategory = "Very High";
    } else {
        uvIndexCategory = "Extreme";
    }
    uvIndexLevel.textContent = uvIndexCategory;

    // Append elements
    document.body.appendChild(weatherContainer);
    // Top grid
    weatherContainer.appendChild(topGrid);
    topGrid.append(locationInfo, currentTempInfo, currentConditionInfo);
    currentTempInfo.append(tempDisplay, feelsLikeDisplay, highLowDisplay);
    currentConditionInfo.append(conditionIcon, conditionDesc);
    // Date & time
    weatherContainer.appendChild(currentDateTimeDiv);
    currentDateTimeDiv.append(currentDate, lastUpdate);
    // Other info
    weatherContainer.appendChild(otherInfoGrid);
    otherInfoGrid.append(riseSet, windInfo, humidityInfo, visibilityInfo, uvIndexInfo);
    // Sunrise & Sunset
    riseSet.append(riseSetDate, riseSetIcon, riseSetInner);
    riseSetInner.append(riseInner, setInner);
    riseInner.append(riseInnerText, riseInnerTime);
    setInner.append(setInnerText, setInnerTime);
    // Wind info
    windInfo.append(windInfoText, windSpeedIcon, windInfoSpeed, windGust);
    // Humidity info
    humidityInfo.append(humidityInfoText, humidityIcon, humidity, humidityLevel);
    // Visibility info
    visibilityInfo.append(visibilityInfoText, visibilityIcon, visibilityDistance, visibilityLevel);
    // UV Index
    uvIndexInfo.append(uvIndexInfoText, uvIndexIcon, uvIndexIndex, uvIndexLevel);
}