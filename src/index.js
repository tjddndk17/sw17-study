import 'react-app-polyfill/ie9'
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

// render start
ReactDOM.render(
    <App />,
    document.getElementById('root')
);

// 캐시 남지 않도록
serviceWorker.unregister();

