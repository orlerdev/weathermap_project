import { ForecastCard } from "./weather_classes.js";

( async() => {
        const fetchWeather = async () => {
        try {
            const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${SAlat}&lon=${SAlong}&units=${imperial}&appid=${openWeather}`);
            const data = await res.json();
            const daily = data.daily;
            const {description} = weather.description
            let forecastCard = new ForecastCard(dt, feels_like,clouds,pop,sunrise,humidity, uvi, pressure, sunset, description);
            forecastCard.createCard();
        } catch (e) {
            console.log(e.message);
        }
    };
})();