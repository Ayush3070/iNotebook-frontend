import React, { useContext, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';

const Notes = ({ showAlert }) => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1748188574118-896e39aa4d18?q=80&w=2604&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '30px 15px',
      }}
    >
      <Addnote showAlert={showAlert} />

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

export default Notes;
