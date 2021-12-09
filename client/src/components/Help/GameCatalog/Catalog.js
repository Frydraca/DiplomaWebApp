import React from "react";
import { CatalogData } from "./CatalogData";

function Catalog(props) {
  return (
    <div className="DesignerCatalog">
      <ul className="DesignerCatalogList">
        {CatalogData.map((value, key) => {
          return (
            <li
              key={key}
              className="row"
              onClick={() => {
                window.location.pathname = value.link;
              }}
            >
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
