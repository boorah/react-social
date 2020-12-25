import React, { useState } from "react";
import userService from "../../services/userService";
import classes from "./Signup.module.css";

export default function Signup({ setSignin }) {

  const [error, setError] = useState("");

  const toggleSignin = () => {
    setSignin(true);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {

      const name = e.currentTarget.name.value;
      const username = e.currentTarget.username.value;
      const email = e.currentTarget.email.value;
      const password = e.currentTarget.password.value;

      const user = {
        name,
        username,
        email,
        password
      };

      await userService.createUser(user);

      // render signin screen
      toggleSignin(true);

    } catch(error) {
      console.log(error);
      setError(error.response.data.message);
    }

  };

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={handleSignup}>
        <label>
          Name
          <br />
          <input name="name" type="text" placeholder="John Doe" required/>
        </label>
        <label>
          Username
          <br />
          <input name="username" type="text" placeholder="john12" required/>
        </label>
        <label>
          Email
          <br />
          <input name="email" type="email" placeholder="john.doe@email.com" required/>
        </label>
        <label>
          Password
          <br />
          <input name="password" type="password" placeholder="Minimum 8 characters" required/>
        </label>
        <span className={classes.redirect}>
          Already have an account?
          <span onClick={toggleSignin}>Signin</span>
        </span>
        {
          error ? <span className={classes.errorMessage}>{error}</span> : null
        }
        <button className={classes.formBtn}>
          Create
        </button>
      </form>
    </div>
  );
}
