import React, {
    Component,
    PropTypes,
} from 'react';

import SimpleError from "./simple-error";
import { DEFAULT_CONTACT, validate } from "../models/contact";

class EditContact extends Component {
    saveContact(e){
        e.preventDefault();
        this.props.onSave(this.props.contact);
    }

    componentDidMount(){
        this.props.onLoad();
    }

    firstNameChanged(e){
        this.onChange(Object.assign({}, this.props.contact, {
            firstName: e.target.value
        }));
    }

    lastNameChanged(e){
        this.onChange(Object.assign({}, this.props.contact, {
            lastName: e.target.value
        }));
    }

    emailChanged(e){
        this.onChange(Object.assign({}, this.props.contact, {
            email: e.target.value
        }));
    }

    onChange(contact){
        this.props.onChange(contact);
    }

    render() {
        let validations = validate(this.props.contact);
        let hasValidationErros = Object.keys(validations).length;

        return (
            <div>
                <h4>
                    Contact Details
                </h4>
                <hr />
                { this.props.error && <SimpleError error={this.props.error} /> }
                <form onSubmit={this.saveContact.bind(this)} ref="form">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className={"form-group" + (validations.name ? " has-error" : "")}>
                                <label htmlFor="name">First name</label>
                                <input autoFocus className="form-control" id="firstName" ref="firstName" type="text" value={this.props.contact.firstName} onChange={this.firstNameChanged.bind(this)} />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="name">Last name</label>
                                <input className="form-control" id="lastName" ref="lastName" type="text" value={this.props.contact.lastName} onChange={this.lastNameChanged.bind(this)} />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <div className={"form-group" + (validations.email ? " has-error": "")}>
                                <label htmlFor="email">Email</label>
                                <input className="form-control" id="email" ref="email" type="email" value={this.props.contact.email} onChange={this.emailChanged.bind(this)} />
                            </div>
                        </div>
                    </div>

                    <button className="btn btn-link" ref="cancel" onClick={this.props.onCancel} type="button">Cancel</button>
                    <button className="btn btn-primary" type="submit" disabled={hasValidationErros}><i className="glyphicon glyphicon-ok"></i> Save</button>
                </form>
            </div>
        );
    }
}

EditContact.propTypes = {
    contact: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

EditContact.defaultProps = {
    contact: DEFAULT_CONTACT,
    onSave: () => {},
    onChange: () => {},
    onCancel: () => {},
    onLoad: () => {}
};

export default EditContact;