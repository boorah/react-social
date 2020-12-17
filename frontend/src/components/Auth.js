import React, { useState } from "react";
import Signin from "../components/Signin/Signin";
import Signup from "../components/Signup/Signup";

export default function Auth() {
  const [signin, setSignin] = useState(true);

  return (
    signin ? <Signin setSignin={setSignin} /> : <Signup setSignin={setSignin}/>
  );
}