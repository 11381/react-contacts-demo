import React, {
    Component,
    PropTypes,
} from 'react';

class FilterableContactList extends Component {
    constructor(){
        super();
        this.state = {
            searchText: ""
        };
    }

    getFilteredContacts(){
        var pattern = this.state.searchText.toLocaleLowerCase().trim();
        var contacts = this.props.contacts;
        return pattern.length ? contacts.filter(c => (c.firstName + c.lastName + c.email).toLowerCase().indexOf(pattern) != -1) : contacts
    }

    handleTextChanged(e){
        this.setState({
            searchText: e.target.value
        });
    }

    render()
    {
        return (
            <div>
                <input ref="search" className="form-control search-text" type="text" placeholder="Search..." onChange={this.handleTextChanged.bind(this)} />
                <ul className="list-group">
                    {this.getFilteredContacts().map(contact => {
                        return (
                            <li className="list-group-item" key={contact.id}>
                                <h5 className="list-group-item-heading">Name: {contact.firstName} {contact.lastName}</h5>
                                {
                                    contact.email &&
                                        <p>email: <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
                                }

                                <button type="button"
                                        className="btn btn-default"
                                        ref="edit"
                                        onClick={this.props.onEditContact.bind(this, contact)}>
                                    <i className="glyphicon glyphicon-edit"></i> Edit
                                </button>
                                <button type="button"
                                        className="btn btn-link pull-right"
                                        ref="delete"
                                        onClick={this.props.onDeleteContact.bind(this, contact)}>Delete
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

FilterableContactList.propTypes = {
    contacts: PropTypes.array.isRequired,
    onEditContact: PropTypes.func.isRequired,
    onDeleteContact: PropTypes.func.isRequired
};
FilterableContactList.defaultProps = {
    onEditContact: ()=>{},
    onDeleteContact: ()=>{}
};

export default FilterableContactList;
