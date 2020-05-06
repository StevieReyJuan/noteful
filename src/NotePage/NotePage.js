import React from 'react';
import Note from '../Note/Note';

export default function NotePage(props) {
    return (
        <section className='NotePageMain'>
            <Note 
                id={props.note.id}
                name={props.note.name}
                // modified={props.note.modified}
            />
            <div className='NotePage__content'>
                {props.note.content.split(/\n \r|\n/).map((para, i) =>
                    <p key={i}>{para}</p>
                )}
            </div>
        </section>
    );
}

NotePage.defaultProps = {
    note: {
        content: ''
    }
}