import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import NoteList from './NoteList/NoteList';
import NotePage from './NotePage/NotePage';
// import store from './store'
import './App.css';
import NoteListSidebar from './NoteListSidebar/NoteListSidebar';
import NotePageSidebar from './NotePageSidebar/NotePageSidebar';
import NotesContext from './NotesContext'



class App extends Component {
  state = {
    notes: [],
    folders: []
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
        console.error({error});
      });
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };
  
  renderNavRoutes() {

    return (
      //fragment
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            //change to component. No need for state or render routeProps
            component={NoteListSidebar}
          />
        ))}
        <Route 
          path="/note/:noteId"
          component={NotePageSidebar}
        />
        <Route path="/add-folder" component={NotePageSidebar} />
        <Route path="/add-note" component={NotePageSidebar} />
      </>  
    );
  }

  renderMainRoutes() {
    
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route 
            exact
            key={path}
            path={path}
            //change to component. No need for state or render routeProps
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
    }
    return (
      <NotesContext.Provider value={contextValue}>
        <div className="App">
          <nav className="App__nav">
            {this.renderNavRoutes()}
          </nav>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>
            </h1>
          </header>
          <main className="App__main">
            {this.renderMainRoutes()}
          </main>
        </div>
      </NotesContext.Provider>
    );
  }
  
}

export default App;
