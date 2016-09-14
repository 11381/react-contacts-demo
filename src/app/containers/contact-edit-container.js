import { connect } from 'react-redux';
import EditContact from "../components/contact-edit";
import { withRouter } from 'react-router';
import { DEFAULT_CONTACT } from "../models/contact";

import { saveContact, modifyContact, loadContact } from "../store/actions";

const mapStateToProps = (state) => {
    return state.contact;
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSave(contact){
            return dispatch(saveContact(contact))
                .then(() => {
                    ownProps.router.push("/");
                });
        },

        onCancel(){
            dispatch(modifyContact({}));
            ownProps.router.push("/");
        },

        onChange(contact){
            dispatch(modifyContact(contact));
        },

        onLoad(){
            if(ownProps.location.pathname.indexOf("/edit") == 0){
                dispatch(loadContact(ownProps.params.id));
            }else{
                dispatch(modifyContact(DEFAULT_CONTACT));
            }
        }
    }
};

const ContactEditContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(EditContact));

export default ContactEditContainer;