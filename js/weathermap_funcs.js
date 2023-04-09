import { keys } from "./keys.js";
import * as dom from "./weathermap_dom.js";
import * as func from "./weathermap_funcs.js";

export const fetchWeather = async () => {
    try {
        const SAlong = -98.48527;
        const SAlat = 29.423017;
        const imperial = "imperial";
        const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${SAlat}&lon=${SAlong}&units=${imperial}&appid=${keys.openWeather}`;
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

export const updateCardInfo = (day, forecasts) => {
    const { dt, temp, clouds, pop, sunrise, humidity, uvi, sunset, weather } = day;
    const { max } = temp;
    const { min } = temp;
    const { description } = weather[0];
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

    let forecastArray = [...document.querySelectorAll(".forecast-tab")];
    forecastArray.forEach((tab, index) => {
        let day = forecasts[index];
        let { dt } = day;
        tab.innerText = func.setCardDate(`${dt}`);
        tab.addEventListener("click", (e) => {
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
    const { current } = data;
    const { temp } = current;
    dom.landingLocation.innerText = `San Antonio, TX`;
    dom.currentDate.innerText = `${days[day]} ${months[month]}, ${date}`;
    dom.currentTime.innerText = `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
    dom.currentTemp.innerText = `${Math.floor(temp)}ºF`;
    dom.pageContainer.style.backgroundImage = `url("../assets/img/sunny/5.png")`;
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

const removeActiveClass = () => {
    dom.forecastTabs.forEach(tab => {
        tab.classList.remove("active");
    });
};

// dom.forecastTabs.forEach(tab => {
//     tab.addEventListener("click", () => {
//         removeActiveClass();
//         dom.cardDate.innerText = tab.innerText;
//         tab.classList.add("active");
//     });
// });

dom.cardBody.style.backgroundImage = `url('../assets/img/rain/${2}.png`;





