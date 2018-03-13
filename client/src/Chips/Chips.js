import React from 'react';

const inputWidth = {
    width: "150px"
};

const Chips = (props) => {
    
    return (
        <div>
            {   
                props.chips.map(function(chipName, index) {
                    return (
                        <div className="chip" key={index} onClick={() => {props.addGooglePlaces(props.map)}}>
                            {chipName}
                            <i className="close material-icons" onClick={() => {props.deleteChip(index)}}>x</i>
                        </div>);
                })
            }
            <input id="createChip" type="text" style={inputWidth}/>
            <div className="chip" onClick={props.addChip}>+</div>
        </div>
    );
};

export default Chips;