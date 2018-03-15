import React from 'react';


const navbar = (props) => {
    return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo">&#9665;Relo</a>
                    <div id="navDiv" className="right hide-on-med-and-down">
                        <button className="navbtn"><a href="sass.html">Saved Homes</a></button>
                        <button className="navbtn">Login</button>
                    </div>
                    </div>
                </nav>
            </div>
            )
};

export default navbar;