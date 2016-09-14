import { CONTACT_ACTIONS } from "./actions";
import { resolve, reject } from "./simple-promise";
import { DEFAULT_CONTACT } from "../models/contact";

export const DEFAULT_CONTACT_STATE = {
    error: undefined,
    saving: false,
    contact: DEFAULT_CONTACT
};

export const contact = (state = DEFAULT_CONTACT_STATE, action) => {
    switch(action.type){
        case CONTACT_ACTIONS.SAVE_CONTACT:
            return Object.assign({}, state, {
                saving: true
            });

        case resolve(CONTACT_ACTIONS.SAVE_CONTACT):
            return Object.assign({}, DEFAULT_CONTACT_STATE, {
                contact: action.payload
            });

        case reject(CONTACT_ACTIONS.SAVE_CONTACT):
            return Object.assign({}, state, {
                error: new Error(`Unable to save contact - ${action.payload}`)
            });

        case reject(CONTACT_ACTIONS.LOAD_CONTACT):
            return Object.assign({}, DEFAULT_CONTACT_STATE, {
                error: new Error(`Unable to load contact - ${action.payload}`)
            });

        case resolve(CONTACT_ACTIONS.LOAD_CONTACT):
            return Object.assign({}, DEFAULT_CONTACT_STATE, {
                contact: action.payload
            });

        case CONTACT_ACTIONS.MODIFY_CONTACT:
            return Object.assign({}, state, {
                contact: action.payload
            });

        default:
            return state;
    }
};

export const DEFAULT_CONTACT_LIST_STATE = {
    error: undefined,
    contacts: [],
    loading: false
};

export const contactList = (state = DEFAULT_CONTACT_LIST_STATE, action) => {
    switch(action.type){
        case CONTACT_ACTIONS.REQUEST_CONTACT_LIST:
            return Object.assign({}, state, {
                loading: true
            });

        case resolve(CONTACT_ACTIONS.REQUEST_CONTACT_LIST):
            return Object.assign({}, DEFAULT_CONTACT_LIST_STATE, {
                contacts: action.payload
            });

        case reject(CONTACT_ACTIONS.REQUEST_CONTACT_LIST):
            return Object.assign({}, DEFAULT_CONTACT_LIST_STATE, {
                error: new Error(`Unable to load contact list - ${action.payload}`)
            });

        case CONTACT_ACTIONS.DELETE_CONTACT:
            return Object.assign({}, state, {
                loading: true
            });

        case resolve(CONTACT_ACTIONS.DELETE_CONTACT):
            return Object.assign({}, state, {
                loading: false
            });

        case reject(CONTACT_ACTIONS.DELETE_CONTACT):
            return Object.assign({}, state, {
                loading: false,
                error: new Error(`Unable to delete contact - ${action.payload}`)
            });

        default:
            return state;
    }
};