
import { Map } from './abstract/Map.js';

function initMap() {
    
    const guanambi = { lat: -14.277228, lng: -42.702106 };

    const map = new Map({
      zoom: 10, 
      center: guanambi, 
      markers: [guanambi], 
      element: document.getElementById("map")
    })

    main(map, guanambi)
    
}
window.initMap = initMap;


function main(map, startPositionn) {
    const form = document.getElementById('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        traceRoute(map, startPositionn, getSelectedChoise(form))
    });
    document.getElementById('buttonClick').addEventListener('click', (e) => {
        if (!navigator.geolocation) {
            alert('Erro! não da pra localizar vocẽ')
            return
        }
        
        navigator.geolocation.getCurrentPosition((position) => {
            let location = {lat : position.coords.latitude, lng: position.coords.longitude}
            traceRoute(map, startPositionn, location)
        },handle_errors);
    })
}


function handle_errors(error){
    switch(error.code)
    {
        case error.PERMISSION_DENIED: alert(
            "ative a geolocalização, se estiver no chrome vá em 'chrome://settings/content/location'"
            );
        break;

        case error.POSITION_UNAVAILABLE: alert("could not detect current position");
        break;

        case error.TIMEOUT: alert("retrieving position timed out");
        break;

        default: alert("unknown error");
        break;
    }
}


function traceRoute(map, startPosition, endPosition) {
    let response = map.createRoute(startPosition, endPosition);

    startLoading()

    response.finally(() => { endLoading()})
        .then(
            () => {
                changeStyle('hsla(230, 69%, 50%, 0.8)', 'info')
                setRouteInformations(map.distanceRoute, map.durationRoute);
            },
            (error) => {
                changeStyle('red', 'info')
                setRouteInformations(error.message, error.message);
            }
        )
    setTimeout(() => {
        changeStyle('rgba(71,71,71,0.2)', 'info')
    }, 5000)
}


function changeStyle(color,classe) {
    let elements = Array.from( document.querySelectorAll(`.${classe}`) )
    
    elements.forEach((element) => {
        console.log(element.style.boxShadow)
        element.style.boxShadow = `0px 0px 3px 1px ${color}`;
    })

}


function getSelectedChoise(form) {
    let inputs = Array.from(form.querySelectorAll(`input[type=radio]`))
    
    for(let i =0; i < inputs.length; i++) {
        if (inputs[i].checked) return getPosition(inputs[i].value);
    }
}


function startLoading() {
    let loader = document.getElementById("loader");
    loader.style.animationPlayState = 'running';
    loader.style.display = "block";
    document.getElementById("loader-wrapper").style.display = "block";
}


function endLoading() {
    let loader = document.getElementById("loader");
    loader.style.animationPlayState = 'paused';
    loader.style.display = "none";
    document.getElementById("loader-wrapper").style.display = "none";
}


function getPosition(value){
    value = value.split(",")
    for(let i =0; i < value.length; i++) {
        value[i] = Number(value[i])
    }
    return { lat: value[0], lng: value[1] }
}


function setRouteInformations(distance, duration) {
    let distanceElement = document.getElementById('distanceRouteMap');
    let durationElement = document.getElementById('durationRouteMap');

    distanceElement.innerText = `${distance}`;
    durationElement.innerText = `${duration}`;
}