// display.js
import { parse, parseISO, format } from 'https://cdn.skypack.dev/date-fns';
import { fetchWeather, fetchHourlyWeather } from "./getWeather.js";
import { partlyCloudy, sun, moon, cloudy, thunder, rain, snow, hail, fog, wind } from "./background.js";
const searchForm = document.querySelector("form");
const citySearch = document.querySelector("#city");
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

// Render / display all weather data to DOM
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

    // Create sky div
    const sky = document.createElement("div");
    sky.setAttribute("id", "sky");

    // Create weather container element
    const weatherContainer = document.createElement("div");
    weatherContainer.setAttribute("id", "weather-container");

    // Append elements
    document.body.appendChild(sky);
    loadBackground(weather);
    loadSearchContainer();
    renderSearch();
    renderSearchBtn();
    renderUnitSelect();
    document.body.appendChild(weatherContainer);
    // Load top grid
    loadTop(weather);
    // Load other info container
    loadOtherInfoContainer();
    // Load current weather info div
    loadCurrentWeatherDiv();
    // Load date & time
    loadDateTime(weather);
    // Load other info
    loadOtherInfo(weather);
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
        if (weather.currentConditions.datetime.substring(0, 2) >= weather.currentConditions.sunset.substring(0, 2)) {
            cloudy();
            document.body.style.background = bgNight;
        } else {
            cloudy();
            document.body.style.background = bgDark;
        }
    } else if (weather.currentConditions.icon === "thunder") {
        if (weather.currentConditions.datetime.substring(0, 2) >= weather.currentConditions.sunset.substring(0, 2)) {
            thunder();
            document.body.style.background = bgNight;
        } else {
            thunder();
            document.body.style.background = bgDark;
        }
    } else if (weather.currentConditions.icon === "rain") {
        if (weather.currentConditions.datetime.substring(0, 2) >= weather.currentConditions.sunset.substring(0, 2)) {
            cloudy();
            rain(15);
            document.body.style.background = bgNight;
        } else {
            cloudy();
            rain(15);
            document.body.style.background = bgDark;
        }
    } else if (weather.currentConditions.icon === "snow") {
        if (weather.currentConditions.datetime.substring(0, 2) >= weather.currentConditions.sunset.substring(0, 2)) {
            cloudy();
            snow(5);
            document.body.style.background = bgNight;
        } else {
            cloudy();
            snow(5);
            document.body.style.background = bgDark;
        }
    } else if (weather.currentConditions.icon === "hail") {
        if (weather.currentConditions.datetime.substring(0, 2) >= weather.currentConditions.sunset.substring(0, 2)) {
            cloudy();
            hail(5);
            document.body.style.background = bgNight;
        } else {
            cloudy();
            hail(5);
            document.body.style.background = bgDark;
        }
    } else if (weather.currentConditions.icon === "fog") {
        if (weather.currentConditions.datetime.substring(0, 2) >= weather.currentConditions.sunset.substring(0, 2)) {
            fog(4);
            document.body.style.background = bgNight;
        } else {
            fog(4);
            document.body.style.background = bgDark;
        }
    } else if (weather.currentConditions.icon === "wind") {
        if (weather.currentConditions.datetime.substring(0, 2) >= weather.currentConditions.sunset.substring(0, 2)) {
            wind(1);
            document.body.style.background = bgNight;
        } else {
            wind(1);
            document.body.style.background = bgDay;
        }
    }
}

// Create city search container
function loadSearchContainer() {
    const searchContainer = document.createElement("div");
    searchContainer.setAttribute("id", "search-container");

    document.body.appendChild(searchContainer);
}

// Create city search bar
function renderSearch() {
    const searchBar = document.createElement("input");
    searchBar.setAttribute("type", "search");
    searchBar.setAttribute("id", "search-bar");
    searchBar.name = "search-bar";
    searchBar.placeholder = cityInput;

    // Create event listener for new search bar
    searchBar.addEventListener("input", (e) => {
        cityInput = e.target.value;
    });

    // Append elements
    const searchContainer = document.getElementById("search-container");
    searchContainer.append(searchBar);
}

