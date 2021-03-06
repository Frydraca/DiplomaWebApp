import React from "react";
import { Dropdown } from "react-bootstrap";

function ScriptSelector(props) {
  const data = props.data;
  return (
    <div className="ScriptSelector">
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-user">
          {data.currentScript}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <>
            {data.scriptList.map((script, index) => (
              <Dropdown.Item
                onClick={() => data.scriptCallback(script)}
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
