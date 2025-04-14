// display.js
import { fetchWeather } from "./getWeather.js";

const searchForm = document.querySelector("form");
const citySearch = document.querySelector("input[type='search']");
const unitSelect = document.querySelector("select");
let cityInput = null;

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (cityInput === null || cityInput === "") {
        return;
    }
    renderInfo();
});

citySearch.addEventListener("input", (e) => {
    cityInput = e.target.value;
});

async function renderInfo() {
    const weather = await fetchWeather(cityInput, unitSelect.value);
}