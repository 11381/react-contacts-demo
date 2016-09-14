import "whatwg-fetch";
import promise from "es6-promise";
promise.polyfill();

import React from "react";
import TestUtils from 'react-addons-test-utils';
import ContactListContainer from "./contact-list-container";

import configureStore from "redux-mock-store";
import promiseMiddleware from "../store/simple-promise";

const middleware = [promiseMiddleware()];
const mockStore = configureStore(middleware);
const store = mockStore({
    contactList: {}
});

const mockRoute = {
    path: ""
};

describe("contact-list-container", function(){
    var component = null;

    beforeEach(function() {
        var onRequestList = jasmine.createSpy("onRequestList");
        component = TestUtils.renderIntoDocument(<ContactListContainer store={store} route={mockRoute} onRequestList={onRequestList} />);
    });

    it("renders", function(){
        expect(component).toBeTruthy();
    });
});