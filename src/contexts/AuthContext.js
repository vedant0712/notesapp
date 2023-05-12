import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  isLoading: false,
  isError: false,
  message: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
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

// const REACT_APP_API_URL = "http://localhost:5000/users/";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const register = async (userData) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL_DEPLOY + "register", userData);
      dispatch({ type: "SET_USER", payload: response.data });
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: true });
      dispatch({ type: "SET_MESSAGE", payload: error.response.message });
    }
    dispatch({ type: "SET_LOADING", payload: false });
  };

  const login = async (userData) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL_DEPLOY + "login", userData);
      dispatch({ type: "SET_USER", payload: response.data });
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: true });
      dispatch({ type: "SET_MESSAGE", payload: error.response.data.message });
    }
    dispatch({ type: "SET_LOADING", payload: false });
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "SET_USER", payload: null });
    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({ type: "SET_ERROR", payload: false });
    dispatch({ type: "SET_MESSAGE", payload: "" });
  };

  return (
    <AuthContext.Provider
      value={{ ...state, register, login, logout, dispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
};
