import React from "react";

import {BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import * as sIcon from '@fortawesome/free-solid-svg-icons'

const header = () => {

    return (
        <header id="header">
            <div className="inner">
                <Link to="/" className="logo" >
                    <Icon icon={sIcon.faBook} />
                </Link>
                <ul>
                    <li><Link to="/example">예제</Link></li>
                    <li><Link to="/algorism">알고리즘</Link></li>
                </ul>
            </div>
        </header>
    )
}

export default header;

