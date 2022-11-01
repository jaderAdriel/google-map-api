
import { Map } from './abstract/Map.js';

function initMap() {

    const guanambi = { lat: -14.283216, lng: -42.683485 };

    const map = new Map({
      zoom: 10, 
      center: guanambi, 
      markers: [guanambi], 
      element: document.getElementById("map")
    })


    const form = document.getElementById('form');
    form.addEventListener('submit', (e) => {

        e.preventDefault()
        let position =  getSelectedChoise(form);

        map.changeMarkerPosition(position);
        map.createRoute(guanambi, position)
        .then(() => setRouteInformations(map.distanceRoute, map.durationRoute) )
        
    });

}
window.initMap = initMap;





function getSelectedChoise(form) {
    let inputs = Array.from(form.querySelectorAll(`input[type=radio]`))
    
    for(let i =0; i < inputs.length; i++) {
        if (inputs[i].checked) return getPosition(inputs[i].value);
    }
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