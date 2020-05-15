import React, { Component } from 'react';
import Note from '../Note/Note';
import { findNote } from '../notes-helpers/notes-helpers';
import NotesContext from '../NotesContext';
import PropTypes from 'prop-types';

export default class NotePage extends Component {

    // static defaultProps = {
    //     match: {
    //         params: {}
    //     } 
    // }

    // static propTypes = {
    //     notes: PropTypes.arrayOf(PropTypes.shape({
    //         content: PropTypes.string,
    //         folderId: PropTypes.string,
    //         id: PropTypes.string,
    //         modified: PropTypes.string,
    //         name: PropTypes.string
    //     })),
    //     noteId: PropTypes.string
    // }

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
                    modified={note.modified}
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

NotePage.defaultProps = {
    match: {
        params: {}
    } 
}

NotePage.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.string,
        folderId: PropTypes.string,
        id: PropTypes.string,
        modified: PropTypes.string,
        name: PropTypes.string
    })),
    noteId: PropTypes.string
}