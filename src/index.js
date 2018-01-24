import React from 'react';
import {render} from 'react-dom';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
//import '../node_modules/bootstrap/dist/css/bootstrap.css';
import routes from './routes';

render(
    <Provider store={store}>
        <Router history={hashHistory} routes={routes}>
        </Router>
    </Provider>,
    document.getElementById('root')
);