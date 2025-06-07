import React, { useState, useEffect } from 'react';
import NoteContext from './noteContext';

const NoteState = ({ children }) => {
  const host = "http://localhost:4000";
  const [notes, setNotes] = useState([]);

  // Fetch all notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token') // ✅ fixed
        }
      });

      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  // Add a new note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token') // ✅ fixed
        },
        body: JSON.stringify({ title, description, tag })
      });

      const newNote = await response.json();
      setNotes(prevNotes => [...prevNotes, newNote]); // ✅ safer
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token') // ✅ fixed
        }
      });

      const newNotes = notes.filter(note => note._id !== id);
      setNotes(newNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    try {
      await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token') // ✅ fixed
        },
        body: JSON.stringify({ title, description, tag })
      });

      const updatedNotes = notes.map(note =>
        note._id === id ? { ...note, title, description, tag } : note
      );
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteState;
