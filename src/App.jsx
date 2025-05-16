import {Component} from 'react';
import './App.css';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
import {nanoid} from 'nanoid';

class App extends Component {
    state = {
        currentContact: {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        },
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

    saveContact = currentContact => {
        if (currentContact.id) {
            this.editContact(currentContact);
        } else {
            this.addContact(currentContact);
        }
    };

    editContact = currentContact => {
        this.setState(state => {
            const contacts = state.contacts.map(contact =>
                contact.id === state.currentContact.id
                    ? currentContact
                    : contact
            );
            this.saveLocaly(contacts);
            return {
                contacts,
            };
        });
    };

    addContact = currentContact => {
        const newContact = {
            ...currentContact,
            id: nanoid(),
        };
        this.setState(state => {
            const contacts = [...state.contacts, newContact];
            this.saveLocaly(contacts);
            const newState = {contacts, currentContact: this.getEmptyContact()};
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
                newState.currentContact = this.getEmptyContact();
            }
            this.saveLocaly(contacts);
            return newState;
        });
    };

    getEmptyContact = () => ({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });

    enterEditMode = contactId => {
        this.setState({
            currentContact: this.state.contacts.find(
                contact => contact.id === contactId
            ),
        });
    };

    exitEditMode = () => {
        this.setState({currentContact: this.getEmptyContact()});
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
                />

                <div className="btn-container">
                    <button onClick={this.exitEditMode}>New</button>
                </div>
            </>
        );
    }
}

export default App;
