import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const { user, login, isError, dispatch } = useAuth();
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isError) {
      toast.error("Invalid username or password!", {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch({ type: "SET_ERROR", payload: false });
    }
    if (user) {
      navigate("/");
    }
  }, [isError, user]);

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginData((prevLoginData) => {
      return {
        ...prevLoginData,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await login(loginData);
  }

  return (
    <div className="page">
      <h1 className="heading">Login</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Email:<span className="required">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your e-mail"
            value={loginData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>
            Password:<span className="required">*</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={loginData.password}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-reverse" type="submit">
          Login
        </button>
      </form>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default Login;
