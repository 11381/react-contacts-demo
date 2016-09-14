import { CONTACT_ACTIONS } from "./actions";
import { resolve, reject } from "../store/simple-promise";
import * as reducers from "./reducers";

describe("reducers", function(){
    describe("contact reducer", function(){
        it("returns default state", function(){
            let action = {};
            let state = reducers.contact(undefined, action);
            expect(state).toEqual(reducers.DEFAULT_CONTACT_STATE);
        });

        it("returns the status on save", function(){
            let action = {
                type:CONTACT_ACTIONS.SAVE_CONTACT
            };
            let state = reducers.contact(undefined, action);
            expect(state.saving).toBeTruthy();
        });

        it("returns the contact on save resolve", function(){
            let action = {
                type: resolve(CONTACT_ACTIONS.SAVE_CONTACT),
                payload: { fakeContact: true }
            };
            let state = reducers.contact(undefined, action);
            expect(state.contact).toEqual(action.payload);
        });

        it("returns the error on save reject", function(){
            let action = {
                type: reject(CONTACT_ACTIONS.SAVE_CONTACT),
                payload: "the sky is falling"
            };
            let state = reducers.contact(undefined, action);
            expect(state.error).toEqual(new Error(`Unable to save contact - ${action.payload}`));
        });

        it("returns the error on load reject", function(){
            let action = {
                type: reject(CONTACT_ACTIONS.LOAD_CONTACT),
                payload: "the sky is falling"
            };
            let state = reducers.contact(undefined, action);
            expect(state.error).toEqual(new Error(`Unable to load contact - ${action.payload}`));
        });

        it("returns the contact on load resolve", function(){
            let action = {
                type: resolve(CONTACT_ACTIONS.LOAD_CONTACT),
                payload: { fakeContact: true }
            };
            let state = reducers.contact(undefined, action);
            expect(state.contact).toEqual(action.payload);
        });

        it("returns the contact on modify", function(){
            let action = {
                type: CONTACT_ACTIONS.MODIFY_CONTACT,
                payload: { fakeContact: true }
            };
            let state = reducers.contact(undefined, action);
            expect(state.contact).toEqual(action.payload);
        });
    });

    describe("contactList reducer", function(){
        it("returns the default state", function(){
            let action = {};
            let state = reducers.contactList(undefined, action);
            expect(state).toEqual(reducers.DEFAULT_CONTACT_LIST_STATE);
        });

        it("returns loading when requesting list", function(){
            let action = {
                type: CONTACT_ACTIONS.REQUEST_CONTACT_LIST
            };
            let state = reducers.contactList(undefined, action);
            expect(state.loading).toBeTruthy();
        });

        it("returns contact array when requesting list is resolved", function(){
            let action = {
                type: resolve(CONTACT_ACTIONS.REQUEST_CONTACT_LIST),
                payload: [{fakeContact:true}]
            };
            let state = reducers.contactList(undefined, action);
            expect(state.contacts).toEqual(action.payload);
        });

        it("returns the error when requesting list is rejected", function(){
            let action = {
                type: reject(CONTACT_ACTIONS.REQUEST_CONTACT_LIST),
                payload: "the sky is falling"
            };
            let state = reducers.contactList(undefined, action);
            expect(state.error).toEqual(new Error(`Unable to load contact list - ${action.payload}`));
        });

        it("returns the error when requesting list is rejected", function(){
            let action = {
                type: reject(CONTACT_ACTIONS.REQUEST_CONTACT_LIST),
                payload: "the sky is falling"
            };
            let state = reducers.contactList(undefined, action);
            expect(state.error).toEqual(new Error(`Unable to load contact list - ${action.payload}`));
        });

        it("returns loading when deleting a contact", function(){
            let action = {
                type: CONTACT_ACTIONS.DELETE_CONTACT
            };
            let state = reducers.contactList(undefined, action);
            expect(state.loading).toBeTruthy();
        });

        it("returns not loading when deleting a contact resolves", function(){
            let action = {
                type: resolve(CONTACT_ACTIONS.DELETE_CONTACT)
            };
            let state = reducers.contactList(undefined, action);
            expect(state.loading).toBeFalsy();
        });

        it("returns error when deleting a contact is rejected", function(){
            let action = {
                type: reject(CONTACT_ACTIONS.DELETE_CONTACT),
                payload: "the sky is falling"
            };
            let state = reducers.contactList(undefined, action);
            expect(state.error).toEqual(new Error(`Unable to delete contact - ${action.payload}`));
        });
    });
});