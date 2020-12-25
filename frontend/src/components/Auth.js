import React, { useState } from "react";
import Signin from "../screens/Signin/Signin";
import Signup from "../screens/Signup/Signup";

export default function Auth() {
  const [signin, setSignin] = useState(true);

  return (
    signin ? <Signin setSignin={setSignin} /> : <Signup setSignin={setSignin}/>
  );
}