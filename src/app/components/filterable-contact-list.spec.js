import React from "react";
import TestUtils from 'react-addons-test-utils';
import ContactList from "./filterable-contact-list";

describe("contact-list-filterable", function(){
    var component = null;
    var onEditContact = null;
    var onDeleteContact = null;

    beforeEach(function() {
        spyOn(ContactList.prototype, "handleTextChanged");
        onEditContact = jasmine.createSpy("onEditContact");
        onDeleteContact = jasmine.createSpy("onDeleteContact");
        component = TestUtils.renderIntoDocument(
            <ContactList contacts={[{id:1}]}
                         onEditContact={onEditContact}
                         onDeleteContact={onDeleteContact} />
        );
    });

    it("renders", function(){
        expect(component).toBeTruthy();
    });

    it("should call handleTextChanged on name input change", function(){
        TestUtils.Simulate.change(component.refs.search);
        expect(component.handleTextChanged).toHaveBeenCalled();
    });

    it("should call onEditContact when edit button is clicked", function(){
        TestUtils.Simulate.click(component.refs.edit);
        expect(onEditContact).toHaveBeenCalled();
    });

    it("should call onDeleteContact when delete button is clicked", function(){
        TestUtils.Simulate.click(component.refs.delete);
        expect(onDeleteContact).toHaveBeenCalled();
    });
});