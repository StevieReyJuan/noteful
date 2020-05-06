import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { countNotesforFolder } from '../notes-helpers/notes-helpers';

export default function NoteListSidebar(props) {
    return (
        <div className='NoteListSidebar'>
            <ul className='NoteListSidebar__list'>
                {props.folders.map(folder => 
                    <li key={folder.id}>
                        <NavLink
                            className='NoteListSidebar__folder-link'
                            to={`/folder/${folder.id}`}
                        >
                            <span className='NoteListSidebar__num-notes'>
                                {countNotesforFolder(props.notes, folder.id)}
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

NoteListSidebar.defaultProps = {
    folders: []
}