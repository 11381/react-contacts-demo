import React from "react";
import TestUtils from 'react-addons-test-utils';
import EditContact from "./contact-edit";

describe("contact-edit", function(){
    var component = null;
    var contact = {
        name: "Q",
        email: "q@q.q"
    };
    var onCancel = null;

    beforeEach(function() {
        spyOn(EditContact.prototype, "saveContact");
        spyOn(EditContact.prototype, "nameChanged");
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

    it("should call nameChanged on name input change", function(){
        TestUtils.Simulate.change(component.refs.name);
        expect(component.nameChanged).toHaveBeenCalled();
    });

    it("should call emailChanged on name input change", function(){
        TestUtils.Simulate.change(component.refs.email);
        expect(component.emailChanged).toHaveBeenCalled();
    });

    it("should call onCancel when the cancel button is clicked", function(){
        TestUtils.Simulate.click(component.refs.cancel);
        expect(onCancel).toHaveBeenCalled();
    });

    it("should reflect the value of the name in the name field", function(){
        var fieldValue = component.refs.name.value;
        expect(fieldValue).toEqual(contact.name);
    });

    it("should reflect the value of the email in the email field", function(){
        var fieldValue = component.refs.email.value;
        expect(fieldValue).toEqual(contact.email);
    });
});