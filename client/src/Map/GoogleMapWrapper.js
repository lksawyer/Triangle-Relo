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