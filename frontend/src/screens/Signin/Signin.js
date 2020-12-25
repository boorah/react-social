import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import userService from "../../services/userService";
import classes from "./Signin.module.css";

export default function Signin({ setSignin }) {
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useContext(UserContext);

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
    <div className={classes.container}>
      <form className={classes.form} onSubmit={handleSignin}>
        <label>
          Email
          <br />
          <input name="email" type="email" placeholder="john.doe@email.com" required />
        </label>
        <label>
          Password
          <br />
          <input name="password" type="password" placeholder="Password" required/>
        </label>
        <span className={classes.redirect}>
          Don't have an account?
          <span onClick={toggleSignin}>Create one</span>
        </span>
        <span className={classes.errorMessage}>{errorMessage}</span>
        <button className={classes.formBtn}>
          Login
        </button>
      </form>
    </div>
  );
}
