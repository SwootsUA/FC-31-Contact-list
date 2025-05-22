import {Component} from 'react';
import './App.css';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
import {nanoid} from 'nanoid';

const EMPTY_CONTACT = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
};

class App extends Component {
    state = {
        currentContact: {...EMPTY_CONTACT},
        contacts: [],
    };

    componentDidMount() {
        const contacts = JSON.parse(localStorage.getItem('contacts'));

        if (contacts) {
            this.setState({
                contacts: contacts,
            });
        } else {
            this.setState({
                contacts: [],
            });
        }
    }

    saveLocaly(contacts) {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    saveContact = passedContact => {
        if (passedContact.id) {
            this.editContact(passedContact);
        } else {
            this.addContact(passedContact);
        }
    };

    editContact = passedContact => {
        this.setState(state => {
            const contacts = state.contacts.map(contact =>
                contact.id === state.currentContact.id
                    ? passedContact
                    : contact
            );
            this.saveLocaly(contacts);
            return {
                contacts,
            };
        });
    };

    addContact = passedContact => {
        const newContact = {
            ...passedContact,
            id: nanoid(),
        };
        this.setState(state => {
            const contacts = [...state.contacts, newContact];
            this.saveLocaly(contacts);
            const newState = {contacts, currentContact: {...EMPTY_CONTACT}};
            return newState;
        });
    };

    deleteContact = passedId => {
        this.setState(state => {
            const deleteId = passedId ? passedId : state.currentContact.id;
            const contacts = state.contacts.filter(
                contact => contact.id !== deleteId
            );
            const newState = {contacts};
            if (deleteId === state.currentContact.id) {
                newState.currentContact = {...EMPTY_CONTACT};
            }
            this.saveLocaly(contacts);
            return newState;
        });
    };

    enterEditMode = passedId => {
        this.setState({
            currentContact: this.state.contacts.find(
                contact => contact.id === passedId
            ),
        });
    };

    exitEditMode = () => {
        this.setState({currentContact: {...EMPTY_CONTACT}});
    };

    render() {
        return (
            <>
                <header>
                    <h1>Contact list</h1>
                </header>

                <ContactList
                    contacts={this.state.contacts}
                    enterEditMode={this.enterEditMode}
                    deleteContact={this.deleteContact}
                />

                <ContactForm
                    currentContact={this.state.currentContact}
                    saveContact={this.saveContact}
                    deleteContact={this.deleteContact}
                    EMPTY_CONTACT={EMPTY_CONTACT}
                />

                <div className="btn-container">
                    <button onClick={this.exitEditMode}>New</button>
                </div>
            </>
        );
    }
}

export default App;
