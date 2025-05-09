import {Component} from 'react';
import ListItem from '../ListItem/ListItem';
import './ContactList.css';

export class ContactList extends Component {
    render() {
        const {contacts, enterEditMode, deleteContact} = this.props;

        return (
            <div className="scroll-box">
                <ul>
                    {contacts.map(contact => (
                        <ListItem
                            contact={contact}
                            enterEditMode={enterEditMode}
                            key={contact.id}
                            deleteContact={deleteContact}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

export default ContactList;
