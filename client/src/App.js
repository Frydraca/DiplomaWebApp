import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthenticatedRoute } from "./routing/AuthenticatedRoute";
import NavMenu from "./components/Navigation/NavMenu";
import Padding from "./components/Navigation/Padding";
import EditorScreen from "./components/Designer";
import SimulatorScreen from "./components/Simulator";
import MapListScreen from "./components/Maps";
import ProfileScreen from "./components/Profile";
import StartingScreen from "./components/Authentication/StartingScreen";
import LoginScreen from "./components/Authentication/LoginScreen";
import RegisterScreen from "./components/Authentication/RegisterScreen";
import HelpScreen from "./components/Help/HelpScreen";
import RulesScreen from "./components/Help/RulesScreen";
import DesignerHelpScreen from "./components/Help/DesignerHelpScreen";

export default function App() {
  return (
    <div style={{ height: "100%" }}>
      <Router>
        <NavMenu />
        <Padding />
        <Route exact path="/" component={StartingScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <AuthenticatedRoute exact path="/mapList">
          <MapListScreen />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/designer/:id">
          <EditorScreen />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/simulator/:id">
          <SimulatorScreen />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/profile">
          <ProfileScreen />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/help">
          <HelpScreen />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/gameRules">
          <RulesScreen />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/designerHelp">
          <DesignerHelpScreen />
        </AuthenticatedRoute>
      </Router>
    </div>
  );
}
