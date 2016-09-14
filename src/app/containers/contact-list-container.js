import { connect } from 'react-redux';
import Contacts from "../components/contacts";
import { withRouter } from 'react-router';

import { createContact, requestContactList, deleteContact } from "../store/actions";

const mapStateToProps = (state) => {
    return state.contactList
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onEdit(contact){
            ownProps.router.push(`/edit/${contact.id}`);
        },

        onCreate(){
            dispatch(createContact());
            ownProps.router.push("/new");
        },

        onRequestList(){
            return dispatch(requestContactList());
        },

        onDelete(id){
            return dispatch(deleteContact(id));
        }
    }
};

const ContactListContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Contacts));

export default ContactListContainer;