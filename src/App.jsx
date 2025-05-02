import {Component} from 'react';
import './App.css';
import ContactList from './components/ContactList/ContactList';
import FormControls from './components/FormControls/FormControls';
import ContactInformation from './components/ContactInformation/ContactInformation';
import {nanoid} from 'nanoid';

class App extends Component {
    state = {
        inEditMode: false,
        editContact: {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        },
        contacts: [
            {
                id: nanoid(),
                firstName: 'Kostiantyn',
                lastName: 'Zakharchenko',
                email: 'kostya20022210@gmail.com',
                phone: '+380951231231',
            },
            {
                id: nanoid(),
                firstName: 'John',
                lastName: 'Doe',
                email: 'johndoe@gmail.com',
                phone: '+380988888888',
            },
        ],
    };

    saveContact = () => {
        if (this.state.inEditMode) {
            this.setState({
                contacts: this.state.contacts.map(contact =>
                    contact.id === this.state.editContact.id
                        ? this.state.editContact
                        : contact
                ),
            });
        } else {
            const newContact = {
                ...this.state.editContact,
                id: nanoid(),
            };
            this.setState({
                contacts: [...this.state.contacts, newContact],
            });
            this.exitEditMode();
        }
    };

    deleteContact = () => {
        this.setState({
            contacts: this.state.contacts.filter(
                contact => contact.id !== this.state.editContact.id
            ),
        });
        this.exitEditMode();
    };

    enterEditMode = contactId => {
        this.setState({
            inEditMode: true,
            editContact: this.state.contacts.find(
                contact => contact.id === contactId
            ),
        });
    };

    exitEditMode = () => {
        this.setState({
            inEditMode: false,
            editContact: {
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
            },
        });
    };

    updateContactField = (field, value) => {
        this.setState({
            editContact: {
                ...this.state.editContact,
                [field]: value,
            },
        });
    };

    render() {
        return (
            <>
                <header>
                    <h1>Contact list</h1>
                </header>

                <main>
                    <ContactList
                        contacts={this.state.contacts}
                        enterEditMode={this.enterEditMode}
                    />
                    <ContactInformation
                        editContact={this.state.editContact}
                        updateContactField={this.updateContactField}
                    />
                </main>

                <FormControls
                    inEditMode={this.state.inEditMode}
                    saveContact={this.saveContact}
                    exitEditMode={this.exitEditMode}
                    deleteContact={this.deleteContact}
                />
            </>
        );
    }
}

export default App;
