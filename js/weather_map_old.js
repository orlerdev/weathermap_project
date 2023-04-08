(async () => {
    //<--VARIABLES-->
    const SAlong = -98.48527;
    const SAlat = 29.423017;
    const imperial = "imperial";
    const pageContainer = document.querySelector(".page-container");
    const forecastShowBtn = document.querySelector(".five-day-btn");
    const mapShowBtn = document.querySelector(".map-show-btn");
    const forecastContainer = document.querySelector(".forecast-container");
    const forecastCard = document.querySelector(".forecast-card");
    const cardInfo = document.querySelector(".card-info");
    const cardHead = document.querySelector(".card-head");
    const cardDate = document.querySelector(".card-date");
    const cardBody = document.querySelector(".card-body");
    const sunriseValue = document.querySelector("#sunrise-value");
    const uviValue = document.querySelector("#uvi-value");
    const humidityValue = document.querySelector("#humidity-value");
    const cloudsValue = document.querySelector("#clouds-value");
    const sunsetValue = document.querySelector("#sunset-valule");
    const pressureValue = document.querySelector("#pressure-value");
    const visibilityValue = document.querySelector("#visibility-value");
    const dewPointValue = document.querySelector("#dew-point-value");
    const cardDescription = document.querySelector(".card-description");
    const forecastIndicatorContainer = document.querySelector(".forecast-indicator");
    const indicatorTab = document.querySelector(".indicator-tab");
    const tab1 = document.querySelector("#tab1");
    const tab2 = document.querySelector("#tab2");
    const tab3 = document.querySelector("#tab3");
    const tab4 = document.querySelector("#tab4");
    const tab5 = document.querySelector("#tab5");
    const searchBtn = document.querySelector(".search-btn");
    const searchInput = document.querySelector("#hidden-search");
    const hiddenSearch = document.querySelector(".search");
    const currentDate = document.querySelector(".current-date");
    const currentTime = document.querySelector(".current-time");
    const currentTemp = document.querySelector(".current-temp");
    const currentPop = document.querySelector(".current-pop");
    const mapContainer = document.querySelector(".map-container");

    const fetchWeather = async () => {
        try {
            const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${SAlat}&lon=${SAlong}&units=${imperial}&appid=${openWeather}`);
            const data = await res.json();
            return data;
        } catch (e) {
            console.log(e.message);
        }
    };

    const getPhoto = (weather, num) => {
        let weatherArr = [];
        for (let i = 1; i <= num; i++) {
            weatherArr.push("url(`./img/sunny/${num}.png`)");
            i++;
            num++;
        }
        console.log(weatherArr);
        return weatherArr;
    };

//<--ARRAYS-->
    let { day, date, days, month, months, hoursForClock, minutes, ampm } = setTime();
    let { dateForDisplay, monthA, dayA, dateA, hours, hoursForClockA, minutesA, secondsA, ampmA, daysA, monthsA } = getAPIDate();
    const scale = (num, in_min, in_max, out_min, out_max) => {
        return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
    };
    const indicatorTabs = document.querySelectorAll(".indicator-tab");
    const sunny = ["url('./img/sunny/${randomNum}.png')"];
    const hotDays = ["url('../../assets/img/')"];
    const windyDays = ["url('../../assets/img/')"];
    const cloudyDays = ["url('../../assets/img/')"];
    const rainyDaysUrl = ["url('../../assets/img/')"];
    const snowyDays = ["url('../../assets/img/')"];
    const freezingDays = ["url('../../assets/img/')"];
    const thunderStorms = ["url('../../assets/img/')"];
    const snowStorms = ["url('../../assets/img/')"];
    const coldDays = ["url('../../assets/img/')"];

//<--LOADING BACKGROUND-->
    let load = 0;
    let int = setInterval(blurring, 15);

    async function blurring() {
        load++;
        if (load > 99) {
            clearInterval(int);
        }
        currentDate.innerText = `${days[day]} ${months[month]}, ${date}`;
        currentTime.textContent = `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
        pageContainer.style.filter = `blur(${scale(load, 0, 100, 15, 0)}px)`;
    }

    async function getCurrentTemp() {
        let data = await fetchWeather();
        return currentTemp.innerText = `${Math.floor(data.current.temp)}ºF`;
    }

    await getCurrentTemp();

//<--BACKGROUNDS-->

    let randomNumClouds = randomNumber(1, 8);
    let randomNumFogMist = randomNumber(1, 4);
    let randomNumNight = randomNumber(1, 14);
    let randomNumRain = randomNumber(1, 14);
    let randomNumSnow = randomNumber(1, 21);
    let randomNumSunny = randomNumber(1, 18);
    let randomNumSunrise = randomNumber(1, 10);
    let randomNumSunset = randomNumber(1, 6);
    let randomNumStorm = randomNumber(1, 6);

    pageContainer.style.backgroundImage = `url('./img/sunny/${randomNumSunny}.png`;
    forecastCard.style.backgroundImage = `url('./img/rain/${randomNumRain}.png`;

//<--MAP FETCH-->
//<--EVENT LISTENERS-->

    searchBtn.addEventListener("click", (e) => {
        console.log("event fired");
        console.log(searchInput.value.length);
        if (searchInput.value.length === 0) {
            console.log("event fired");
            hiddenSearch.classList.toggle("active");
            searchInput.focus();
        }
    });

    searchInput.addEventListener("input", e => {
        let address = searchInput.value;
        console.log(address);
        geocode(address, MAPBOX_API_TOKEN).then(coordinates => {
            const newMarker = new mapboxgl.Marker({
                "draggable": "true"
            })
                .setLngLat(coordinates)
                .addTo(map);
            map.setCenter(coordinates);
        });
        mapContainer.classList.add("active");
    });

    document.addEventListener("click", e => {
        const isClickInside = searchInput.contains(e.target);
        if (!isClickInside) {
            searchInput.classList.remove("active");
        }
    });

    document.addEventListener("click", e => {

    });

    forecastShowBtn.addEventListener("click", async () => {
        let data = await fetchWeather();
        let date = new Date(data.current.dt * 1000);
        console.log(data);
        console.log(date);

        function getCardTime(unix) {
            let dt = new Date(unix);
            const hours = dt.getHours();
            const hoursForClock = hours >= 13 ? hours % 12 : hours;
            const minutes = dt.getMinutes();
            const seconds = dt.getSeconds();
            const ampm = hours >= 12 ? "pm" : "am";
            return `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
        }

        sunriseValue.innerText = `${getCardTime(data.current.sunrise)}`;
        uviValue.innerText = `${data.current.uvi}`;
        humidityValue.innerText = `${data.current.humidity}%`;
        cloudsValue.innerText = `${data.current.clouds}%`;
        sunsetValue.innerText = `${getCardTime(data.current.sunset)}`;
        pressureValue.innerText = `${data.current.pressure}pHa`;
        visibilityValue.innerText = `${Math.floor(data.current.visibility / 1609)}mile(s)`;
        dewPointValue.innerText = `${Math.floor(data.current.dew_point)}ºF`;
        cardDescription.innerText = `${data.current.weather.description}`;
        cardDate.innerText = `${date.getMonth() + 1} / ${date.getDate()}`;
        tab1.innerText = `${date.getMonth() + 1} / ${date.getDate()}`;
        date = new Date(data.daily[1].dt * 1000);
        tab2.innerText = `${date.getMonth() + 1} / ${date.getDate()}`;
        date = new Date(data.daily[2].dt * 1000);
        tab3.innerText = `${date.getMonth() + 1} / ${date.getDate()}`;
        date = new Date(data.daily[3].dt * 1000);
        tab4.innerText = `${date.getMonth() + 1} / ${date.getDate()}`;
        date = new Date(data.daily[4].dt * 1000);
        tab5.innerText = `${date.getMonth() + 1} / ${date.getDate()}`;
        date = new Date(data.daily[5].dt * 1000);
        forecastContainer.classList.toggle("active");
    });

    let tabs = [...document.querySelectorAll(".indicator-tab")];
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            cardDate.innerText = tab.innerText;
            sunriseValue.innerText = "";
        });
    });

    mapShowBtn.addEventListener("click", () => {
        mapContainer.classList.toggle("active");
        if (forecastContainer.classList.contains("active")) {
            forecastContainer.classList.remove("active");
        }
    });

    const removeActiveClass = () => {
        indicatorTabs.forEach(tab => {
            tab.classList.remove("active");
        });
    };

    indicatorTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            removeActiveClass();
            tab.classList.add("active");
        });
    });

    indicatorTab.addEventListener("click", () => {

    });
})();
// })();

