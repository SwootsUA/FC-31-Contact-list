import {Component} from 'react';

export class ListItem extends Component {
    render() {
        const {contact, enterEditMode} = this.props;

        return (
            <li onClick={() => enterEditMode(contact.id)}>
                {`${contact.firstName} ${contact.lastName}`}
                <button>X</button>
            </li>
        );
    }
}

export default ListItem;
