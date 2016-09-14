import React from "react";
import ReactDOM from "react-dom";
import Contacts from "./contacts";

import TestUtils from 'react-addons-test-utils';
import FilterableContactList from "./contact-list-filterable";
import SimpleError from "./simple-error";

describe("Contacts", function(){
    var node = null;
    var component = null;
    var onRequestList = null;
    var onCreate = null;
    var onEdit = null;

    beforeEach(function() {
        node = document.createElement("div");
        onCreate = jasmine.createSpy("onRequestList");
        onRequestList = jasmine.createSpy("onRequestList");
        onEdit = jasmine.createSpy("onEdit");
        spyOn(Contacts.prototype, "handleContactDelete");
        component = ReactDOM.render(<Contacts onRequestList={onRequestList} onCreate={onCreate} onEdit={onEdit} />, node);
    });

    it("renders", function(){
        expect(component).toBeTruthy();
    });

    it("calls refresh after mount", function(){
        expect(onRequestList).toHaveBeenCalled();
    });

    it("should call handleAddContact when the add button is clicked", function() {
        var addButton = component.refs.add;
        TestUtils.Simulate.click(addButton);
        expect(onCreate).toHaveBeenCalled();
    });

    it("should show the contact list if there are contacts", function(){
        component = ReactDOM.render(<Contacts contacts={[{id: 1}]} />, node);
        expect(() => TestUtils.findRenderedComponentWithType(component, FilterableContactList))
            .not.toThrow();
    });

    it("should hide the contact list if there are no contacts", function(){
        component = ReactDOM.render(<Contacts contacts={[]} />, node);
        expect(() => TestUtils.findRenderedComponentWithType(component, FilterableContactList))
            .toThrow();
    });

    it("should show the error component if there is an error", function(){
        component = ReactDOM.render(<Contacts error="error" />, node);
        expect(() => TestUtils.findRenderedComponentWithType(component, SimpleError))
            .not.toThrow();
    });

    it("should not show the error component if there is not an error", function(){
        component = ReactDOM.render(<Contacts error={null} />, node);
        expect(() => TestUtils.findRenderedComponentWithType(component, SimpleError))
            .toThrow();
    });
});