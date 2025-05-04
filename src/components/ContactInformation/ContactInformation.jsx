import {Component} from 'react';
import './ContactInformation.css';

export class ContactInformation extends Component {
    render() {
        const {editContact, updateContactField} = this.props;

        return (
            <div className="contact-info">
                <div>
                    <input
                        type="text"
                        placeholder="First name"
                        onChange={e =>
                            updateContactField('firstName', e.target.value)
                        }
                        value={editContact.firstName}
                    />
                    <button className="clear-info" onClick={() => updateContactField('firstName', '')}>
                        X
                    </button>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Last name"
                        onChange={e =>
                            updateContactField('lastName', e.target.value)
                        }
                        value={editContact.lastName}
                    />
                    <button className="clear-info" onClick={() => updateContactField('lastName', '')}>
                        X
                    </button>
                </div>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={e =>
                            updateContactField('email', e.target.value)
                        }
                        value={editContact.email}
                    />
                    <button className="clear-info" onClick={() => updateContactField('email', '')}>
                        X
                    </button>
                </div>
                <div>
                    <input
                        type="tel"
                        placeholder="Phone number"
                        onChange={e =>
                            updateContactField('phone', e.target.value)
                        }
                        value={editContact.phone}
                    />
                    <button className="clear-info" onClick={() => updateContactField('phone', '')}>
                        X
                    </button>
                </div>
            </div>
        );
    }
}

export default ContactInformation;
