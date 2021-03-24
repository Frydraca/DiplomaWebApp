import "./App.css";
import EditorScreen from "./components/editor";
import SimulatorScreen from "./components/simulator";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/editor">Editor</Link>
          </li>
          <li>
            <Link to="/simulator">Simulator</Link>
          </li>
        </ul>

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
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}
