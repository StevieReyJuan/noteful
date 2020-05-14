import React, { Component } from 'react';
import { findNote, findFolder } from '../notes-helpers/notes-helpers';
import NotesContext from '../NotesContext';
import PropTypes from 'prop-types';

export default class NotePageSidebar extends Component {
    static defaultProps = {
        match: {
            params: {}
        },
        history: {
            goBack: () => {}
        }
    }

    static propTypes = {
        notes: PropTypes.arrayOf(PropTypes.shape({
            content: PropTypes.string,
            folderId: PropTypes.string,
            id: PropTypes.string,
            modified: PropTypes.string,
            name: PropTypes.string
        })),
        folders: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string
        })),
        noteId: PropTypes.string,
        goBack: PropTypes.func
    }

    static contextType = NotesContext;

    render() {

        const { notes=[], folders=[] } = this.context;
        const { noteId } = this.props.match.params;
        const note = findNote(notes, noteId) || {};
        const folder = findFolder(folders, note.folderId);

        return (
            <div className='NotePageSidebar'>
                <button
                    type='button'
                    onClick={() => this.props.history.goBack()}
                    className='NotePageSidebar__back-button'
                >
                    Back
                </button>

                {folder && (
                    <h3 className='NotePageSidebar__folder-name'>
                        {folder.name}
                    </h3>
                )}
            </div>
        )
    }
}