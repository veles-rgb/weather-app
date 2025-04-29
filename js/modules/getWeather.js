// weather.js
import { loading, displayError } from "./display.js";

export async function fetchWeather(location, units) {
    const apiKey = "8GJRCDX98S75EPJ9H3LVZCY5F";
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${units}&key=${apiKey}&contentType=json`;
    loading();
    try {
        const response = await fetch(url);
        // Check if the response status indicates an invalid city (e.g., 400 or another specific code)
        if (response.status === 400) {
            throw new Error('Invalid city entered');
        }
        // Check for other types of API issues, like server errors (e.g., 500)
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error caught:", error);
        // Store the error message in sessionStorage
        sessionStorage.setItem('error', JSON.stringify(error.message));
        // Force page refresh on error
        window.location.reload();
    } finally {
        const loadingDiv = document.getElementById("loading");
        if (loadingDiv) {
            loadingDiv.remove();
        }
    }
}

export async function fetchHourlyWeather(location, units) {
    const apiKey = "8GJRCDX98S75EPJ9H3LVZCY5F";
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${units}&include=hours&key=${apiKey}&contentType=json`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}