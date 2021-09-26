import React from "react";
import { Dropdown } from "react-bootstrap";

function TurnIncrementSelector(props) {
  const data = props.data;
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-user">
          {data.currentTurnIncrementValue}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <>
            {data.turnIncrementList.map((value, index) => (
              <Dropdown.Item
                onClick={() => data.turnIncrementCallback(value)}
                key={index}
              >
                {value}
              </Dropdown.Item>
            ))}
          </>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default TurnIncrementSelector;
