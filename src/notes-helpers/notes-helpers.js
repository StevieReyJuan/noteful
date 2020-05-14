export const findFolder = (folders=[], folderId) => 
    folders.find(folder => folder.id === folderId)

export const findNote = (notes=[], noteId) =>
    notes.find(note => note.id === noteId)

export const getNotesforFolder = (notes=[], folderId) => (
    (!folderId)
    // if no folder Id provided, (default home list) return all notes
        ? notes
        : notes.filter(note => note.folderId === folderId)
        // return notes that have matching id
)

export const countNotesforFolder = (notes=[], folderId) =>
    notes.filter(note => note.folderId === folderId).length

export const getRandomHexString = () => {
    return [...Array(8)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}
