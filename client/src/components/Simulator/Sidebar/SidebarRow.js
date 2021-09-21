import React from "react";

function SidebarRow(props) {
  return (
    <>
      <div id="icon">{props.icon}</div>
      <div id="title">{props.title}</div>
    </>
  );
}

export default SidebarRow;
