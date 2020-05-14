import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NotesContext from '../NotesContext';
// import { format } from 'date-fns';
import PropTypes from 'prop-types';

export default class Note extends Component {
    static defaultProps = {
        onDeleteNote: () => {}
    }

    static propTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        modified: PropTypes.string,
        onDeleteNote: PropTypes.func
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
        const { name, id, modified } = this.props
        return (
            <div className='Note'>
                <h2 className='Note__title'>
                    <Link to={`/note/${id}`}>
                        {name}
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
                        Modified 
                        <span className='Date'> {modified}</span>
                    </div>
                </div>
            </div>
        );
    }
}