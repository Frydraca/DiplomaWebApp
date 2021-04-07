import "./App.css";
import NavMenu from "./components/Navigation/NavMenu";
import EditorScreen from "./components/editor";
import SimulatorScreen from "./components/simulator";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <div style={{ height: "100%" }}>
      <Router>
        <NavMenu />
        <div>
          <hr />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/editor">
              <EditorScreen />
            </Route>
            <Route path="/simulator">
              <SimulatorScreen />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}
