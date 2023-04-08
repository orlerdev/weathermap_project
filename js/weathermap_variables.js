const SAlong = -98.48527;
const SAlat = 29.423017;
const imperial = "imperial";

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

let currentTemperature = await weather.current.temp;
let currentUvi = await weather.current.uvi;
let currentpop = await weather.current.pop;
let currentSunrise = await weather.current.sunrise;
let currentSunset = await weather.current.sunset;
let currentPressure = await weather.current.pressure;
let currentHumidity = await weather.current.humidity;
let currentClouds = await weather.current.clouds;
let currentVisibility = await weather.current.visibility;
let currentDewPoint = await weather.current.dew_point;
let currentWeather = await weather.current.weather.main;
let currentWeatherDesc = await weather.current.weather.description;
// let dayDate = await weather.daily.dt;
let dailyTemp = await weather.daily.temp.max;
let dailySunrise = await weather.daily.sunrise;
let dailySunset = await weather.daily.sunset;
let dailyPressure = await weather.daily.pressure;
let dailyHumidity = await weather.daily.humidity;
let dailyClouds = await weather.daily.clouds;
let dailyVisibility = await weather.daily.visibility;
let dailyDewPoint = await weather.daily.dew_point;
let dailytUvi = await weather.daily.uvi;
let dailytpop = await weather.daily.pop;
let dailyWeather = await weather.daily.weather.main;
let dailyWeatherDesc = await weather.daily.weather.description;
cardDate.innerText = `${weather.daily.dt}`;
sunriseValue.innerText = `${dailySunrise}`;
uviValue.innerText = `${dailyUvi}`;
humidityValue.innerText = `${dailyHumidity}`;
cloudsValue.innerText = `${dailyClouds}`;
sunsetValue.innerText = `${dailySunset}`;
pressureValue.innerText = `${dailyPressure}`;
visibilityValue.innerText = `${dailyVisibility}`;
dewPointValue.innerText = `${dailyDewPoint}`;
cardDescription.innerText = `${dailyWeatherDesc}`;

let { day, date, days, month, months, hoursForClock, minutes, ampm } = setTime();
let { dateForDisplay, monthA, dayA, dateA, hours, hoursForClockA, minutesA, secondsA, ampmA, daysA, monthsA } = getAPIDate();
const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

currentDate.innerText = `${days[day]} ${months[month]}, ${date}`;
currentTime.textContent = `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
pageContainer.style.filter = `blur(${scale(load, 0, 100, 15, 0)}px)`;