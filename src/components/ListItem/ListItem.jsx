import {Component} from 'react';
import './ListItem.css';

export class ListItem extends Component {
    render() {
        const {contact, enterEditMode, deleteContact} = this.props;

        return (
            <li onDoubleClick={() => enterEditMode(contact.id)}>
                {`${contact.firstName} ${contact.lastName}`}
                <button
                    className="delete-user-btn"
                    onClick={e => {
                        e.stopPropagation();
                        deleteContact(contact.id);
                    }}
                >
                    X
                </button>
            </li>
        );
    }
}

export default ListItem;
