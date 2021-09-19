import React from "react";
import { Dropdown } from "react-bootstrap";

function ScriptSelector(props) {
  return (
    <div className="ScriptSelector">
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-user">
          {props.currentScript}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <>
            {props.scriptList.map((script, index) => (
              <Dropdown.Item
                onClick={() => props.scriptCallback(script)}
                key={index}
              >
                {script.name}
              </Dropdown.Item>
            ))}
          </>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default ScriptSelector;
