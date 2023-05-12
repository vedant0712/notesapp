import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { BeatLoader } from "react-spinners";
import NoteList from "../components/NoteList";
import { FaPencilAlt } from "react-icons/fa";
import NoteForm from "../components/NoteForm";
import { useNotes } from "../contexts/NotesContext";

function Dashboard() {
  const { user, isLoading } = useAuth();
  const { notes, isNoteLoading, getNotes, addNote, updateNote, deleteNote ,isError,dispatch} =
    useNotes();
  const [activeNote, setActiveNote] = React.useState(null);
  const [showNoteForm, setShowNoteForm] = React.useState(false);

  useEffect(() => {
    if (user) {
      getNotes();
    }
  }, []);

  const handleAddButtonClick = () => {
    setShowNoteForm(true);
    setActiveNote(null);
  };

  if (isLoading && isNoteLoading) {
    return <BeatLoader size={15} color={"#123abc"} />;
  }

  if (!user) {
    return (
      <>
        <h1>
          Welcome to <span style={{ color: "#00fffb" }}>Notey</span>
        </h1>
        <h3>
          <span style={{ color: "#00fffb" }}>Your</span> super simplified notes
          app.
        </h3>
      </>
    );
  }

  return (
    <>
      <h1>
        Hello <span style={{ color: "#00fffb" }}>{user.name}</span>!
      </h1>
      {!showNoteForm ? (
        <>
          <button className="btn btn-reverse" onClick={handleAddButtonClick}>
            <FaPencilAlt /> Create Note
          </button>
          {notes.length === 0 ? (
            <div>You have no notes!</div>
          ) : (
            <NoteList
              notes={notes}
              deleteNote={deleteNote}
              setActiveNote={setActiveNote}
              setShowNoteForm={setShowNoteForm}
            />
          )}
        </>
      ) : (
        <NoteForm
          activeNote={activeNote}
          setActiveNote={setActiveNote}
          addNote={addNote}
          updateNote={updateNote}
          setShowNoteForm={setShowNoteForm}
          isError={isError}
          dispatch={dispatch}
        />
      )}
    </>
  );
}

export default Dashboard;
