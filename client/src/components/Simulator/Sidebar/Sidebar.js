import React from "react";
import { SidebarData } from "./SidebarData";
import SidebarRow from "./SidebarRow";
import ScriptSelector from "./ScriptSelector";
import TurnIncrementSelector from "./TurnIncrementSelector";

function Sidebar(props) {
  const {
    handleSimulate,
    handleStart,
    handleStop,
    handleGoToStart,
    handleGoToEnd,
    handleIncrementTurnToView,
    handleDecrementTurnToView,
  } = props.model;

  const ownScriptData = props.ownScriptData;
  const enemyScriptData = props.enemyScriptData;
  const turnIncrementData = props.turnIncrementData;

  function RowOnCLick(func) {
    switch (func) {
      case "simulate":
        return handleSimulate();
      case "run":
        return handleStart();
      case "stop":
        return handleStop();
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
        <ScriptSelector data={ownScriptData}></ScriptSelector>
        <ScriptSelector data={enemyScriptData}></ScriptSelector>
      </div>
      <div className="SidebarLine"></div>
      <TurnIncrementSelector data={turnIncrementData}></TurnIncrementSelector>
    </div>
  );
}

export default Sidebar;
