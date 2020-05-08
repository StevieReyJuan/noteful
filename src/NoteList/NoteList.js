import React, { Component } from 'react';
import Note from '../Note/Note';
import NotesContext from '../NotesContext';
import { getNotesforFolder } from '../notes-helpers/notes-helpers'

export default class NoteList extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
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
                    <button className='AddNote' type='button'>Add Note</button>
                </div>
            </section>
        );
    }
}