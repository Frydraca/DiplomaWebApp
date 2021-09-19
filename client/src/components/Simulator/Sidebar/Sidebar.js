import React from "react";
import "../../../App.css";
import { SidebarData } from "./SidebarData";
import ScriptSelector from "./ScriptSelector";

function Sidebar(props) {
  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        {SidebarData.map((value, key) => {
          return (
            <li key={key} className="row" onClick={() => {}}>
              <div id="icon">{value.icon}</div>
              <div id="title">{value.title}</div>
            </li>
          );
        })}
      </ul>
      <div className="SidebarLine"></div>
      <div className="ScriptSelectionList">
        <ScriptSelector
          currentScript={props.ownCurrentScript}
          scriptList={props.ownScriptList}
          scriptCallback={props.ownScriptCallback}
        ></ScriptSelector>
        <ScriptSelector
          currentScript={props.enemyCurrentScript}
          scriptList={props.enemyScriptList}
          scriptCallback={props.enemyScriptCallback}
        ></ScriptSelector>
      </div>
    </div>
  );
}

export default Sidebar;
