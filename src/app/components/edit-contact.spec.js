import React from "react";
import TestUtils from 'react-addons-test-utils';
import EditContact from "./edit-contact";

describe("contact-edit", function(){
    var component = null;
    var contact = {
        firstName: "Q",
        lastName: "R",
        email: "q@q.q"
    };
    var onCancel = null;

    beforeEach(function() {
        spyOn(EditContact.prototype, "saveContact");
        spyOn(EditContact.prototype, "firstNameChanged");
        spyOn(EditContact.prototype, "lastNameChanged");
        spyOn(EditContact.prototype, "emailChanged");
        onCancel = jasmine.createSpy("onCancel");
        component = TestUtils.renderIntoDocument(<EditContact contact={contact} onCancel={onCancel} />);
    });

    it("renders", function(){
        expect(component).toBeTruthy();
    });

    it("should call save when submitted", function(){
        TestUtils.Simulate.submit(component.refs.form);
        expect(component.saveContact).toHaveBeenCalled();
    });

    it("should call firstNameChanged on name input change", function(){
        TestUtils.Simulate.change(component.refs.firstName);
        expect(component.firstNameChanged).toHaveBeenCalled();
    });

    it("should call lastNameChanged on name input change", function(){
        TestUtils.Simulate.change(component.refs.lastName);
        expect(component.lastNameChanged).toHaveBeenCalled();
    });

    it("should call emailChanged on name input change", function(){
        TestUtils.Simulate.change(component.refs.email);
        expect(component.emailChanged).toHaveBeenCalled();
    });

    it("should call onCancel when the cancel button is clicked", function(){
        TestUtils.Simulate.click(component.refs.cancel);
        expect(onCancel).toHaveBeenCalled();
    });

    it("should reflect the value of the firstName in the firstName field", function(){
        var fieldValue = component.refs.firstName.value;
        expect(fieldValue).toEqual(contact.firstName);
    });

    it("should reflect the value of the lastName in the lastName field", function(){
        var fieldValue = component.refs.lastName.value;
        expect(fieldValue).toEqual(contact.lastName);
    });

    it("should reflect the value of the email in the email field", function(){
        var fieldValue = component.refs.email.value;
        expect(fieldValue).toEqual(contact.email);
    });
});