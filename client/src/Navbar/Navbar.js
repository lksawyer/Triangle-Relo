import React from 'react';


const navbar = (props) => {
    return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo">Relo</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="sass.html">Saved Homes</a></li>
                        <li><a href="badges.html">Map</a></li>
                    </ul>
                    </div>
                </nav>
            </div>
            )
};

export default navbar;