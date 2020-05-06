import React from 'react';

export default function NotePageSidebar(props) {
    return (
        <div className='NotePageSidebar'>
            <button
                type='button'
                onClick={() => props.history.goBack()}
                className='NotePageSidebar__back-button'
            >
                Back
            </button>

            {props.folder && (
                <h3 className='NotePageSidebar__folder-name'>
                    {props.folder.name}
                </h3>
            )}
        </div>
    )
}

NotePageSidebar.defaultProps = {
    history : {
        goBack: () => {}
    }
}