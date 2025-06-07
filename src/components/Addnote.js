import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/noteContext';
import './Addnote.css';

const Addnote = ({ showAlert }) => {
  const { addNote } = useContext(NoteContext);
  const [note, setNote] = useState({ title: '', description: '', tag: '' });

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
    <div className="addnote-bg d-flex justify-content-center align-items-center py-5">
      <div className="glass-card p-4" style={{ width: '100%', maxWidth: '600px' }}>
        <h2 className="text-center mb-4 text-white">Add a Note</h2>
        <form>
          <div className="mb-3" style={{ color: ' #2c003e' }}>
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
          <div className="mb-3" style={{ color: ' #2c003e' }}>
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
          <div className="mb-3" style={{ color: ' #2c003e' }}>
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
  );
};

export default Addnote;
