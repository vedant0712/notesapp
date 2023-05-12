import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";

function Register() {
  const navigate = useNavigate();
  const { user, isLoading, isError, register, dispatch } = useAuth();
  const [registrationData, setRegistrationData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [recaptchaToken, setRecaptchaToken] = React.useState("");
  useEffect(() => {
    if (isError) {
      toast.error("Please enter valid credentials!", {
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
    setRegistrationData((prevRegistrationData) => {
      return {
        ...prevRegistrationData,
        [name]: value,
      };
    });
  }

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (registrationData.password === registrationData.confirmPassword) {
      await register({ ...registrationData, recaptchaToken });
    }
  }

  return (
    <div className="page">
      <h1 className="heading">Register</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Name:<span className="required">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            className="form-control"
            value={registrationData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>
            Email:<span className="required">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your e-mail"
            className="form-control"
            value={registrationData.email}
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
            placeholder="Enter your desired password"
            className="form-control"
            value={registrationData.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>
            Confirm Password:<span className="required">*</span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Re-enter your password"
            className="form-control"
            value={registrationData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <ReCAPTCHA
          className="g-recaptcha"
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
          onChange={handleRecaptchaChange}
        />
        <button className="btn btn-reverse" type="submit" disabled={isLoading}>
          Register
        </button>
      </form>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default Register;
