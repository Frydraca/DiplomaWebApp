import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthenticatedRoute } from "./routing/AuthenticatedRoute";
import NavMenu from "./components/Navigation/NavMenu";
import Padding from "./components/Navigation/Padding";
import EditorScreen from "./components/Designer";
import SimulatorScreen from "./components/Simulator/Simulator";
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
          <RulesScreen type="home" />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/gameRules/resources">
          <RulesScreen type="resources" />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/gameRules/buildings">
          <RulesScreen type="buildings" />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/gameRules/units">
          <RulesScreen type="units" />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/gameRules/upgrades">
          <RulesScreen type="upgrades" />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/designerHelp">
          <DesignerHelpScreen type="home" />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/designerHelp/structures">
          <DesignerHelpScreen type="structures" />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/designerHelp/actions">
          <DesignerHelpScreen type="actions" />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/designerHelp/triggers">
          <DesignerHelpScreen type="triggers" />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/designerHelp/types">
          <DesignerHelpScreen type="types" />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/designerHelp/combatTactics">
          <DesignerHelpScreen type="combatTactics" />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/designerHelp/unitTasks">
          <DesignerHelpScreen type="unitTasks" />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/designerHelp/research">
          <DesignerHelpScreen type="research" />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/designerHelp/trading">
          <DesignerHelpScreen type="trading" />
        </AuthenticatedRoute>
      </Router>
    </div>
  );
}
