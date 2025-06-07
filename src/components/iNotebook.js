import React, { useContext, useEffect, useState } from 'react';
import NoteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import './Addnote.css'; // Assuming styles for glassmorphism are here

const INotebook = ({ showAlert }) => {
  const { notes, getNotes, addNote } = useContext(NoteContext);

  const [note, setNote] = useState({ title: '', description: '', tag: '' });

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: '', description: '', tag: '' });
    showAlert("Note added successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1748188574118-896e39aa4d18?q=80&w=2604&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        padding: '30px 15px',
      }}
    >
      {/* Add Note Section */}
      <div className="addnote-bg d-flex justify-content-center align-items-center py-5">
        <div className="glass-card p-4" style={{ width: '100%', maxWidth: '600px' }}>
          <h2 className="text-center mb-4 text-white">Add a Note</h2>
          <form>
            <div className="mb-3">
              <label className="form-label text-black">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={note.title}
                onChange={onChange}
                minLength={5}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-black">Description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                value={note.description}
                onChange={onChange}
                minLength={5}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-black">Tag</label>
              <input
                type="text"
                className="form-control"
                name="tag"
                value={note.tag}
                onChange={onChange}
              />
            </div>
            <button
              disabled={note.title.length < 5 || note.description.length < 5}
              type="submit"
              className="btn btn-primary w-100"
              onClick={handleClick}
            >
              Add Note
            </button>
          </form>
        </div>
      </div>

      {/* Notes Section */}
      <div className="row my-5">
        <h2 className="text-center w-100 text-white">Your Notes</h2>
        <div className="container mx-2 text-white">
          {Array.isArray(notes) && notes.length === 0 && 'No Notes to display'}
        </div>

        {Array.isArray(notes) &&
          notes.map((note) => (
            <Noteitem key={note._id} note={note} showAlert={showAlert} />
          ))}
      </div>
    </div>
  );
};

export default INotebook;
