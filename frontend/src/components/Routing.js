import React from "react";
import {
  Route,
  Switch
} from "react-router-dom";

import Home from "../screens/Home/Home";
import Profile from "../screens/Profile/Profile";
import Comments from "../screens/Comments/Comments";
import Explore from "../screens/Explore/Explore";
import Followers from "./Followers";
import Following from "./Following";
import Update from "../screens/Update/Update";

export default function Routing() {
  return (
    <Switch>
      <Route path="/update" component={Update} />
      <Route path="/explore" component={Explore} />
      <Route path="/posts/:id" component={Comments} />
      <Route path="/profile/:username/update" component={Update} />
      <Route path="/profile/:username/followers" component={Followers} />
      <Route path="/profile/:username/following" component={Following} />
      <Route path="/profile/:username" component={Profile} />
      <Route path="/" component={Home} exact />
    </Switch>
  );
}
