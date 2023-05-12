import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const initialState = {
  notes: [],
  isNoteLoading: false,
  isError: false,
  message: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTES":
      return {
        ...state,
        notes: action.payload,
      };
    case "ADD_NOTE":
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case "SET_LOADING":
      return {
        ...state,
        isNoteLoading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        isError: action.payload,
      };
    case "SET_MESSAGE":
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

// const REACT_APP_NOTES_API_URL = "http://localhost:5000/notes/";

const NotesContext = createContext();

export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useAuth();

  const getNotes = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await axios.get(process.env.REACT_APP_NOTES_API_URL_DEPLOY, {
        headers: {
          Authorization: `Bearer ${user.token}`, 
        },
      });
      dispatch({ type: "SET_NOTES", payload: response.data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: true });
      dispatch({ type: "SET_MESSAGE", payload: error.response.data.message });
    }
    dispatch({ type: "SET_LOADING", payload: false });
  };

  const addNote = async (noteData) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await axios.post(process.env.REACT_APP_NOTES_API_URL_DEPLOY, noteData, {
        headers: {
          Authorization: `Bearer ${user.token}`, 
        },
      });
      dispatch({ type: "SET_NOTES", payload: [response.data, ...state.notes] });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: true });
      dispatch({ type: "SET_MESSAGE", payload: error.response.data.message });
    }
    dispatch({ type: "SET_LOADING", payload: false });
  };

  const updateNote = async (noteId, updatedNote) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await axios.put(`${process.env.REACT_APP_NOTES_API_URL_DEPLOY}${noteId}`, updatedNote, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch({
        type: "SET_NOTES",
        payload: state.notes.map((note) =>
          note._id === noteId ? response.data : note
        ),
      });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: true });
      dispatch({ type: "SET_MESSAGE", payload: error.response.data.message });
    }
    dispatch({ type: "SET_LOADING", payload: false });
  };

  const deleteNote = async (noteId) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await axios.delete(`${process.env.REACT_APP_NOTES_API_URL_DEPLOY}${noteId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      dispatch({
        type: "SET_NOTES",
        payload: state.notes.filter((n) => n._id !== noteId),
      });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: true });
      dispatch({ type: "SET_MESSAGE", payload: error.response.data.message });
    }
    dispatch({ type: "SET_LOADING", payload: false });
  };

  return (
    <NotesContext.Provider
      value={{ ...state, getNotes, addNote, updateNote, deleteNote }}
    >
      {children}
    </NotesContext.Provider>
  );
};
