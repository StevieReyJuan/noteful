import React, { Component } from 'react';
import NotesContext from '../NotesContext';
import { getRandomHexString } from '../notes-helpers/notes-helpers';
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types';

class AddFolder extends Component {
    static contextType = NotesContext;

    // static defaultProps = {
    //     history: {
    //         goBack: () => {}
    //     }
    // }

    // static propTypes = {
    //     history: PropTypes.object
    // }

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            folderName: {
                value: '',
                touched: false
            }
        }
    }


    validateContent() {
        const name = this.state.folderName.value.trim();
        if(name.length === 0) {
            return 'Folder name cannot be blank'
        }
    }

    handleFolderNameUpdate = name => {
        this.setState({
            folderName: {value: name, touched: true}
        })
    }

    handleClickCancel = () => {
        this.props.history.goBack();
    }

    handleSubmit = e => {
        e.preventDefault();
        const randomFolderId = `${getRandomHexString()}-ffaf-11e8-8eb2-f2801f1b9fd1`

        const folder = {
            name: this.state.folderName.value,
            id: randomFolderId //duplicate ID results in error
        }
        
        this.setState({ error: null })
        fetch('http://localhost:9090/folders', {
            method: 'POST',
            body: JSON.stringify(folder),
            headers: {
                'content-type' : 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => {
                        throw error
                    })
                }
                return res.json()
            })
            .then(folder => {
                this.context.addFolder(folder)
                this.props.history.push('/')
            })
            .catch(error => {
                console.log(error);
                this.setState({ error })
            })
    }

    render() {
        return (
            <section className='AddFolder'>
                <h2>Add a new folder</h2>
                <form
                    className='AddFolder__form'
                    onSubmit={this.handleSubmit}
                >
                    <div className='AddFolder__error'>
                        {this.state.error && <p>{this.state.error.message}</p>}
                    </div>
                    <div>
                        <label htmlFor='name'>Folder Name</label>
                        <input 
                            type='text'
                            name='name'
                            id='name'
                            aria-label='folder-name'
                            aria-required='true'
                            placeholder='My New Folder'
                            onChange={e => this.handleFolderNameUpdate(e.target.value)}
                            required
                        />
                        {this.state.folderName.touched && (
                        <ValidationError message={this.validateContent()}/>)}
                    </div>
                    <div className='AddFolder__buttons'>
                        <button
                            type='button'
                            onClick={this.handleClickCancel}
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            onSubmit={this.handleSubmit}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </section>
        );
    }
}

export default AddFolder;

AddFolder.defaultProps = {
    history: {
        goBack: () => {}
    }
}

AddFolder.propTypes = {
    history: PropTypes.object
}