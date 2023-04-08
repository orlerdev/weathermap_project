import * as dom from "./weathermap_dom.js";
import * as func from "./weathermap_funcs.js";
import { keys } from "./keys.js";
import mapboxgl from "mapbox-gl";
import { map, marker, onDragEnd } from "./weathermap_funcs.js";
import Marker from "mapbox-gl/src/ui/marker";

dom.searchBtn.addEventListener("click", (e) => {
    console.log("event fired");
    console.log(dom.searchInput.value.length);
    if (dom.searchInput.value.length === 0) {
        console.log("event fired");
        dom.hiddenSearch.classList.toggle("active");
        dom.searchInput.focus();
    }
});

dom.userSearch.addEventListener("submit", e => {
    let address = dom.userSearch.value;
    console.log(address);
    geocode(address, keys.mapbox).then(coordinates => {
        const newMarker = new Marker({
            "draggable": "true"
        })
            .setLngLat(coordinates)
            .addTo(map);
        map.setCenter(coordinates);
    });
    dom.mapContainer.classList.add("active");
});

document.addEventListener("click", e => {
    const isClickInside = dom.userSearch.contains(e.target);
    if (!isClickInside) {
        dom.userSearch.classList.remove("active");
    }
});

dom.fiveDayBtn.addEventListener("click", async () => {
    dom.forecastContainer.classList.toggle("active");
});

dom.forecastTabs.forEach((tab, index) => {
    tab.addEventListener("click", (e) => {
        let day = func.forecasts[index];
        tab.innerText = func.setCardDate(`${day.dt}`);
        func.updateCardInfo(day);
    });
});

dom.showMapBtn.addEventListener("click", () => {
    dom.mapContainer.classList.toggle("active");
    if (dom.forecastContainer.classList.contains("active")) {
        dom.forecastContainer.classList.remove("active");
    }
});

marker.addEventListener("dragend", onDragEnd);

dom.mapHomeBtn.addEventListener("click", () => {
    console.log("fired");
    map.setCenter([-98.48962, 29.42692]);
    const marker = new mapboxgl.Marker({
        draggable: true
    })
        .setLngLat(map.getCenter())
        .addTo(map);
});