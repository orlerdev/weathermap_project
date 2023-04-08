import * as dom from "./weathermap_dom.js";

async function getCurrentTemp() {
    let data = await fetchWeather();
    return dom.currentTemp.innerText = `${Math.floor(data.current.temp)}ºF`;
}

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

export const blurring = async () => {
    let load = 0;
    let int = setInterval(blurring, 15);
    load++;
    if (load > 99) {
        clearInterval(int);
    }
    dom.currentDate.innerText = `${days[day]} ${months[month]}, ${date}`;
    dom.currentTime.textContent = `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
    dom.pageContainer.style.filter = `blur(${scale(load, 0, 100, 15, 0)}px)`;
};

export const setCardTimes = () => {
    let dt = new Date(unix);
    const hours = dt.getHours();
    const hoursForClock = hours >= 13 ? hours % 12 : hours;
    const minutes = dt.getMinutes();
    const seconds = dt.getSeconds();
    const ampm = hours >= 12 ? "pm" : "am";
    return `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
};

export const setCardDate = (dt) => {
    const dateForDisplay = new Date(dt * 1000);
    const month = dateForDisplay.getMonth();
    const date = dateForDisplay.getDate();
    return `${month}/${date}`;
};

let tabs = [...document.querySelectorAll(".indicator-tab")];

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        cardDate.innerText = tab.innerText;
        sunriseValue.innerText = "";
    });
});

const removeActiveClass = () => {
    dom.indicatorTabs.forEach(tab => {
        tab.classList.remove("active");
    });
};

dom.indicatorTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        removeActiveClass();
        tab.classList.add("active");
    });
});

export const generateFiveDay = (data) => {
    const daily = data.daily;
    const generateForecast = (daily) => {
        daily.splice(5);
        return daily;
    };
    const forecasts = generateForecast(daily);
    return forecasts;
    // const dayOne = forecasts[0];
    // const dayTwo = forecasts[1];
    // const dayThree = forecasts[2];
    // const dayFour = forecasts[3];
    // const dayFive = forecasts[4];
};

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
    dom.cardDescriptionData.innerText = `${description}`
};

export const renderTabInfo = (forecasts) => {

}




