import {Component} from 'react';

export class FormControls extends Component {
    render() {
        const {inEditMode, exitEditMode, saveContact, deleteContact} =
            this.props;

        return (
            <>
                <button onClick={exitEditMode}>New</button>
                <button onClick={saveContact}>Save</button>
                {inEditMode && <button onClick={deleteContact}>Delete</button>}
            </>
        );
    }
}

export default FormControls;