// Create unit selection
function renderUnitSelect() {
    const select = document.createElement("select");
    select.name = "newUnits";
    select.setAttribute("id", "newUnits");

    const placeHolder = document.createElement("option");
    placeHolder.setAttribute("id", "placeholder-option");
    placeHolder.disabled = true;
    placeHolder.selected = true;
    placeHolder.hidden = true;
    placeHolder.text = `${tempUnit}, ${distanceUnit}`;

    const metric = document.createElement("option");
    metric.value = "metric";
    metric.text = "°C, km";

    const us = document.createElement("option");
    us.value = "us";
    us.text = "°F, miles";

    const uk = document.createElement("option");
    uk.value = "uk";
    uk.text = "°C, miles";

    select.addEventListener("change", (e) => {
        unitSelect.value = select.value;
        renderInfo();
    });

    // Append elements
    const searchContainer = document.getElementById("search-container");
    searchContainer.appendChild(select);
    select.append(placeHolder, metric, us, uk);
}

// Create search button
function renderSearchBtn() {
    const searchBtn = document.createElement("button");
    searchBtn.setAttribute("id", "search-btn");
    searchBtn.textContent = "Search";

    searchBtn.addEventListener("click", (e) => {
        renderInfo();
    });

    // Append elements
    const searchContainer = document.getElementById("search-container");
    searchContainer.append(searchBtn);
}

//  Load top grid display & information
function loadTop(weather) {
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

    // Append Elements
    const weatherContainer = document.getElementById("weather-container");
    weatherContainer.appendChild(topGrid);
    topGrid.append(locationInfo, currentTempInfo, currentConditionInfo);
    currentTempInfo.append(tempDisplay, feelsLikeDisplay, highLowDisplay);
    currentConditionInfo.append(conditionIcon, conditionDesc);
}

// Load other info container
function loadOtherInfoContainer() {
    const weatherContainer = document.getElementById("weather-container");
    const otherInfoContainer = document.createElement("div");
    otherInfoContainer.setAttribute("id", "other-info-container");
    weatherContainer.appendChild(otherInfoContainer);
}

// Load current weather info
function loadCurrentWeatherDiv() {
    const currentWeatherDiv = document.createElement("div");
    currentWeatherDiv.setAttribute("id", "current-weather-div");

    const otherInfoContainer = document.getElementById("other-info-container");
    otherInfoContainer.appendChild(currentWeatherDiv);
}

//  Load date & time display & information
function loadDateTime(weather) {
    // Current date and update time div
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

    // Append elements
    const currentWeatherDiv = document.getElementById("current-weather-div");
    currentWeatherDiv.appendChild(currentDateTimeDiv);
    currentDateTimeDiv.append(currentDate, lastUpdate);
}

// Load other weather info display & info
function loadOtherInfo(weather) {
    // Other info grid
    const otherInfoGrid = document.createElement('div');
    otherInfoGrid.setAttribute("id", "other-info-grid");

    // Append elements
    const currentWeatherDiv = document.getElementById("current-weather-div");
    currentWeatherDiv.appendChild(otherInfoGrid);

    // Sunrise & Sunset
    loadRiseSetInfo(weather);
    // Wind info
    loadWindInfo(weather);
    // Humidity info
    loadHumidityInfo(weather);
    // Visibility info
    loadVisibilityInfo(weather);
    // UV Index
    loadUvIndexInfo(weather);
    // 8 hour forecast container
    load8HFContainer();
    // 8 hour forecast title
    load8HourForecastTitle();
    // 8 hour forecast grid
    load8HFGrid();
    // 8 hour forecast divs
    load8HForecast(weather);
    // Daily forecast container
    loadDailyContainer();
    // Daily forecast title
    loadDailyTitle();
    // Daily forecast 
    loadDailyForecast(weather);
}

