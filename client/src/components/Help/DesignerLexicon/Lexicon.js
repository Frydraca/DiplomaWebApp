import React from "react";
import "../../../App.css";
import { LexiconData } from "./LexiconData";
import { LexiconElement } from "./LexiconElement";

function Lexicon(props) {
  return (
    <div className="DesignerLexicon">
      <ul className="DesignerLexiconList">
        {LexiconData.map((value, key) => {
          return (
            <li key={key} className="row">
              <LexiconElement></LexiconElement>
            </li>
          );
        })}
      </ul>
      {/* <div className="SidebarLine"></div> */}
    </div>
  );
}

export default Lexicon;
