import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import userService from "../../services/userService";
import "./Signin.css";

export default function Signin({ setSignin }) {
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useContext(UserContext);

  console.log("Signin.js render");

  const toggleSignin = () => {
    setSignin(false);
  };

  const handleSignin = async (e) => {
    e.preventDefault();

    try {

      const email = e.currentTarget.email.value;
      const password = e.currentTarget.password.value;

      const credentials = {
        email,
        password
      };

      const response = await userService.authUser(credentials);

      // console.log(response);

      // Save the response to localStorage
      window.localStorage.setItem("loggedInUser", JSON.stringify(response));

      setUser(response.details);

    } catch (error) {
      console.log(error.response.data.message);
      setErrorMessage(error.response.data.message);
    }

  };

  return (
    <div className="container">
      <form className="signin-form" onSubmit={handleSignin}>
        <label>
          Email
          <br />
          <input name="email" type="email" placeholder="john.doe@email.com" required />
        </label>
        <label>
          Password
          <br />
          <input name="password" type="password" placeholder="Password" />
        </label>
        <span className="signin-form__redirect">
          Don't have an account?
          <span onClick={toggleSignin}>Create one</span>
        </span>
        <span className="error-message">{errorMessage}</span>
        <button className="signin-btn">
          Login
        </button>
      </form>
    </div>
  );
}
