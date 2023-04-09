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
    console.log(forecasts);
    const day1 = forecasts[0];
    const day2 = forecasts[1];
    const day3 = forecasts[2];
    const day4 = forecasts[3];
    const day5 = forecasts[4];

    console.log(day1);
    console.log(day2);
    console.log(day3);
    console.log(day4);
    console.log(day5);

    func.updateCardInfo(day1, forecasts);

    event.fiveDayBtnEvent();
    event.searchBtnEvent();
    // event.markerEvent();
    event.mapHomeBtnEvent();
    event.userSearchEvent();
    event.showMapBtnEvent();
})();