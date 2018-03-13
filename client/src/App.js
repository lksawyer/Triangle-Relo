import React, { Component } from 'react';
import Search from './Search/Search';
import Chips from './Chips/Chips';
import Map from './Map/Map';
import axios from 'axios';
import convert from 'xml-js';

/*global google */

class App extends Component {

  state = {
    chips: ["Grocery","Church","Parks","School","Hospital"],
    defaultCord: {lat: 35.779,lng: -78.638}, //map is centered on raleigh when app loads
    newCord: {}, //center map on cord we get from zillow
    neighborhoods: [], //populated when we query zillow
    map: {}
  }

  addChipHandler = () => {
    const newChips = [...this.state.chips];
    const newChip = document.getElementById('createChip').value;
    newChips.push(newChip);
    this.setState({chips: newChips});
  }

  deleteChipHandler = (chipIndex) => {
    const newChips = [...this.state.chips];
    newChips.splice(chipIndex, 1);
    this.setState({chips: newChips});
  }

  zillowSearch = () => {
    // `http://www.zillow.com/webservice/GetRegionChildren.htm?zws-id=X1-ZWz1g7awznkjyj_4ok8b&state=wa&city=seattle&childtype=neighborhood`
    const baseURL = 'https://www.zillow.com/webservice/GetRegionChildren.htm?output=json&';
    const zwsid = 'zws-id=' + 'X1-ZWz1g7awznkjyj_4ok8b' + '&';
    // const searchState = document.getElementById('search').value.trim;
    // const searchCity = document.getElementById('search').value.trim;
    const address = document.getElementById('search').value.split(',');
    const city = address[0];
    const state = address[1];
    const addressQuery = 'state=' + state + '&city=' + city + '&';
    const type = 'childtype=' + 'neighborhood';
    axios.get(baseURL + zwsid + addressQuery + type)
    .then(res => {
      const json = convert.xml2js(res.data, {compact: true, spaces: 4});
      const region = json['RegionChildren:regionchildren'].response.region;
      const regionID = json['RegionChildren:regionchildren'].response.region.id._text;
      const regionLat = json['RegionChildren:regionchildren'].response.region.latitude._text;
      const regionLng = json['RegionChildren:regionchildren'].response.region.longitude._text;
      const neighborhoods = json['RegionChildren:regionchildren'].response.list.region;
      this.setState({ 
        newCord: {_id: regionID, lat: regionLat, lng: regionLng},
        neighborhoods: neighborhoods 
      });
      console.log('state ', this.state);
    })
    .catch(function (error) {
      console.log("zillow error! ", error);
    });
  }

  //Search autocomplete
  activatePlacesSearch = () => {
    console.log("autocomplete");
    const options = {
      types: ['(cities)'],
      componentRestrictions: {country: "us"}
     };
    const input = document.getElementById('search');
    const autocomplete = new google.maps.places.Autocomplete(input, options);
  }

  //Add places to map
  addGooglePlacesHandler = (map) => {
    console.log("addGooglePlacesHandler");
    console.log("from agph ", map);
    
    // const center = {lat: 35.779, lng: -78.638}; 
    // //where to search for nearby places, radius of search, type of place (grocery, cafe, etc)
    // const request = {
    //   query: 'cafe',
    //   location: center,
    //   radius: 8047,
    // };

    // //Construct a service object
    // const service = new google.maps.places.PlacesService(map);

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
    //         map: map,
    //         position: place.geometry.location,
    //         title: "cafe",
    //         icon: image
    //     });
    // }

    // service.textSearch(request, callback);
  }

  //Callback for getting map defined in GoogelMapWrapper into App.js
  mapCallback = (map) => {
    console.log("mapCallback ", map);
    this.setState({map: map});
  }

  render() {

    return (
      <div>
        <Search zillowSearch={this.zillowSearch} autocomplete={this.activatePlacesSearch}/>
        <Chips chips={this.state.chips} addChip={this.addChipHandler} deleteChip={this.deleteChipHandler} addGooglePlaces={this.addGooglePlacesHandler} map={this.mapCallback}/>
        <Map 
          defaultLat={this.state.defaultCord.lat} 
          defaultLng={this.state.defaultCord.lng}
          newCord={this.state.newCord}
          neighborhoods={this.state.neighborhoods}
          mapCallback={this.mapCallback}//So this.map from GoogleMapsWrapper can be accessed in the parent
        />
      </div>
    );
  }
}

export default App;