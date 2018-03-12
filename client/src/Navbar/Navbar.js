import React from 'react';


const navbar = (props) => {
    return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo">&#9665;Relo</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li className="navbtn"><a href="sass.html">Saved Homes</a></li>
                        <li className="navbtn"><a href="badges.html">Map</a></li>
                    </ul>
                    </div>
                </nav>
            </div>
            )
};

export default navbar;