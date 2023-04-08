import {keys} from "./keys.js";

export const url = {
    weather: `https://api.openweathermap.org/data/3.0/onecall?lat=${weatherLat}&lon=${weatherLong}&units=${imperial}&appid=${keys.openWeather}`,
    weather_update: `\`https://api.openweathermap.org/data/3.0/onecall?lat=${weatherLat}&lon=${weatherLong}&units=${imperial}&appid=${keys.openWeather}`,
    map: ``
}