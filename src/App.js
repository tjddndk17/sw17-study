import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './assets/css/reset.css'
import './assets/css/common.css'

import Header from './component/Header'
import Footer from './component/Footer'

import Main from './view/Main'
import NoPage from './view/NoPage'

import ExampleList from './view/example/List'
import AlgorismList from './view/algorism/List'
import AlgorismDetail from './view/algorism/Detail'


const App = () => {

    return(
        <Router>
            <Header />
            <div id="wrap">
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route exact path="/example" component={ExampleList} />
                    <Route exact path="/algorism/" component={AlgorismList} />
                    <Route exact path="/algorism/:week" component={AlgorismDetail} />
                    <Route component={NoPage} />
                </Switch>
            </div>
            <Footer />
        </Router>
    )
}

export default App;