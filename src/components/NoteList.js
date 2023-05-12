import React, { useState } from "react";
import Modal from "./Modal";

function NoteList({ notes, setActiveNote, setShowNoteForm ,deleteNote}) {
  const [hoveredNoteIndex, setHoveredNoteIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  function handleNoteClick(note) {
    setActiveNote(note);
    setShowNoteForm(true);
  }

  function handleNoteHover(index) {
    setHoveredNoteIndex(index);
  }

  function handleNoteLeave() {
    setHoveredNoteIndex(null);
  }

  function handleNoteDelete(note) {
    setSelectedNote(note); 
    setShowDeleteModal(true);
  }

  function handleConfirmDelete() {
    deleteNote(selectedNote._id)
    setShowDeleteModal(false);
  }

  function handleCancelDelete() {
    setShowDeleteModal(false); 
  }

  return (
    <>
      {notes &&
        notes.map((note, index) => (
          <div
            key={index}
            className="container note-item"
            onMouseEnter={() => handleNoteHover(index)}
            onMouseLeave={handleNoteLeave}
          >
            <div className="note-content">
              <h1 onClick={() => handleNoteClick(note)} className="btn">
                {note.title}
              </h1>
              <p>{note.content}</p>
            </div>
            {hoveredNoteIndex === index && (
              <button
                className="btn-delete"
                onClick={() => handleNoteDelete(note)}
              >
                X
              </button>
            )}
          </div>
        ))}
      {showDeleteModal && (
        <Modal
          title="Confirm Delete"
          message="Are you sure you want to delete this note?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
}

export default NoteList;
