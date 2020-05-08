import React, { Component } from 'react';
import Note from '../Note/Note';
import { findNote } from '../notes-helpers/notes-helpers';
import NotesContext from '../NotesContext';

export default class NotePage extends Component {
    static defaultProps = {
        match: {
            params: {}
        } 
    }
    static contextType = NotesContext;

    handleDeleteNote = noteId => {
        this.props.history.push(`/`)
    }

    render() {
        const { notes=[] } = this.context
        const { noteId } = this.props.match.params;
        const note = findNote(notes, noteId) || { content: '' };

        return (
            <section className='NotePageMain'>
                <Note 
                    id={note.id}
                    name={note.name}
                    // modified={props.note.modified}
                    onDeleteNote={this.handleDeleteNote}
                />
                <div className='NotePage__content'>
                    {note.content.split(/\n \r|\n/).map((para, i) =>
                        <p key={i}>{para}</p>
                    )}
                </div>
            </section>
        );
    }
}