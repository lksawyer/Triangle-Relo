import React from 'react';
import Login from '../Login/Login';
import GoogleMapWrapper from '../Map/GoogleMapWrapper';

class SaveSearch extends React.Component{

//state = {
    // UserID: "",
    // SearchArea: [],
    // SearchMarkers: [],

//handleSearchSave = {
    // post the GoogleID, neighborhoodMarkersArray, and placesMarkersArray to MongoDB.  Defined in SeachSchekm form User Search file in models

//  };



  render () {
    return (
        <handleSearchSave 
                     className={'Save_Search' + this.props.cssClasses}
                     //responseHandler={this.handleSearchSave}
                     buttonText="Save Search"/>
        
    );
  }

}

export default SaveSearch;
