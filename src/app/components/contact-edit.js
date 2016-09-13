import React, {
    Component,
    PropTypes,
} from 'react';

class EditContact extends Component {
    constructor(){
        super();
        this.state = {
            contact: {
                name: "",
                email: ""
            }
        };
    }

    saveContact(e){
        e.preventDefault();
        this.props.onSave(this.state.contact);
    }

    componentDidMount(){
        this.refs.name.focus();
    }

    componentWillMount(){
        this.setState({
            contact: Object.assign({}, this.state.contact, this.props.contact)
        });
    }

    nameChanged(e){
        this.state.contact.name = e.target.value;
        this.setState({
            contact: this.state.contact
        });
    }

    emailChanged(e){
        this.state.contact.email = e.target.value;
        this.setState({
            contact: this.state.contact
        });
    }

    isNameValid(){
        var contact = this.state.contact;
        return contact && contact.name && contact.name.trim().length > 0;
    }

    render() {
        return (
            <div>
                <h4>
                    Contact Details
                </h4>
                <hr />
                <form onSubmit={this.saveContact.bind(this)} ref="form">
                    <div className={"form-group" + (!this.isNameValid.bind(this)() && " has-error")}>
                        <label htmlFor="name">Name</label>
                        <input className="form-control" id="name" ref="name" type="text" value={this.state.contact.name} onChange={this.nameChanged.bind(this)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input className="form-control" id="email" ref="email" type="email" value={this.state.contact.email} onChange={this.emailChanged.bind(this)} />
                    </div>

                    <button className="btn btn-link" ref="cancel" onClick={this.props.onCancel} type="button">Cancel</button>
                    <button className="btn btn-primary" type="submit" disabled={!this.isNameValid.bind(this)()}><i className="glyphicon glyphicon-ok"></i> Save</button>
                </form>
            </div>
        );
    }
}

EditContact.propTypes = {
    contact: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

EditContact.defaultProps = {
    onSave: ()=>{},
    onCancel: ()=>{}
};

export default EditContact;