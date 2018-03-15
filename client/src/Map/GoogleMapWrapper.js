import React, { Component } from 'react';
/*global google */
const neighborhoodMarkersArray = [];
const placesMarkersArray = [];

class GoogleMapWrapper extends Component {

    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(nextProps) {

        const prevCordLat = parseFloat(this.props.newCord.lat); //get the existing newCordLat
        const prevCordLng = parseFloat(this.props.newCord.lng); //get the existing newCordLng
        const newCordLat = parseFloat(nextProps.newCord.lat); //get the next newCordlat
        const newCordLng = parseFloat(nextProps.newCord.lng); //get the next newCordlng

        //Center map on new cords if newCordLat && newCordLng actually change
        if(prevCordLat !== newCordLat && prevCordLng !== newCordLng) {
            console.log("panTo");
            this.panTo(newCordLat, newCordLng);
        }

        const prevNeighborhoods = [...this.props.neighborhoods]; //Array of existing neighborhoods we received from Zillow
        const newNeighborhoods = [...nextProps.neighborhoods]; //Array of new neighborhoods we receive from Zillow

        //Plot new neighborhood markers when neighborhoods have been updated
        if(prevNeighborhoods.length === 0 || prevNeighborhoods[0].name._text !== newNeighborhoods[0].name._text) {
            console.log("neighborhood plotter");
            this.neighborhoodPlotter(newNeighborhoods);
        }

        //Places=================================================

        const placesQuery = nextProps.placesQuery;

        if (placesQuery) {

            const centerPlaces = {lat: newCordLat, lng: newCordLng}; //Ensures when places are added to map, they are centered on maps center

            const query = nextProps.placesQuery;

            //where to search for nearby places, radius of search, type of place (grocery, cafe, etc)
            const request = {
                query: query,
                location: centerPlaces,
                radius: 8047,
            };

            //Construct a service object
            const service = new google.maps.places.PlacesService(this.map);

            //Callback for text search. Ensures places are returned
            const callback = (results, status) => {
                if(status == google.maps.places.PlacesServiceStatus.OK) {
                    for (let i=0; i < results.length; i++) {
                        createMarker(results[i]);
                    }
                }
            }
            
            //Custom maker icon
            const image = {
                url: "https://www.shareicon.net/data/2015/09/21/644139_pin_512x512.png",
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            const createMarker = (place) => {
                const placeLoc = place.geometry.location;
                const marker = new google.maps.Marker({
                    map: this.map,
                    position: place.geometry.location,
                    title: "cafe",
                    icon: image
                });
                placesMarkersArray.push(marker);
            }

            service.textSearch(request, callback);

        }

        //Places=================================================

    }

    //When called, centers map at provided lat, lng
    panTo = (lat, lng) => {
        //centers map off of data in state.newCord
        this.map.panTo({lat: lat, lng: lng});
        
        //Everytime map is panned to position, clear neighborhaddMarkersArray and remove those markers from the map
        for (var i = 0; i < neighborhoodMarkersArray.length; i++ ) {
            neighborhoodMarkersArray[i].setMap(null);
        };
        //Everytime map is panned to position, clear neighborhaddMarkersArray and remove those markers from the map
        for (var i = 0; i < placesMarkersArray.length; i++ ) {
            placesMarkersArray[i].setMap(null);
        };
    }

    //When called, plots markers based off of data in state.neighborhoods
    neighborhoodPlotter = (neighborhoods) => {
        for(let i = 0; i < neighborhoods.length; i++ ) {
            this.marker = new google.maps.Marker({
                position: {lat: parseFloat(neighborhoods[i].latitude['_text']), lng: parseFloat(neighborhoods[i].longitude['_text'])},
                map: this.map
            });
            neighborhoodMarkersArray.push(this.marker);
        }
    }

    componentDidMount() {

        const center = {lat: this.props.defaultLat, lng: this.props.defaultLng}; 

        this.map = new google.maps.Map(this.refs.map, {
            center: center,
            zoom: 11
        });

    }

    render() {
        return(
            <div ref="map" style={{height: '100%'}}></div>
        );
    }
};

export default GoogleMapWrapper;