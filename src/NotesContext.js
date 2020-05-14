import React from 'react';

const NotesContext = React.createContext({
    notes: [],
    folders: [],
    fetchError: null,
    deleteNote: () => {},
    addNote: () => {},
    addFolder: () => {}
});

export default NotesContext;