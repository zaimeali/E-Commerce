import React from "react";

// React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  );
}
