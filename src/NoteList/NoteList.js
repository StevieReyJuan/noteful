import React from 'react';
import { Link } from 'react-router-dom';
import Note from '../Note/Note';

export default function NoteList(props) {
    return (
        <section className='NoteList'>
            <ul>
                {props.notes.map(note => 
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

NoteList.defaultProps = {
    notes: [],
}