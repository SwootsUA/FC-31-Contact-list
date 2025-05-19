import {Component} from 'react';
import './ContactForm.css';

export class ContactForm extends Component {
    state = {
        currentContact: {...this.props.currentContact},
    };

    onInputChange = e => {
        this.setState({
            currentContact: {
                ...this.state.currentContact,
                [e.target.name]: e.target.value,
            },
        });
    };

    clearContactField = e => {
        this.setState({
            currentContact: {
                ...this.state.currentContact,
                [e.target.parentElement.querySelector('input').name]: '',
            },
        });
    };

    static getDerivedStateFromProps(props, state) {
        if (state.currentContact.id !== props.currentContact.id) {
            return {currentContact: {...props.currentContact}};
        } else {
            return null;
        }
    }

    onFormSubmit = e => {
        e.preventDefault();
        this.props.saveContact(this.state.currentContact);
    };

    render() {
        const {deleteContact, inEdit} = this.props;

        return (
            <form onSubmit={this.onFormSubmit} className="contact-info">
                <div className="form-info">
                    <div className="input-wrapper">
                        <input
                            type="text"
                            placeholder="First name"
                            maxLength={25}
                            name="firstName"
                            onChange={this.onInputChange}
                            value={this.state.currentContact.firstName}
                            required
                        />
                        <button
                            type="button"
                            className="clear-info"
                            onClick={this.clearContactField}
                        >
                            X
                        </button>
                    </div>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            placeholder="Last name"
                            maxLength={25}
                            name="lastName"
                            onChange={this.onInputChange}
                            value={this.state.currentContact.lastName}
                            required
                        />
                        <button
                            type="button"
                            className="clear-info"
                            onClick={this.clearContactField}
                        >
                            X
                        </button>
                    </div>
                    <div className="input-wrapper">
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={this.onInputChange}
                            value={this.state.currentContact.email}
                        />
                        <button
                            type="button"
                            className="clear-info"
                            onClick={this.clearContactField}
                        >
                            X
                        </button>
                    </div>
                    <div className="input-wrapper">
                        <input
                            type="tel"
                            placeholder="Phone number"
                            maxLength={20}
                            name="phone"
                            onChange={this.onInputChange}
                            value={this.state.currentContact.phone}
                        />
                        <button
                            type="button"
                            className="clear-info"
                            onClick={this.clearContactField}
                        >
                            X
                        </button>
                    </div>
                </div>

                <div className="btn-container form-submit">
                    <button type="submit">Save</button>
                </div>

                {inEdit && (
                    <div className="btn-container form-delete">
                        <button
                            type="button"
                            // to make sure arguments are empty and event aren't passed through
                            onClick={() => {
                                deleteContact();
                            }}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </form>
        );
    }
}

export default ContactForm;
