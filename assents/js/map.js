

export class Map {
    map;
    htmlElement = document.getElementById("map");
    center = { lat: -14.283216, lng: -42.683485 };
    zoom = 10;
    markers = [];

    constructor(props) {

        if (props.zoom) this.zoom = props.zoom;
        if (props.center) this.center = props.center;
        if (props.htmlElement) this.htmlElement = props.element;

        if (props.markers ) {
            if(typeof this.markers.constructor.name == "Array") {
                this.markers = props.markers;
            } else {
                this.markers.push( props.markers );
            }
        }

            
        this.map = new google.maps.Map( this.htmlElement, {
            zoom: this.zoom,
            center: this.center,
        }); 
      

        this.markers.forEach(position => {
            this.createMarker(position)
        });

    }
    async createMarker(position) {
        this.markers.push(
            new google.maps.Marker({
                position: position,
                map: this.map,
            })
        )
    }
    async changeMarkerPosition(newPosition) {
        if (this.markers < 1) {
            await this.createMarker(newPosition)
            return;
        }

        let last = this.markers.length - 1;
        await this.markers[last].setPosition(newPosition) ;
    }

}

