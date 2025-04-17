// weather.js
export async function fetchWeather(location, units) {
    const apiKey = "8GJRCDX98S75EPJ9H3LVZCY5F";
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${units}&key=${apiKey}&contentType=json`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
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