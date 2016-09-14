import React from "react";
import TestUtils from 'react-addons-test-utils';
import EditContactContainer from "./contact-edit-container";

import configureStore from "redux-mock-store";
import promiseMiddleware from "../store/simple-promise";

const middleware = [promiseMiddleware()];
const mockStore = configureStore(middleware);
const store = mockStore({
    contact: {}
});

describe("contact-edit-container", function(){
    var component = null;

    beforeEach(function() {
        component = TestUtils.renderIntoDocument(<EditContactContainer store={store} location={{pathname:""}} />);
    });

    it("renders", function(){
        expect(component).toBeTruthy();
    });
});