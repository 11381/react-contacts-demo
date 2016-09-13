import React from "react";
import App from "./app";
import TestUtils from 'react-addons-test-utils';

describe("App", function(){
    var instance = null;

    beforeEach(function() {
        instance = TestUtils.renderIntoDocument(<App />);
    });

    it("renders", function(){
        expect(instance).toBeTruthy();
    });
});