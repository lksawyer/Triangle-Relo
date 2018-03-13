import React from 'react';
import GoogleMapWrapper from './GoogleMapWrapper';

const Map = (props) => {

    return (
        <div style={{height: '450px'}}>
            <GoogleMapWrapper 
                defaultLat={props.defaultLat} 
                defaultLng={props.defaultLng}
                newCord={props.newCord}
                neighborhoods={props.neighborhoods}
                mapCallback={props.mapCallback}//So this.map from GoogleMapsWrapper can be accessed in the parent
            />
        </div>
    );

}

export default Map;