import * as event from "./weathermap_events.js";
import * as func from "./weathermap_funcs.js";

(async () => {
    let data = await func.fetchWeather();
    func.updateLanding(data);
    const generateFiveDay = (data) => {
        const { daily } = data;
        daily.splice(5);
        return daily;
    };

    const forecasts = generateFiveDay(data);
    const day1 = forecasts[0];
    const day2 = forecasts[1];
    const day3 = forecasts[2];
    const day4 = forecasts[3];
    const day5 = forecasts[4];

    func.updateCardInfo(day1, forecasts);
    event.fiveDayBtnEvent();
    event.searchBtnEvent();
    // event.userSearchEvent();
    event.showMapBtnEvent();
})();