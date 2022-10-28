
import { Map } from './map.js';


function initMap() {
    // The location of guanambi-14.283216, -42.683485
    const guanambi = { lat: -14.283216, lng: -42.683485 };
    
    var map = new Map({
      zoom: 10, 
      center: guanambi, 
      markers: guanambi, 
      element: document.getElementById("map")
    })
}
window.initMap = initMap;

const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    let position =  getSelectedChoise(form, 'radio');
    map.changeMarkerPosition(position);
    e.preventDefault()
});


function getSelectedChoise(form, typeInput) {
    let inputs = Array.from(form.querySelectorAll(`input[type=${typeInput}]`))
    
    for(let i =0; i < inputs.length; i++) {
        if (inputs[i].checked) return getPosition(inputs[i].value);
    }
}

function getPosition(value){
    value = value.split(", ")
    for(let i =0; i < value.length; i++) {
        value[i] = Number(value[i])
    }
    return { lat: value[0], lng: value[1] }
}