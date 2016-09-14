import { CONTACT_ACTIONS } from "./actions";
import * as actions from "./actions";
import "jasmine-ajax";

describe("actions", function(){
    jasmine.Ajax.install();
    describe("saveContact", function(){
        it("returns a saveContact action", function(){
            let action = actions.saveContact({});
            expect(action.type).toEqual(CONTACT_ACTIONS.SAVE_CONTACT);
        });
    });

    describe("loadContact", function(){
        it("returns a loadContact action", function(){
            let action = actions.loadContact();
            expect(action.type).toEqual(CONTACT_ACTIONS.LOAD_CONTACT);
        });
    });

    describe("createContact", function(){
        it("returns a createContact action", function(){
            let action = actions.createContact();
            expect(action.type).toEqual(CONTACT_ACTIONS.LOAD_CONTACT);
        });
    });

    describe("deleteContact", function(){
        it("returns a deleteContact action", function(){
            let action = actions.deleteContact();
            expect(action.type).toEqual(CONTACT_ACTIONS.DELETE_CONTACT);
        });
    });

    describe("requestContactList", function(){
        it("returns a requestContactList action", function(){
            let action = actions.requestContactList();
            expect(action.type).toEqual(CONTACT_ACTIONS.REQUEST_CONTACT_LIST);
        });
    });

    describe("modifyContact", function(){
        it("returns a modifyContact action", function(){
            let action = actions.modifyContact();
            expect(action.type).toEqual(CONTACT_ACTIONS.MODIFY_CONTACT);
        });
    });
});