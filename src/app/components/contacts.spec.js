import 'whatwg-fetch';
import promise from 'es6-promise';
promise.polyfill();

import React from "react";

import Contacts from "./contacts";

class ContactServiceMock {
    getAll(){
        return [];
    }
}

Contacts.__Rewire__("../services/contacts", new ContactServiceMock());

import TestUtils from 'react-addons-test-utils';
import FilterableContactList from "./contact-list-filterable";
import EditContact from "./contact-edit";
import SimpleError from "./simple-error";

describe("Contacts", function(){
    var component = null;

    beforeEach(function() {
        spyOn(Contacts.prototype, "refreshContacts");
        spyOn(Contacts.prototype, "handleAddContact");
        component = TestUtils.renderIntoDocument(<Contacts />);
    });

    it("renders", function(){
        expect(component).toBeTruthy();
    });

    it("calls refresh after mount", function(){
        expect(component.refreshContacts).toHaveBeenCalled();
    });

    it("should call handleAddContact when the add button is clicked", function() {
        var addButton = component.refs.add;
        TestUtils.Simulate.click(addButton);
        expect(component.handleAddContact).toHaveBeenCalled();
    });

    it("should handle contact edit", function(){
        var contact = {id:1};
        component.handleContactEdit(contact);
        expect(component.state.editContact).toBe(contact);
    });

    it("should stop editing", function(){
        component.handleContactEdit({id:1});
        component.stopEditing();
        expect(component.state.editContact).toBeNull();
    });

    it("should show the contact list if there are contacts", function(){
        component.setState({
            contacts: [{
                id:1,
            }]
        }, function(){
            var list = TestUtils.findAllInRenderedTree(component, c => c instanceof FilterableContactList);
            expect(list && list.length).toBeTruthy();
        });
    });

    it("should hide the contact list if there are no contacts", function(){
        component.setState({
            contacts: []
        }, function(){
            var list = TestUtils.findAllInRenderedTree(component, c => c instanceof FilterableContactList);
            expect(list && list.length).toBeFalsy();
        });
    });

    it("should show the edit contact component when editing", function(){
        component.handleContactEdit({id:1});
        var list = TestUtils.findAllInRenderedTree(component, c => c instanceof EditContact);
        expect(list && list.length).toBeTruthy();
    });

    it("should not show the edit contact component when not editing", function(){
        component.handleContactEdit({id:1});
        component.stopEditing();
        var list = TestUtils.findAllInRenderedTree(component, c => c instanceof EditContact);
        expect(list && list.length).toBeFalsy();
    });

    it("should show the error component if there is an error", function(){
        component.setState({
            error: "some error"
        });
        var list = TestUtils.findAllInRenderedTree(component, c => c instanceof SimpleError);
        expect(list && list.length).toBeTruthy();
    });

    it("should not show the error component if there is not an error", function(){
        component.setState({
            error: null
        });
        var list = TestUtils.findAllInRenderedTree(component, c => c instanceof SimpleError);
        expect(list && list.length).toBeFalsy();
    });
});