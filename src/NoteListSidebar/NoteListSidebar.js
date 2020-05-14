import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { countNotesforFolder } from '../notes-helpers/notes-helpers';
import NotesContext from '../NotesContext';
import PropTypes from 'prop-types';

export default class NoteListSidebar extends Component {

    static contextType = NotesContext;

    static defaultProps = {
        notes: [],
        folders: []
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
    }

    render() {

        const { notes=[], folders=[] } = this.context;

        return (
            <div className='NoteListSidebar'>
                <ul className='NoteListSidebar__list'>
                    {folders.map(folder => 
                        <li key={folder.id}>
                            <NavLink
                                className='NoteListSidebar__folder-link'
                                to={`/folder/${folder.id}`}
                            >
                                {folder.name}
                                <span className='NoteListSidebar__num-notes'>
                                    {countNotesforFolder(notes, folder.id)}
                                </span>
                            </NavLink>
                        </li>
                    )}
                </ul>
                <div className='NoteListSidebar__button-container'>
                    <Link to='add-folder'>
                        <button type='button'>Add Folder</button>
                    </Link>
                </div>
            </div>
        );
    }
}