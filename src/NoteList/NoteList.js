import React, { Component } from 'react';
import Note from '../Note/Note';
import NotesContext from '../NotesContext';
import { getNotesforFolder } from '../notes-helpers/notes-helpers'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

export default class NoteList extends Component {

    // static defaultProps = {
    //     match: {
    //         params: {}
    //     },
    //     notes: []
    // }

    // static propTypes = {
    //     notes: PropTypes.arrayOf(PropTypes.shape({
    //         content: PropTypes.string,
    //         folderId: PropTypes.string,
    //         id: PropTypes.string,
    //         modified: PropTypes.string,
    //         name: PropTypes.string
    //     })),
    //     folderId: PropTypes.string
    // }

    static contextType = NotesContext

    render() {
        const { folderId } = this.props.match.params
        const { notes=[] } = this.context
        const notesForFolder = getNotesforFolder(notes, folderId)
        return (
            <section className='NoteList'>
                <ul>
                    {notesForFolder.map(note => 
                        <li key={note.id}>
                            <Note 
                                id={note.id}
                                name={note.name}
                                modified={note.modified}
                            />
                        </li>
                    )}
                </ul>
                <div className='NoteList__button-container'>
                    <Link to='/add-note'>
                        <button className='AddNote' type='button'>Add Note</button>
                    </Link> 
                </div>
            </section>
        );
    }
}

NoteList.defaultProps = {
    match: {
        params: {}
    },
    notes: []
}

NoteList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.string,
        folderId: PropTypes.string,
        id: PropTypes.string,
        modified: PropTypes.string,
        name: PropTypes.string
    })),
    folderId: PropTypes.string
}