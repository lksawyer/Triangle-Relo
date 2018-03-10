import React, { Component } from 'react';
/*global google */

class GoogleMapWrapper extends Component {

    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(nextProps) {
        //centers map off of data in state.newCord
        this.map.panTo({lat: parseFloat(nextProps.newCord.lat), lng: parseFloat(nextProps.newCord.lng)});

        //plots markers based off of data in state.neighborhoods
        for(let i = 0; i < nextProps.neighborhoods.length; i++ ) {
            this.marker = new google.maps.Marker({
                position: {lat: parseFloat(nextProps.neighborhoods[i].latitude['_text']), lng: parseFloat(nextProps.neighborhoods[i].longitude['_text'])},
                map: this.map
            });
        }

           //sets up seeing nearby amenities, within [x] radius
           var service;
           var infowindow;
   
           function amenities() {
               var location = new google.maps.LatLng({lat: parseFloat(nextProps.newCord.lat), lng: parseFloat(nextProps.newCord.lng)});
              
               var request = {
                 location: location,
                 radius: '500',
                 type: ['restaurant']
               };
             
               service = new google.maps.places.PlacesService(this.map);
               service.nearbySearch(request, callback);
             }
             
             function callback(results, status) {
               if (status == google.maps.places.PlacesServiceStatus.OK) {
                 for (var i = 0; i < results.length; i++) {
                   var place = results[i];
                   createMarker(results[i]);
                 }
               }
             }
   
             function createMarker(place) {
               var placeLoc = place.geometry.location;
               var marker = new google.maps.Marker({
                 map: this.map,
                 position: place.geometry.location
               });
       
             }
    }

    componentDidMount() {
        this.map = new google.maps.Map(this.refs.map, {
            center: {lat: this.props.defaultLat, lng: this.props.defaultLng},
            zoom: 11
        })
    }

    render() {
        return(
            <div ref="map" style={{height: '100%'}}></div>
        );
    }
};

export default GoogleMapWrapper;