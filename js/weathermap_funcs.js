import { keys } from "./keys.js";
import * as dom from "./weathermap_dom.js";
import * as func from "./weathermap_funcs.js";
import * as rand from "./weathermap_variables.js";

export const fetchWeather = async (longitude = -98.48527, latitude = 29.423017) => {
    try {
        const imperial = "imperial";
        const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=${imperial}&appid=${keys.openWeather}`;
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (e) {
        console.log(e.message);
    }
};

export const getCurrentTemp = async (data) => {
    const { current } = data;

};

const currentCardTime = () => {
    let time = new Date();
    return time.getHours();
};

const hour = currentCardTime();

export const renderRandomPhoto = (randomPhotoCat, sunrise, sunset, hour) => {
    switch (randomPhotoCat) {
        case "clear":
            if (hour >= sunrise || hour <= sunrise + 1) {
                randomPhotoCat = "sunrise";
            } else if (hour <= sunset || hour >= sunset - 1) {
                randomPhotoCat = "sunset";
            } else if (hour > 18 && hour < 23 || hour >= 0 && hour < 5) {
                randomPhotoCat = "night";
            } else randomPhotoCat = "clear";
            break;
        case "clouds":
            randomPhotoCat = "clouds";
            break;
        case "snow":
            randomPhotoCat = "snow";
            break;
        case "thunderstorm":
        case "torndado":
            randomPhotoCat = "storm";
            break;
        case "smoke":
        case "haze":
        case "dust":
        case "fog":
        case "sand":
        case "ash":
            randomPhotoCat = "atmosphere";
            break;
        case "mist":
        case "drizzle":
        case "rain":
            randomPhotoCat = "rain";
            break;
    }

    let photoNumber;
    if (randomPhotoCat === "clear") {
        photoNumber = rand.randomNumClear;
    } else if (randomPhotoCat === "sunrise") {
        photoNumber = rand.randomNumSunrise;
    } else if (randomPhotoCat === "sunset") {
        photoNumber = rand.randomNumSunset;
    } else if (randomPhotoCat === "clouds") {
        photoNumber = rand.randomNumClouds;
    } else if (randomPhotoCat === "atmosphere") {
        photoNumber = rand.randomNumAtmosphere;
    } else if (randomPhotoCat === "night") {
        photoNumber = rand.randomNumNight;
    } else if (randomPhotoCat === "storm") {
        photoNumber = rand.randomNumStorm;
    } else if (randomPhotoCat === "rain") {
        photoNumber = rand.randomNumRain;
    } else {
        photoNumber = rand.randomNumStorm;
    }

    return `url("../assets/img/${randomPhotoCat.toLowerCase()}/${photoNumber}.png")`;
};

export const updateCardInfo = (day, forecasts, hour) => {
    const { dt, temp, clouds, pop, sunrise, humidity, uvi, sunset, weather } = day;
    const { max } = temp;
    const { min } = temp;
    const { description } = weather[0];
    const { main } = weather[0];
    const randomPhotoCat = main;

    dom.cardDate.innerText = setCardDate(dt);
    dom.highTempData.innerText = `${Math.round(max)}ºF`;
    dom.cloudsData.innerText = `${clouds}%`;
    dom.humidityData.innerText = `${humidity}%`;
    dom.sunriseData.innerText = `${setCardTimes(sunrise)}`;
    dom.lowTempData.innerText = `${Math.round(min)}ºF`;
    dom.uviData.innerText = `${uvi}`;
    dom.popData.innerText = `${pop}%`;
    dom.sunsetData.innerText = `${setCardTimes(sunset)}`;
    dom.cardDescriptionData.innerText = `${description}`;
    dom.cardBody.style.backgroundImage = `${renderRandomPhoto(randomPhotoCat, sunrise, sunset, hour)}`;

    let forecastArray = [...document.querySelectorAll(".forecast-tab")];
    forecastArray.forEach((tab, index) => {
        let day = forecasts[index];
        let { dt, sunrise, sunset } = day;

        tab.innerText = func.setCardDate(`${dt}`);
        tab.addEventListener("click", (e) => {
            removeActiveClass(forecastArray);
            tab.classList.add("active");
            updateCardInfo(day);
        });
    });
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

export const updateLanding = (data) => {
    const { current, daily } = data;
    const { temp, sunrise, sunset } = current;
    const {weather} = daily[0];
    const { main } = weather[0];
    dom.landingLocation.innerText = `San Antonio, TX`;
    dom.currentDate.innerText = `${days[day]} ${months[month]}, ${date}`;
    dom.currentTime.innerText = `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
    dom.currentTemp.innerText = `${Math.floor(temp)}ºF`;
    dom.pageContainer.style.backgroundImage = `${renderRandomPhoto(main, sunrise, sunset, hour)}`;
};

//<--FORECAST CARDS-->
export const setCardDate = (dt) => {
    const dateForDisplay = new Date(dt * 1000);
    const month = dateForDisplay.getMonth() + 1;
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

const removeActiveClass = (forecastArray) => {
    forecastArray.forEach(tab => {
        tab.classList.remove("active");
    });
};






