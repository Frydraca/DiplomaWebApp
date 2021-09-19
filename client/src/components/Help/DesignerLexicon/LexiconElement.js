import React from "react";
import "../../../App.css";

function LexiconElement(props) {
  return (
    <div className="LexiconElement">
      <div className="Title">{props.title}</div>
      <div classname="Image">Image</div>
      <div classname="Text">Explaining text</div>
    </div>
  );
}

export default LexiconElement;