// Load and display sunset / sunrise info to otherInfo
function loadRiseSetInfo(weather) {
    // Sunrise / Sunset info
    const riseSet = document.createElement("div");
    riseSet.classList.add("other-info-div");
    riseSet.setAttribute("id", "rise-set-div");
    // sunrise / sunset date
    const riseSetDate = document.createElement("div");
    riseSetDate.setAttribute("id", "rise-set-date");
    const parsedDate = parseISO(weather.days[0].datetime);
    const prettyDate = format(parsedDate, "MMMM do, yyyy");
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

    // Append elements
    const otherInfoGrid = document.getElementById("other-info-grid");
    otherInfoGrid.appendChild(riseSet);
    riseSet.append(riseSetDate, riseSetIcon, riseSetInner);
    riseSetInner.append(riseInner, setInner);
    riseInner.append(riseInnerText, riseInnerTime);
    setInner.append(setInnerText, setInnerTime);
}

// Load and display wind info to otherInfo
function loadWindInfo(weather) {
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

    // Append Elements
    const otherInfoGrid = document.getElementById("other-info-grid");
    otherInfoGrid.appendChild(windInfo);
    windInfo.append(windInfoText, windSpeedIcon, windInfoSpeed, windGust);
}

// Load and display humidity info to otherInfo
function loadHumidityInfo(weather) {
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

    // Append Elements
    const otherInfoGrid = document.getElementById("other-info-grid");
    otherInfoGrid.appendChild(humidityInfo);
    humidityInfo.append(humidityInfoText, humidityIcon, humidity, humidityLevel);
}

// Load and display visibility info to otherInfo
function loadVisibilityInfo(weather) {
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

    // Append elements
    const otherInfoGrid = document.getElementById("other-info-grid");
    otherInfoGrid.appendChild(visibilityInfo);
    visibilityInfo.append(visibilityInfoText, visibilityIcon, visibilityDistance, visibilityLevel);
}

// Load and display uv index info to otherInfo
function loadUvIndexInfo(weather) {
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
    const otherInfoGrid = document.getElementById("other-info-grid");
    otherInfoGrid.appendChild(uvIndexInfo);
    uvIndexInfo.append(uvIndexInfoText, uvIndexIcon, uvIndexIndex, uvIndexLevel);
}

// Create & load container for 8 hour forecast display
function load8HFContainer() {
    const eightHFContainer = document.createElement('div');
    eightHFContainer.setAttribute("id", "eight-h-f-container");

    const otherInfoContainer = document.getElementById("other-info-container");
    otherInfoContainer.appendChild(eightHFContainer);
}

// Display 8 hour forecast TITLE
function load8HourForecastTitle() {
    const eightHourForecastTitle = document.createElement("div");
    eightHourForecastTitle.setAttribute("id", "eight-h-forecast-title");
    eightHourForecastTitle.textContent = "Hourly Forecast";
    const eightHFTitleDesc = document.createElement("div");
    eightHFTitleDesc.setAttribute("id", "eight-h-f-title-desc");
    eightHFTitleDesc.textContent = "The next 8 hours";

    // Append elements
    const eightHFContainer = document.getElementById("eight-h-f-container");
    eightHFContainer.appendChild(eightHourForecastTitle);
    eightHourForecastTitle.appendChild(eightHFTitleDesc);
}

// Display 8 hour forecast grid
function load8HFGrid() {
    const eightHFGrid = document.createElement("div");
    eightHFGrid.setAttribute("id", "eight-h-f-grid");

    const eightHFContainer = document.getElementById("eight-h-f-container");
    eightHFContainer.appendChild(eightHFGrid);
}

