export const CONTACT_ACTIONS = {
    REQUEST_CONTACT_LIST: "REQUEST_CONTACT_LIST",
    LOAD_CONTACT: "LOAD_CONTACT",
    SAVE_CONTACT: "SAVE_CONTACT",
    DELETE_CONTACT: "DELETE_CONTACT",
    MODIFY_CONTACT: "MODIFY_CONTACT"
};
import {DEFAULT_CONTACT} from "../models/contact";

import ContactService from "../services/contact.service";
const contactService = new ContactService();

export const saveContact = (contact) => {
    return {
        type: CONTACT_ACTIONS.SAVE_CONTACT,
        payload: {
            promise: contactService.save(contact)
        }
    };
};

export const loadContact = (id) => {
    return {
        type: CONTACT_ACTIONS.LOAD_CONTACT,
        payload: {
            promise: contactService.getById(id)
        }
    };
};

export const createContact = () => {
    return {
        type: CONTACT_ACTIONS.LOAD_CONTACT,
        payload: DEFAULT_CONTACT
    };
};

export const deleteContact = (id) => {
    return {
        type: CONTACT_ACTIONS.DELETE_CONTACT,
        payload: {
            promise: contactService.delete(id)
        }
    };
};

export const requestContactList = () => {
    return {
        type: CONTACT_ACTIONS.REQUEST_CONTACT_LIST,
        payload: {
            promise: contactService.getAll()
        }
    };
};

export const modifyContact = (contact) => {
    return {
        type: CONTACT_ACTIONS.MODIFY_CONTACT,
        payload: Object.assign({}, DEFAULT_CONTACT, contact)
    };
};