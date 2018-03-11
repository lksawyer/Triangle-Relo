import React from 'react';

const inputWidth = {
    width: "500px"
};

const Search = ( props ) => {
    return (
        <div>
            <p>Enter "City, State" to get neighborhood information</p>
            <input id="search" type="text" style={inputWidth} onChange={props.autocomplete}/>
            <button onClick={props.zillowSearch}>Search</button>
        </div>
    );
};

export default Search;