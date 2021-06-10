import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Starred from "./pages/Starred";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/starred">
        <Starred />
      </Route>

      <Route>
        <div>ERROR 404 Not Found.</div>
      </Route>
    </Switch>
  );
}

export default App;
