import {Component} from 'react';
import './FormControls.css';

export class FormControls extends Component {
    render() {
        const {inEditMode, exitEditMode, saveContact, deleteContact} =
            this.props;

        return (
            <>
                <div className="btn-container">
                    {' '}
                    <button onClick={exitEditMode}>New</button>{' '}
                </div>
                <div className="btn-container">
                    <button onClick={saveContact}>Save</button>
                </div>
                {inEditMode && (
                    <div className="btn-container">
                        <button
                            // to make sure arguments are empty and event aren't passed through
                            onClick={() => {
                                deleteContact();
                            }}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </>
        );
    }
}

export default FormControls;
