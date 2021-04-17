import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Blockly from "node-blockly/browser";
import { Button, Col, Row } from "react-bootstrap";
import { initializeScreen } from "../../api/Authentication";
import { saveScript } from "../../api/Designer";
import structures from "./customBlocks/structures";
import actions from "./customBlocks/actions";
import types from "./customBlocks/types";
import triggers from "./customBlocks/triggers";
import combatTactics from "./customBlocks/combatTactics";

import BlocklyDrawer, { Block, Category } from "react-blockly-drawer";

function EditorScreen() {
  const dispatch = useDispatch();
  var currentCode = "";
  const save = () => {
    console.log("save");
    console.log(currentCode);
    dispatch(
      saveScript({
        name: "tesztScript",
        content: currentCode,
      })
    );
  };

  useEffect(() => {
    dispatch(initializeScreen());
  }, []);

  return (
    <div className="Editor">
      <Row>
        <Col md={6}>
          <h1>blockly editor</h1>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <button className="btn btn-primary" onClick={save}>
            Save Script
          </button>
        </Col>
      </Row>
      <Row>
        <Col>
          <BlocklyDrawer
            tools={[
              ...structures,
              ...actions,
              ...triggers,
              ...types,
              ...combatTactics,
            ]}
            onChange={(code, workspace) => {
              //console.clear();
              console.log(code /*, workspace*/);
              currentCode = code;
            }}
            language={Blockly.JavaScript}
            appearance={{
              categories: {
                Structures: {
                  colour: "20",
                },
                Triggers: {
                  colour: "230",
                },
                Actions: {
                  colour: "290",
                },
                Types: {
                  colour: "180",
                },
                CombatTactics: {
                  colour: "0",
                },
              },
            }}
          >
            <Category name="Variables" custom="VARIABLE" />
            <Category name="Functions" custom="PROCEDURE"></Category>
            <Category name="Logic">
              <block type="controls_if"></block>
              <block type="logic_compare"></block>
              <block type="logic_operation"></block>
              <block type="logic_negate"></block>
              <block type="logic_boolean"></block>
              <block type="logic_null"></block>
              <block type="logic_ternary"></block>
            </Category>
            <Category name="Loops">
              <block type="controls_repeat_ext">
                <value name="TIMES">
                  <shadow type="math_number">
                    <field name="NUM">10</field>
                  </shadow>
                </value>
              </block>
              <block type="controls_whileUntil"></block>
              <block type="controls_for">
                <value name="FROM">
                  <shadow type="math_number">
                    <field name="NUM">1</field>
                  </shadow>
                </value>
                <value name="TO">
                  <shadow type="math_number">
                    <field name="NUM">10</field>
                  </shadow>
                </value>
                <value name="BY">
                  <shadow type="math_number">
                    <field name="NUM">1</field>
                  </shadow>
                </value>
              </block>
              <block type="controls_forEach"></block>
              <block type="controls_flow_statements"></block>
            </Category>
          </BlocklyDrawer>
        </Col>
      </Row>
    </div>
  );
}

export default EditorScreen;
