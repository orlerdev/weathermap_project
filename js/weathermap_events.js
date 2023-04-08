searchBtn.addEventListener('click', (e) => {
    console.log('event fired');
    console.log(searchInput.value.length);
    if (searchInput.value.length === 0) {
        console.log('event fired');
        hiddenSearch.classList.toggle('active');
        searchInput.focus();
    }
});

searchInput.addEventListener('input', e => {
    let address = searchInput.value;
    console.log(address);
    geocode(address, MAPBOX_API_TOKEN).then(coordinates => {
        const newMarker = new mapboxgl.Marker({
            'draggable': 'true'
        })
            .setLngLat(coordinates)
            .addTo(map);
        map.setCenter(coordinates);
    });
    mapContainer.classList.add('active');
});

document.addEventListener('click', e => {
    const isClickInside = searchInput.contains(e.target);
    if (!isClickInside) {
        searchInput.classList.remove('active');
    }
});


//<--NEEDS TO BE SPLIT UP, SEVERAL THINGS HAPPENING IN ONE PLACE-->
forecastShowBtn.addEventListener('click', async () => {
    // let data = await fetchWeather();
    let date = new Date(data.current.dt * 1000);
    console.log(data);
    console.log(date);



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
    forecastContainer.classList.toggle('active');
});

mapShowBtn.addEventListener('click', () => {
    mapContainer.classList.toggle('active');
    if (forecastContainer.classList.contains('active')) {
        forecastContainer.classList.remove('active');
    }
});