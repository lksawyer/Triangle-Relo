import React, { Component } from 'react';
/*global google */

class GoogleMapWrapper extends Component {

    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps ', nextProps)
        //centers map off of data in state.newCord
        let lat = nextProps.newCord.lat;
        let long = nextProps.newCord.lng;
        // Don't do anything if there are no new coordinates
        if (!!lat || !!long) {
            this.panMap(lat, long)
        }

        //plots markers based off of data in state.neighborhoods
        const neighborhoods = nextProps.neighborhoods;
        if (!!neighborhoods.length) {
            this.addNeighborhoods(neighborhoods);
        }
    }

    panMap(lat, long) {
        if (!lat) lat = this.props.defaultLat;
        if (!long) long = this.props.defaultLng;
        this.map.panTo({ lat: parseFloat(lat), lng: parseFloat(long) });
    }

    addNeighborhoods() {

        for (let i = 0; i < neighborhoods.length; i++) {
            this.marker = new google.maps.Marker({
                position: { lat: parseFloat(nextProps.neighborhoods[i].latitude['_text']), lng: parseFloat(nextProps.neighborhoods[i].longitude['_text']) },
                map: this.map
            });
        }
    }

    componentDidMount() {

        console.log("componenetDidMount");

        const center = {lat: this.props.defaultLat, lng: this.props.defaultLng};

        this.map = new google.maps.Map(this.refs.map, {
            center: center,
            zoom: 11
        });

        //Passes this.map to App.js so we can store this.map in state and allow child components to access this.map

        // if (!this.hasMounted) {
        //     this.hasMounted = true;
        //     this.props.mapCallback(this.map);
        // }

        //Places=================================================

        // //where to search for nearby places, radius of search, type of place (grocery, cafe, etc)
        // const request = {
        //     query: 'cafe',
        //     location: center,
        //     radius: 8047,
        // };

        // //Construct a service object
        // const service = new google.maps.places.PlacesService(this.map);

        // //Callback for text search. Ensures places are returned
        // const callback = (results, status) => {
        //     if(status == google.maps.places.PlacesServiceStatus.OK) {
        //         for (let i=0; i < results.length; i++) {
        //             createMarker(results[i]);
        //         }
        //     }
        // }

        // //Custom maker icon
        // const image = {
        //     url: "https://www.shareicon.net/data/2015/09/21/644139_pin_512x512.png",
        //     size: new google.maps.Size(71, 71),
        //     origin: new google.maps.Point(0, 0),
        //     anchor: new google.maps.Point(17, 34),
        //     scaledSize: new google.maps.Size(25, 25)
        //   };

        // const createMarker = (place) => {
        //     const placeLoc = place.geometry.location;
        //     const marker = new google.maps.Marker({
        //         map: this.map,
        //         position: place.geometry.location,
        //         title: "cafe",
        //         icon: image
        //     });
        // }

        // service.textSearch(request, callback);

        //Places=================================================

    }

    render() {
        return(
            <div ref="map" style={{height: '100%'}}></div>
        );
    }
};

export default GoogleMapWrapper;
