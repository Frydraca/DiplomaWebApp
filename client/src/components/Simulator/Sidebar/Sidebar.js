import React from "react";
import { SidebarData } from "./SidebarData";
import SidebarRow from "./SidebarRow";
import ScriptSelector from "./ScriptSelector";

function Sidebar(props) {
  const {
    handleSimulate,
    handleGoToStart,
    handleGoToEnd,
    handleIncrementTurnToView,
    handleDecrementTurnToView,
  } = props.model;

  function RowOnCLick(func) {
    switch (func) {
      case "simulate":
        return handleSimulate();
      case "next":
        return handleIncrementTurnToView();
      case "previous":
        return handleDecrementTurnToView();
      case "start":
        return handleGoToStart();
      case "end":
        return handleGoToEnd();
      default:
        return;
    }
  }

  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        {SidebarData.map((value, key) => {
          return (
            <li
              key={key}
              className="row"
              onClick={() => RowOnCLick(value.onClickFunction)}
            >
              <SidebarRow icon={value.icon} title={value.title}></SidebarRow>
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
