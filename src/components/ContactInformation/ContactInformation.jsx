import {Component} from 'react';

export class ContactInformation extends Component {
    render() {
        const {editContact, updateContactField} = this.props;

        return (
            <>
                <input
                    type="text"
                    onChange={e => updateContactField('firstName', e.target.value)}
                    value={editContact.firstName}
                />
                <input
                    type="text"
                    onChange={e => updateContactField('lastName', e.target.value)}
                    value={editContact.lastName}
                />
                <input
                    type="email"
                    onChange={e => updateContactField('email', e.target.value)}
                    value={editContact.email}
                />
                <input
                    type="tel"
                    onChange={e => updateContactField('phone', e.target.value)}
                    value={editContact.phone}
                />
            </>
        );
    }
}

export default ContactInformation;
