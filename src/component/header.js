import React from "react";

import {BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const header = () => {

    return (
        <header id="header">
            <div className="inner">
                <ul>
                    <li><Link to="/">Main</Link></li>
                    <li><Link to="/algorism">Algorism</Link></li>
                </ul>
            </div>
        </header>
    )
}

export default header;

