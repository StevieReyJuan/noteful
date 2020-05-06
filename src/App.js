import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import NoteList from './NoteList/NoteList';
import NotePage from './NotePage/NotePage';
import store from './store'
import './App.css';
import NoteListSidebar from './NoteListSidebar/NoteListSidebar';
import { findNote, findFolder, getNotesforFolder } from './notes-helpers/notes-helpers';
import NotePageSidebar from './NotePageSidebar/NotePageSidebar';



class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    // fake date loading from API call
    setTimeout(() => this.setState(store), 600);
  }
  
  renderNavRoutes() {
    const { notes, folders } = this.state;

    return (
      //fragment
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => (
              <NoteListSidebar 
                folders={folders}
                notes={notes}
                {...routeProps}
              />
            )}
          />
        ))}
        <Route 
          path="/note/:noteId"
          render={routeProps => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId) || {};
            const folder = findFolder(folders, note.folderId);
            return <NotePageSidebar {...routeProps} folder={folder} />;
          }}
        />
        <Route path="/add-folder" component={NotePageSidebar} />
        <Route path="/add-note" component={NotePageSidebar} />
      </>  
    );
  }

  renderMainRoutes() {
    const { notes, folders } = this.state;
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route 
            exact
            key={path}
            path={path}
            render={routeProps => {
              const { folderId } = routeProps.match.params;
              const notesForFolder = getNotesforFolder(
                notes,
                folderId
              );
              return (
                <NoteList 
                  {...routeProps}
                  notes={notesForFolder}
                />
              );
            }}
          />
        ))}
        <Route 
          path="/note/:noteId"
          render={routeProps => {
            const { noteId } = routeProps.match.params;  
            const note = findNote(notes, noteId);        
            return <NotePage {...routeProps} note={note} />;
          }}
        />
      </>
    );
  }

  render () {
    return (
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
    );
  }
  
}

export default App;
