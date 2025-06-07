import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/noteContext';

const Noteitem = ({ note, showAlert }) => {
  const { deleteNote, editNote } = useContext(NoteContext);

  const [updatedTitle, setUpdatedTitle] = useState(note.title);
  const [updatedDescription, setUpdatedDescription] = useState(note.description);
  const [updatedTag, setUpdatedTag] = useState(note.tag);

  const handleEdit = () => {
    editNote(note._id, updatedTitle, updatedDescription, updatedTag);
    document.getElementById(`closeModal-${note._id}`).click();
    showAlert("Note updated successfully", "success");
  };

  const handleDelete = () => {
    deleteNote(note._id);
    showAlert("Note deleted", "success");
  };

  const glassCardStyle = {
    backdropFilter: 'blur(12px)',
    background: 'rgba(0, 0, 0, 0.35)', // blackish tint
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '15px',
    padding: '20px',
    color: 'white',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.2s ease',
    width: '100%',
  };

  return (
    <>
      <div className="note-wrapper col-md-4 d-flex justify-content-center">
        <div style={glassCardStyle} className="my-3">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h5 className="mb-1">{note.title}</h5>
              <p>{note.description}</p>
            </div>
            <div>
              <i
                className="fa-solid fa-trash mx-2 text-danger"
                onClick={handleDelete}
                style={{ cursor: 'pointer' }}
              ></i>
              <i
                className="fa-regular fa-pen-to-square mx-2 text-primary"
                data-bs-toggle="modal"
                data-bs-target={`#editModal-${note._id}`}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setUpdatedTitle(note.title);
                  setUpdatedDescription(note.description);
                  setUpdatedTag(note.tag);
                }}
              ></i>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div className="modal fade" id={`editModal-${note._id}`} tabIndex="-1">
        <div className="modal-dialog">
          <div
            className="modal-content text-white"
            style={{
              backdropFilter: 'blur(15px)',
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '15px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div className="modal-header border-0">
              <h5 className="modal-title">Edit Note</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                id={`closeModal-${note._id}`}
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Title"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white'
                }}
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Description"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white'
                }}
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Tag"
                value={updatedTag}
                onChange={(e) => setUpdatedTag(e.target.value)}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white'
                }}
              />
            </div>
            <div className="modal-footer border-0">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button
                className="btn btn-primary"
                onClick={handleEdit}
                disabled={updatedTitle.length < 5 || updatedDescription.length < 5}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Noteitem;
