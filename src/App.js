import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import NoteList from './NoteList/NoteList';
import NotePage from './NotePage/NotePage';
import './App.css';
import NoteListSidebar from './NoteListSidebar/NoteListSidebar';
import NotePageSidebar from './NotePageSidebar/NotePageSidebar';
import NotesContext from './NotesContext';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import FolderError from './ErrorBoundaries/FolderError';
import NoteError from './ErrorBoundaries/NoteError';



class App extends Component {
  state = {
    notes: [],
    folders: [],
    error: null
  };

  componentDidMount() {
    Promise.all([
      fetch('http://localhost:9090/notes'),
      fetch('http://localhost:9090/folders')
    ])
      .then(([notesRes, foldersRes]) => {
        if(!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e));
        if(!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({notes, folders})
      })
      .catch(error => {
        console.log(error);
        this.setState({ error });
      });
  }

  handleDeleteNote = noteId => {
    this.setState({
      // set state of notes array with new array consisting of 
      // any note.id in notes array that does not match argument of noteId
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  handleAddFolder = folder => {
    this.setState({
      folders: [ ...this.state.folders, folder]
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [ ...this.state.notes, note]
    })
  }
  
  renderNavRoutes() {

    return (
      //fragment
      <>
        {['/', '/folder/:folderId'].map(path => (
          // make a <Route> for '/' and a dynamic route for '/:folderId' 
          <Route
            exact
            key={path}
            path={path}
            component={NoteListSidebar}
          />
        ))}
        <Route 
          path="/note/:noteId"
          component={NotePageSidebar}
        />

        <Route path="/add-folder" component={AddFolder} />
        <Route path="/add-note" component={AddNote} />
      </>  
    );
  }

  renderMainRoutes() {
    
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          // make a <Route> for '/' and a dynamic route for '/:folderId' 
          <Route 
            exact
            key={path}
            path={path}
            component={NoteList}
          />
        ))}
        <Route 
          path="/note/:noteId"
          component={NotePage}
        />
      </>
    );
  }

  render () {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addNote: this.handleAddNote,
      addFolder: this.handleAddFolder,
      fetchError: this.state.error
    }
    // if (this.state.error) {
    //   return (<h2>Unable to connect to the server. Please try again.</h2>)
    // }
    return (
      <NotesContext.Provider value={contextValue}>
        <div className="App">
          <FolderError>
            <nav className="App__nav">
              {this.renderNavRoutes()}
            </nav>
          </FolderError>
            <header className="App__header">
              <h1>
                <Link to="/">Noteful</Link>
              </h1>
            </header>
          <NoteError>
            <main className="App__main">
              {this.renderMainRoutes()}
            </main>
          </NoteError>
        </div>
      </NotesContext.Provider>
    );
  }
  
}

export default App;
