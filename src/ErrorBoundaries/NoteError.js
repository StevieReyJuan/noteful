import React, { Component } from 'react';
import NotesContext from '../NotesContext';

class NoteError extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    static contextType = NotesContext;

    render() {
        if(this.state.hasError) {
            return (
                <h2>Could not display notes.</h2>
            );
        }
        else if(this.context.fetchError) {
            return (<h2>Unable retrieve notes from server. Please try again.</h2>)
        }
        return this.props.children; 
    }
}

export default NoteError;