import React, { useEffect, useContext } from "react";
import { UserContext } from "./context/UserContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Routing from "./components/Routing";
import Auth from "./components/Auth";

import "./App.css";

export default function App() {

  const { user, setUser } = useContext(UserContext);

  console.log("App.js rendered!", user);

  useEffect(() => {
    console.log("App.js, useEffect");
    const result = window.localStorage.getItem("loggedInUser");

    // If the user is already logged in, details are present in localStorage
    if (result) {
      console.log("Already logged in");

      const parsed = JSON.parse(result);
      setUser(parsed.details);
    }

  }, [setUser]);

  return (
    <>
      <Header />
      { user ? <Routing /> : <Auth />}
      <Footer />
    </>
  );
}
