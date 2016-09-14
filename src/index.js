import "./vendor";

import React from 'react';
import ReactDOM from 'react-dom';
import Routes from "./app/components/routes";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { contact, contactList } from "./app/store/reducers";
import promiseMiddleware from "./app/store/simple-promise";
import createLogger from 'redux-logger';

const logger = createLogger();

const store = createStore(
    combineReducers({
        contact,
        contactList
    }),
    applyMiddleware(promiseMiddleware(), logger)
);

ReactDOM.render(
    <Routes store={store} />,
    document.getElementById('content')
);