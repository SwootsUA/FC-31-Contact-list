import {Component} from 'react';
import './App.css';
import ContactList from './components/ContactList/ContactList';
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

    saveContact = () => {
        if (this.state.inEditMode) {
            this.setState(state => {
                const contacts = state.contacts.map(contact =>
                    contact.id === state.editContact.id
                        ? state.editContact
                        : contact
                );
                this.saveLocaly(contacts);
                return {
                    contacts,
                };
            });
        } else {
            const newContact = {
                ...this.state.editContact,
                id: nanoid(),
            };
            this.setState(state => {
                const contacts = [...state.contacts, newContact];
                this.saveLocaly(contacts);
                return {
                    contacts,
                };
            });
            this.exitEditMode();
        }
    };

    deleteContact = passedId => {
        this.setState(state => {
            const deleteId = passedId ? passedId : state.editContact.id;
            const contacts = state.contacts.filter(
                contact => contact.id !== deleteId
            );
            if (deleteId === state.editContact.id) {
                this.exitEditMode();
            }
            this.saveLocaly(contacts);
            return {
                contacts,
            };
        });
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

                <ContactList
                    contacts={this.state.contacts}
                    enterEditMode={this.enterEditMode}
                    deleteContact={this.deleteContact}
                />

                <ContactInformation
                    inEditMode={this.state.inEditMode}
                    editContact={this.state.editContact}
                    updateContactField={this.updateContactField}
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
