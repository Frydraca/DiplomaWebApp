import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blockly from "node-blockly/browser";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { initializeScreen } from "../../api/Authentication";
import { createScript, updateScript, loadScript } from "../../api/Designer";
import structures from "./customBlocks/structures";
import actions from "./customBlocks/actions";
import types from "./customBlocks/types";
import triggers from "./customBlocks/triggers";
import combatTactics from "./customBlocks/combatTactics";
import ScriptSaveModal from "./ScriptSaveModal";
import { changeEditedScript } from "../../store/Script";

import BlocklyDrawer, { Category } from "react-blockly-drawer";

function EditorScreen() {
  var { id } = useParams();
  const dispatch = useDispatch();
  var blocklyCode = "";
  var blocklyWorkspace = "";

  const [show, setShow] = useState(false);

  const handleClose = useCallback(() => setShow(false), [setShow]);
  const handleShow = () => setShow(true);

  const handleCreate = useCallback((name) => {
    dispatch(
      createScript({
        name: name,
        content: script.code,
        workspace: script.workspace,
      })
    );
  });

  function create() {
    dispatch(
      changeEditedScript({
        code: blocklyCode,
        workspace: blocklyWorkspace,
      })
    );
    handleShow();
  }
  function update() {
    dispatch(
      updateScript(script._id, {
        content: blocklyCode,
        workspace: blocklyWorkspace,
      })
    );
  }

  useEffect(() => {
    console.log("useEffect");
    dispatch(initializeScreen());
    dispatch(loadScript(id));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const script = useSelector((state) => state.script);
  if (script !== undefined) {
    blocklyWorkspace = script.workspace;
  }

  return (
    <>
      <div className="Editor">
        <Row>
          <Col md={6}>
            <h1>blockly editor</h1>
            {script !== undefined && <h1>{script.name}</h1>}
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Button className="btn btn-primary  btn-sm" onClick={update}>
              Save Script
            </Button>
          </Col>
          <Col md={3}>
            <Button className="btn btn-primary  btn-sm" onClick={create}>
              Save as new Script
            </Button>
          </Col>
        </Row>
        <Row>
          {script !== undefined ? (
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
                  //console.log(code /*, workspace*/);
                  if (!show) {
                    blocklyCode = code;
                    blocklyWorkspace = workspace;
                  }
                }}
                workspaceXML={script.workspace}
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
          ) : (
            <div className="d-flex justify-content-center align-items-center h-100">
              <Spinner animation="border" />
            </div>
          )}
        </Row>
      </div>
      <ScriptSaveModal model={{ show, handleClose, handleCreate }} />
    </>
  );
}

export default EditorScreen;
