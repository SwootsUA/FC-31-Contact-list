import {Component} from 'react';
import './ContactInformation.css';

export class ContactInformation extends Component {
    render() {
        const {
            inEditMode,
            editContact,
            updateContactField,
            saveContact,
            deleteContact,
        } = this.props;

        return (
            <form
                onSubmit={e => {
                    e.preventDefault();
                    saveContact();
                }}
                className="contact-info"
            >
                <div className="form-info">
                    <div>
                        <input
                            type="text"
                            placeholder="First name"
                            maxLength={15}
                            onChange={e =>
                                updateContactField('firstName', e.target.value)
                            }
                            value={editContact.firstName}
                            required
                        />
                        <button
                            type="button"
                            className="clear-info"
                            onClick={() => updateContactField('firstName', '')}
                        >
                            X
                        </button>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Last name"
                            maxLength={15}
                            onChange={e =>
                                updateContactField('lastName', e.target.value)
                            }
                            value={editContact.lastName}
                            required
                        />
                        <button
                            type="button"
                            className="clear-info"
                            onClick={() => updateContactField('lastName', '')}
                        >
                            X
                        </button>
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                            onChange={e =>
                                updateContactField('email', e.target.value)
                            }
                            value={editContact.email}
                        />
                        <button
                            type="button"
                            className="clear-info"
                            onClick={() => updateContactField('email', '')}
                        >
                            X
                        </button>
                    </div>
                    <div>
                        <input
                            type="tel"
                            placeholder="Phone number"
                            maxLength={20}
                            onChange={e =>
                                updateContactField('phone', e.target.value)
                            }
                            value={editContact.phone}
                        />
                        <button
                            type="button"
                            className="clear-info"
                            onClick={() => updateContactField('phone', '')}
                        >
                            X
                        </button>
                    </div>
                </div>

                <div className="btn-container form-submit">
                    <button type="submit">Save</button>
                </div>

                {inEditMode && (
                    <div className="btn-container form-delete">
                        <button
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

export default ContactInformation;
