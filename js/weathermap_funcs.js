import { keys } from "./keys.js";
import { url } from "./weathermap_urls.js";
import * as dom from "./weathermap_dom.js";
import mapboxgl from "mapbox-gl";
import Marker from "mapbox-gl/src/ui/marker";
import * as imgs from "./image_paths.js";
import { keysDifference } from "mapbox-gl/src/util/util";

export const fetchWeather = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        generateFiveDay(data);
        await getCurrentTemp(data);
    } catch (e) {
        console.log(e.message);
    }
};

export const getCurrentTemp = async (data) => {
    const { current } = data;

};

export const setLandingTime = () => {
    const time = new Date();
    const month = time.getMonth();
    const day = time.getDay();
    const date = time.getDate();
    const hours = time.getHours();
    const hoursForClock = hours >= 13 ? hours % 12 : hours;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const ampm = hours >= 12 ? "pm" : "am";
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return { time, month, day, date, hours, hoursForClock, minutes, seconds, ampm, days, months };
};

let { day, date, days, month, months, hoursForClock, minutes, ampm } = setLandingTime();

export const setLandingDate = (unix) => {
    const dateForDisplay = new Date(unix * 1000);
    const month = dateForDisplay.getMonth();
    const day = dateForDisplay.getDay();
    const date = dateForDisplay.getDate();
    const hours = dateForDisplay.getHours();
    const hoursForClock = hours >= 13 ? hours % 12 : hours;
    const minutes = dateForDisplay.getMinutes();
    const seconds = dateForDisplay.getSeconds();
    const ampm = hours >= 12 ? "pm" : "am";
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return { dateForDisplay, month, day, date, hours, hoursForClock, minutes, seconds, ampm, days, months };
};

export const blurring = async (data) => {
    const {current, minutely} = data;
    let load = 0;
    let int = setInterval(blurring, 15);
    load++;
    if (load > 99) {
        clearInterval(int);
    }

    dom.landingLocation.innerText =
    dom.currentDate.innerText = `${days[day]} ${months[month]}, ${date}`;
    dom.currentTime.innerText = `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
    dom.currentTemp.innerText = `${Math.floor(current.temp)}ºF`;
    dom.currentPop.innerText = `${minutely.pop}%`
    dom.pageContainer.style.filter = `blur(${scale(load, 0, 100, 15, 0)}px)`;
    dom.pageContainer.style.backgroundImage = `url('./img/sunny/${randomNumSunny}.png`;
};

//<--FORECAST CARDS-->
export const setCardDate = (dt) => {
    const dateForDisplay = new Date(dt * 1000);
    const month = dateForDisplay.getMonth();
    const date = dateForDisplay.getDate();
    return `${month}/${date}`;
};

export const setCardTimes = (dt) => {
    let time = new Date(dt);
    const hours = time.getHours();
    const hoursForClock = hours >= 13 ? hours % 12 : hours;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const ampm = hours >= 12 ? "pm" : "am";
    return `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
};

export const generateFiveDay = (data) => {
    const daily = data.daily;
    daily.splice(5);
    return daily;
};

export const forecasts = generateFiveDay(data);
// const day1 = forecasts[0];
// const day2 = forecasts[1];
// const day3 = forecasts[2];
// const day4 = forecasts[3];
// const day5 = forecasts[4];

export const updateCardInfo = (day) => {
    const { dt, temp, clouds, pop, sunrise, humidity, uvi, sunset, weather } = day;
    const { max } = temp;
    const { min } = temp;
    const { description } = weather[0];
    dom.cardDate.innerText = setCardDate(dt);
    dom.highTempData.innerText = `${Math.round(max)}ºF}`;
    dom.cloudsData.innerText = `${clouds}%`;
    dom.humidityData.innerText = `${humidity}%`;
    dom.sunriseData.innerText = `${setCardTimes(sunrise)}`;
    dom.lowTempData.innerText = `${Math.round(min)}`;
    dom.uviData.innerText = `${uvi}`;
    dom.popData.innerText = `${pop}%`;
    dom.sunsetData.innerText = `${setCardTimes(sunset)}`;
    dom.cardDescriptionData.innerText = `${description}`;
};

const removeActiveClass = () => {
    dom.forecastTabs.forEach(tab => {
        tab.classList.remove("active");
    });
};

dom.forecastTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        removeActiveClass();
        dom.cardDate.innerText = tab.innerText;
        tab.classList.add("active");
    });
});

dom.cardBody.style.backgroundImage = `url('./img/rain/${randomNumRain}.png`;

//<--MAP-->

export const geocode = async (search, token) => {
    const baseUrl = "https://api.mapbox.com";
    const endPoint = "/geocoding/v5/mapbox.places/";
    return fetch(baseUrl + endPoint + encodeURIComponent(search) + ".json" + "?" + "access_token=" + token)
        .then(function (res) {
            return res.json();
            // to get all the data from the request, comment out the following three lines...
        }).then(function (data) {
            return data.features[0].center;
        });
};

export const reverseGeocode = async (coordinates, token) => {
    const baseUrl = "https://api.mapbox.com";
    const endPoint = "/geocoding/v5/mapbox.places/";
    return fetch(baseUrl + endPoint + coordinates.lng + "," + coordinates.lat + ".json" + "?" + "access_token=" + token)
        .then(function (res) {
            return res.json();
        })
        // to get all the data from the request, comment out the following three lines...
        .then(function (data) {
            return data.features[0].place_name;
        });
};

//<--MAP-->

export const markerCoords = document.querySelector("#coordinates");
mapboxgl.accessToken = keys.mapbox;
export const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/satellite-streets-v12", // style URL
    center: [-98.48962, 29.42692], // starting position [lng, lat]
    zoom: 9 // starting zoom
});

export const marker = new Marker({
    draggable: true
})
    .setLngLat(map.getCenter())
    .addTo(map);

export const onDragEnd = () => {
    const lnglat = marker.getLngLat();
    map.setCenter(lnglat);
    const weatherLat = lnglat[0];
    const weatherLong = lnglat[1];
    fetchWeather(url.weather_update);
};




