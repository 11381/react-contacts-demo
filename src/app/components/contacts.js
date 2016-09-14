import React, { PropTypes, Component } from 'react';

import FilterableContactList from "./filterable-contact-list";
import SimpleError from "./simple-error";

class Contacts extends Component {
    componentDidMount(){
       this.props.onRequestList();
    }

    handleContactDelete(contact){
        this.props.onDelete(contact.id)
            .then(() => this.props.onRequestList());
    }

    render() {
        return (
            <div>
                {
                    this.props.error && <SimpleError error={this.props.error} />
                }
                <div>
                    <button type="button"
                            ref="add"
                            className="btn btn-default add-btn"
                            onClick={this.props.onCreate}><i className="glyphicon glyphicon-plus"></i> Add Contact</button>
                    <hr/>
                    {
                        this.props.contacts.length ?
                            (
                                <FilterableContactList contacts={this.props.contacts}
                                                       onEditContact={this.props.onEdit}
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
                </div>
            </div>
        );
    }
}

Contacts.propTypes = {
    onCreate: PropTypes.func,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onRequestList: PropTypes.func,
    contacts: PropTypes.array
};
Contacts.defaultProps = {
    onSave: () => {},
    onDelete: () => {},
    onCreate: () => {},
    onRequestList: () => {},
    contacts: []
};

export default Contacts;