import React, { useState } from "react";
import userService from "../../services/userService";
import "./Signup.css";

export default function Signup({ setSignin }) {

  const [errorList, setErrorList] = useState([]);

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

      const response = await userService.createUser(user);
      console.log(response);

      // render signin screen
      toggleSignin(true);

    } catch(error) {
      console.log(error.response);
      const index = error.response.data.indexOf(":");
      const errors = error.response.data.slice(index+1).split(",");
      setErrorList(errors);
    }

  };

  return (
    <div className="container">
      <form className="signup-form" onSubmit={handleSignup}>
        <label>
          Name
          <br />
          <input name="name" type="text" placeholder="John Doe"/>
        </label>
        <label>
          Username
          <br />
          <input name="username" type="text" placeholder="john12"/>
        </label>
        <label>
          Email
          <br />
          <input name="email" type="email" placeholder="john.doe@email.com" required/>
        </label>
        <label>
          Password
          <br />
          <input name="password" type="password" placeholder="Minimum 8 chars"/>
        </label>
        <span className="signup-form__redirect">
          Already have an account?
          <span onClick={toggleSignin}>Signin</span>
        </span>
        {
          errorList.map((error, index) => <p key={index} className="error-message">{error}</p>)
        }
        <button className="signup-btn">
          Create
        </button>
      </form>
    </div>
  );
}
