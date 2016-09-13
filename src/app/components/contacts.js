import React, { Component } from 'react';

import EditContact from "./contact-edit";
import FilterableContactList from "./contact-list-filterable";
import SimpleError from "./simple-error";
import ContactService from "../services/contact.service";

class Contacts extends Component {
    constructor(){
        super();
        this.state = {
            contacts: [],
            editContact: null
        };

        this.contacts = new ContactService();
        this.timer = null;
    }

    componentDidMount(){
       this.refreshContacts();
    }

    refreshContacts(){
        return this.contacts.getAll()
            .then(contacts => {
                this.setState({
                    contacts: contacts
                });
            });
    }

    handleContactEdit(contact){
        this.setState({
            editContact: contact
        });
    }

    handleContactDelete(contact){
        this.contacts.delete(contact.id)
            .then(() => this.refreshContacts())
            .catch(e => this.handleError(e));
    }

    saveContact(contact){
        this.contacts.save(contact)
            .then(() => this.refreshContacts())
            .then(() => this.stopEditing())
            .catch(e => this.handleError(e));
    }

    stopEditing(){
        this.setState({
            editContact: null
        });
    }

    handleError(error){
        console.error(error);
        this.setState({
            error: error.toString()
        });
        if(this.timer){
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => this.setState({ error: null }), 10*1000);
    }

    handleAddContact(){
        this.setState({
            editContact: { }
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.error && <SimpleError error={this.state.error}><p>Unable to complete action</p></SimpleError>
                }
                {
                    this.state.editContact ?
                        // Is editing
                        ( <EditContact contact={this.state.editContact}
                                       onCancel={this.stopEditing.bind(this)}
                                       onSave={this.saveContact.bind(this)} /> )
                        : //Else
                        (
                            <div>
                                <button type="button"
                                        ref="add"
                                        className="btn btn-default add-btn"
                                        onClick={this.handleAddContact.bind(this)}><i className="glyphicon glyphicon-plus"></i> Add Contact</button>
                                <hr/>
                                {
                                    this.state.contacts.length ?
                                        (
                                            <FilterableContactList contacts={this.state.contacts}
                                                                   onEditContact={this.handleContactEdit.bind(this)}
                                                                   onDeleteContact={this.handleContactDelete.bind(this)} />
                                        )
                                        :
                                        (
                                            <div className="jumbotron">
                                                <h1>Empty nest</h1>
                                                <p>
                                                    There doesn't appear to be any contacts in your list, you should consider adding some.
                                                </p>
                                            </div>
                                        )
                                }
                            </div>)
                }
            </div>
        );
    }
}

export default Contacts;