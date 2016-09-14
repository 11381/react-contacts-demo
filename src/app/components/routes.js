import React from 'react';

import App from "./app.js";
import ContactListContainer from "../containers/contact-list-container";
import ContactEditContainer from "../containers/edit-contact-container";
import { Provider } from "react-redux";

import { Router, Route, IndexRoute, hashHistory } from "react-router";

const Routes = ({ store }) => (
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <Route component={App}>
                    <IndexRoute component={ContactListContainer}/>
                    <Route path="edit/:id" component={ContactEditContainer} />
                    <Route path="new" component={ContactEditContainer} />
                </Route>
            </Route>
        </Router>
    </Provider>
);

Routes.propTypes = {
    store: React.PropTypes.object.isRequired
};

export default Routes;