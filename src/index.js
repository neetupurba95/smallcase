import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.css';
import App from './App';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import allReducers from "./reducer";

const store = createStore(allReducers, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);