import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { countNotesforFolder } from '../notes-helpers/notes-helpers';
import NotesContext from '../NotesContext';

export default class NoteListSidebar extends Component {

    static contextType = NotesContext;

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
                                <span className='NoteListSidebar__num-notes'>
                                    {countNotesforFolder(notes, folder.id)}
                                </span>
                                {folder.name}
                            </NavLink>
                        </li>
                    )}
                </ul>
                <div className='NoteListSidebar__button-container'>
                    <button type='button'>Add Folder</button>
                </div>
            </div>
        );
    }
}