// load 8 hour forecast divs
async function load8HForecast(weather) {
    // Fetch API hourly weather data
    const hourlyWeather = await fetchHourlyWeather(cityInput, unitSelect.value);

    const eightHFGrid = document.getElementById("eight-h-f-grid");
    const currentTime = weather.currentConditions.datetime.substring(0, 2);
    const hours = hourlyWeather.days[0].hours;

    // Find the current hour in hourly weather array
    const currentIndex = hours.findIndex(hour => {
        return hour.datetime.substring(0, 2) === currentTime;
    });

    // Create a div for the next 8 hours or as many hours that are left in the day
    if (currentIndex !== -1) {
        const nextHours = hours.slice(currentIndex + 1, currentIndex + 9);
        const eightHFContainer = document.getElementById("eight-h-f-container");
        if (nextHours.length === 0) {
            eightHFContainer.remove(); // No next hours to show
        } else {
            nextHours.forEach(hour => {
                const parseTime = parse(hour.datetime, 'HH:mm:ss', new Date());
                const formattedTime = format(parseTime, 'h:mma');
                // Create hourly div
                const hourlyDiv = document.createElement("div");
                hourlyDiv.classList.add("hourly-div");
                // Display times
                const hourlyTime = document.createElement("div");
                hourlyTime.classList.add("hourly-time");
                hourlyTime.textContent = formattedTime;
                // Display icon
                const hourlyIcon = document.createElement("img");
                hourlyIcon.classList.add("hourly-icon");
                hourlyIcon.src = `/assets/icons/${hour.icon}.svg`;
                // Display temp
                const hourlyTemp = document.createElement("hourly-temp");
                hourlyTemp.classList.add("hourly-temp");
                hourlyTemp.textContent = hour.temp + tempUnit;
                // Append elements
                eightHFGrid.appendChild(hourlyDiv);
                hourlyDiv.append(hourlyTime, hourlyIcon, hourlyTemp);
            });
        }
    }
}

// Create and display daily forecast container
function loadDailyContainer() {
    const dailyContainer = document.createElement("div");
    dailyContainer.setAttribute("id", "daily-container");

    // Append elements
    const otherInfoContainer = document.getElementById("other-info-container");
    otherInfoContainer.appendChild(dailyContainer);
}

// Create and display daily forecast section title
function loadDailyTitle() {
    const dailyTitle = document.createElement("div");
    dailyTitle.setAttribute("id", "daily-title");
    dailyTitle.textContent = "Daily Forecast";
    const dailyTitleInfo = document.createElement("div");
    dailyTitleInfo.setAttribute("id", "daily-title-info");
    dailyTitleInfo.textContent = "The next 7 days";

    const dailyContainer = document.getElementById("daily-container");
    dailyContainer.appendChild(dailyTitle);
    dailyTitle.appendChild(dailyTitleInfo);
}

// Create and display daily forecast
async function loadDailyForecast(weather) {
    const dailyGrid = document.createElement("div");
    dailyGrid.setAttribute("id", "daily-grid");

    // Append element
    const dailyContainer = document.getElementById("daily-container");
    dailyContainer.appendChild(dailyGrid);

    // Get the next 7 days
    const days = await weather.days;
    const next7Days = days.slice(1, 8);
    next7Days.forEach(day => {
        // Create daily forecast div
        const dailyDiv = document.createElement("div");
        dailyDiv.classList.add("daily-div");
        // Create date display
        const parsedDate = parseISO(day.datetime);
        const prettyDate = format(parsedDate, "MMM do");
        const dailyDate = document.createElement("div");
        dailyDate.classList.add("daily-date");
        dailyDate.textContent = prettyDate;
        // Create icon display
        const dailyIcon = document.createElement("img");
        dailyIcon.classList.add("daily-icon");
        dailyIcon.src = `/assets/icons/${day.icon}.svg`;
        // Create hi lo div
        const dailyHiLo = document.createElement("div");
        dailyHiLo.classList.add("daily-hi-lo");
        // Create hi div
        const dailyHi = document.createElement("div");
        dailyHi.classList.add("daily-hi");
        dailyHi.textContent = "Hi";
        const hiTemp = document.createElement("div");
        hiTemp.classList.add("hi-temp");
        hiTemp.textContent = day.tempmax + tempUnit;
        // Create lo div
        const dailyLo = document.createElement("div");
        dailyLo.classList.add("daily-lo");
        dailyLo.textContent = "Lo";
        const loTemp = document.createElement("div");
        loTemp.classList.add("lo-temp");
        loTemp.textContent = day.tempmin + tempUnit;

        // Append elements
        dailyGrid.appendChild(dailyDiv);
        dailyDiv.append(dailyDate, dailyIcon, dailyHiLo);
        dailyHiLo.append(dailyHi, dailyLo);
        dailyHi.appendChild(hiTemp);
        dailyLo.appendChild(loTemp);
    });
};