import * as dom from "./weathermap_dom.js";

export const searchBtnEvent = () => {
    dom.searchBtn.addEventListener("click", (e) => {
        console.log("event fired");
        console.log(dom.userSearch.value.length);
        if (dom.userSearch.value.length === 0) {
            console.log("event fired");
            // dom.landingSearch.classList.toggle("active");
            dom.userSearch.focus();
        }
        dom.landingSearch.classList.toggle("active");
    });
};

document.addEventListener("click", e => {
    const isClickInside = dom.userSearch.contains(e.target);
    if (!isClickInside) {
        dom.userSearch.classList.remove("active");
    }
});
//
export const fiveDayBtnEvent = () => {
    dom.fiveDayBtn.addEventListener("click", async () => {
        dom.forecastContainer.classList.toggle("active");
    });
};
//

//
export const showMapBtnEvent = () => {
    dom.showMapBtn.addEventListener("click", () => {
        dom.mapContainer.classList.toggle("active");
        if (dom.forecastContainer.classList.contains("active")) {
            dom.forecastContainer.classList.remove("active");
        }
    });
};

