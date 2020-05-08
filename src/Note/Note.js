import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NotesContext from '../NotesContext';

export default class Note extends Component {
    static defaultProps = {
        onDeleteNote: () => {}
    }

    static contextType = NotesContext;

    handleClickDelete = e => {
        e.preventDefault();
        const noteId = this.props.id;

        fetch(`http://localhost:9090/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok)
                return res.json().then(e => Promise.reject(e))
            return res.json()
        })
        .then(() => {
            this.context.deleteNote(noteId)
            // allow parent to perform extra behavior
            this.props.onDeleteNote(noteId)
        })
        .catch(error => {
            console.error({ error })
        })
    }

    render () {

        return (
            <div className='Note'>
                <h2 className='Note__title'>
                    <Link to={`/note/${this.props.id}`}>
                        {this.props.name}
                    </Link>
                </h2>
                <button 
                    className='Note__delete' 
                    type='button'
                    onClick={this.handleClickDelete}
                >
                    remove
                </button>
                <div className='Note__dates'>
                    <div className='Note__dates--modified'>
                        Modified <span className='Date'>(date modified)</span>
                    </div>
                </div>
            </div>
        );
    }
}