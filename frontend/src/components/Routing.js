import React from "react";
import {
  Route,
  Switch
} from "react-router-dom";

import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import PostDetail from "./PostDetail/PostDetail";

export default function Routing() {
  return (
    <Switch>
      <Route path="/posts/:id" component={PostDetail} />
      <Route path="/profile/:user" component={Profile} />
      <Route path="/" component={Home} exact />
    </Switch>
  );
}
