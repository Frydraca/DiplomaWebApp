import React from "react";

function SidebarHoverRow(props) {
  return (
    <>
      <div id="icon">{props.icon}</div>
      <div id="stat">{props.stat}</div>
      <div id="data">{props.data}</div>
    </>
  );
}

export default SidebarHoverRow;
