import {Component} from 'react';
import ListItem from '../ListItem/ListItem';

export class ContactList extends Component {
    render() {
        const {contacts, enterEditMode} = this.props;

        return (
            <>
                <p>Contact List</p>
                <ul>
                    {contacts.map(contact => (
                        <ListItem
                            contact={contact}
                            enterEditMode={enterEditMode}
                            key={contact.id}
                        />
                    ))}
                </ul>
            </>
        );
    }
}

export default ContactList;
