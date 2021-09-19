import React from "react";
import "../../../App.css";
import { CatalogData } from "./CatalogData";

function Catalog(props) {
  return (
    <div className="DesignerCatalog">
      <ul className="DesignerCatalogList">
        {CatalogData.map((value, key) => {
          return (
            <li key={key} className="row" onClick={() => {}}>
              <div id="icon">{value.icon}</div>
              <div id="title">{value.title}</div>
            </li>
          );
        })}
      </ul>
      {/* <div className="SidebarLine"></div> */}
    </div>
  );
}

export default Catalog;
