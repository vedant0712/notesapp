import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNotes } from "../contexts/NotesContext";

function NoteForm({
  activeNote,
  setActiveNote,
  addNote,
  updateNote,
  setShowNoteForm,
}) {
  const { isNoteLoading } = useNotes();
  const [noteData, setNoteData] = React.useState({
    title: "",
    content: "",
  });
  React.useEffect(() => {
    if (activeNote) {
      setNoteData({ title: activeNote.title, content: activeNote.content });
    }
  }, [activeNote]);

  function handleChange(e) {
    const { name, value } = e.target;
    setNoteData((prevNoteData) => {
      return {
        ...prevNoteData,
        [name]: value,
      };
    });
  }

  function handleClose() {
    setActiveNote(null);
    setShowNoteForm(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    e.preventDefault();
    if (noteData.title.trim() === "" || noteData.content.trim() === "") {
      toast.error("Please add a title and content for the note.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    if (activeNote) {
      updateNote(activeNote._id, noteData);
      setActiveNote(null);
    } else {
      addNote(noteData);
    }
    setShowNoteForm(false);
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Title:<span className="required">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Title"
            name="title"
            value={noteData.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>
            Content:<span className="required">*</span>
          </label>
          <textarea
            placeholder="Enter Content"
            name="content"
            className="form-group textarea-resizable"
            value={noteData.content}
            onChange={handleChange}
          />
        </div>
        <div className="btn-container">
          <button className="btn btn-close" onClick={handleClose}>
            Close
          </button>
          <button
            className="btn btn-reverse"
            type="submit"
            disabled={isNoteLoading}
          >
            {activeNote ? "Update Note" : "Create Note"}
          </button>
        </div>
      </form>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default NoteForm;
