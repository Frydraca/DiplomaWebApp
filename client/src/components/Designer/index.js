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
import unitTasks from "./customBlocks/unitTasks";
import research from "./customBlocks/research";
import trade from "./customBlocks/trading";
import ScriptSaveModal from "./ScriptSaveModal";
import { changeEditedScript } from "../../store/Script";

import BlocklyDrawer, { Category } from "react-blockly-drawer";

function EditorScreen() {
  var { id } = useParams();
  const dispatch = useDispatch();
  var blocklyCode = "";
  var blocklyWorkspace = "";

  const [show, setShow] = useState(false);
  const [scriptCode, setScriptCode] = useState("");
  var [warning, setWarning] = useState("");

  useEffect(() => {}, [setScriptCode]); // eslint-disable-line react-hooks/exhaustive-deps

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

  // This is a helper function
  function replaceBetween(origin, startIndex, endIndex, insertion) {
    return (
      origin.substring(0, startIndex) + insertion + origin.substring(endIndex)
    );
  }

  // This is a helper function
  function tokenize(workText, searchString, tokens) {
    var index = workText.indexOf(searchString);
    var element = workText.substring(index + 1);
    var endIndex = element.indexOf(")");
    element = element.substring(0, endIndex);
    var args = element
      .substring(searchString.length, element.length)
      .split(",");
    var trimmedArgs = [];
    args.forEach((arg) => {
      trimmedArgs.push(arg.trim());
    });
    tokens.push({
      tokenNumber: "token" + tokens.length,
      function: searchString,
      args: trimmedArgs,
    });
    workText = replaceBetween(
      workText,
      index,
      index + endIndex + 2,
      "token" + (tokens.length - 1)
    );

    return { workText: workText, tokens: tokens };
  }

  function isRepeatInTokenArray(tokenArgs, tokens) {
    for (let outerIndex = 1; outerIndex < tokenArgs.length; outerIndex++) {
      for (
        let innerIndex = outerIndex + 1;
        innerIndex < tokenArgs.length;
        innerIndex++
      ) {
        let t1Index = tokenArgs[outerIndex].substring(5);
        let t2Index = tokenArgs[innerIndex].substring(5);
        let argsAreTheSame = true;
        for (
          let argIndex = 0;
          argIndex < tokens[t1Index].args.length;
          argIndex++
        ) {
          if (tokens[t1Index].args[argIndex] !== tokens[t2Index].args[argIndex])
            argsAreTheSame = false;
        }
        if (argsAreTheSame) return true;
      }
    }
    return false;
  }

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
    console.log(blocklyCode);
    dispatch(
      updateScript(script._id, {
        content: blocklyCode,
        workspace: blocklyWorkspace,
      })
    );
  }
  function check() {
    var scriptIsCorrect = true;
    setWarning("");
    var tempWarning = "";
    // Check groups to have correct tags and elements Building - Buildings
    // Check Build commands to not contain Command Centers
    // Check Buy/Sell commands to not contain credits as Resource
    // Check if double trade rule or research rule are in the same block
    // Check if condition is always negative in a simple trigger-action block
    console.log(blocklyCode);
    if (blocklyCode !== "") {
      var statements = blocklyCode.split(";");
      console.log(statements);
      statements.forEach((currentStatement) => {
        var tokens = [];
        var workText = JSON.parse(JSON.stringify(currentStatement));
        workText = workText.replace(/this./g, "");
        console.log(workText);
        // GroupElement tokenization
        var occurences = workText.match(/GroupElement/g);
        if (occurences !== null) {
          for (let i = 0; i < occurences.length; i++) {
            let result = tokenize(workText, "GroupElement", tokens);
            workText = result.workText;
            tokens = result.tokens;
          }
        }
        //Group tokenization
        occurences = workText.match(/Group/g);
        if (occurences !== null) {
          for (let i = 0; i < occurences.length; i++) {
            let result = tokenize(workText, "Group", tokens);
            workText = result.workText;
            tokens = result.tokens;
          }
        }
        //UpgradeStats tokenization
        occurences = workText.match(/UpgradeStats/g);
        if (occurences !== null) {
          for (let i = 0; i < occurences.length; i++) {
            let result = tokenize(workText, "UpgradeStats", tokens);
            workText = result.workText;
            tokens = result.tokens;
          }
        }
        //Research tokenization
        occurences = workText.match(/Research/g);
        if (occurences !== null) {
          for (let i = 0; i < occurences.length; i++) {
            let result = tokenize(workText, "Research", tokens);
            workText = result.workText;
            tokens = result.tokens;
          }
        }
        //Sell tokenization
        occurences = workText.match(/Sell/g);
        if (occurences !== null) {
          for (let i = 0; i < occurences.length; i++) {
            let result = tokenize(workText, "Sell", tokens);
            workText = result.workText;
            tokens = result.tokens;
          }
        }
        //Buy tokenization
        occurences = workText.match(/Buy/g);
        if (occurences !== null) {
          for (let i = 0; i < occurences.length; i++) {
            let result = tokenize(workText, "Buy", tokens);
            workText = result.workText;
            tokens = result.tokens;
          }
        }
        //Trading tokenization
        occurences = workText.match(/Trading/g);
        if (occurences !== null) {
          for (let i = 0; i < occurences.length; i++) {
            let result = tokenize(workText, "Trading", tokens);
            workText = result.workText;
            tokens = result.tokens;
          }
        }
        //BuildUpTo tokenization
        occurences = workText.match(/BuildUpTo/g);
        if (occurences !== null) {
          for (let i = 0; i < occurences.length; i++) {
            let result = tokenize(workText, "BuildUpTo", tokens);
            workText = result.workText;
            tokens = result.tokens;
          }
        }
        //Build tokenization
        occurences = workText.match(/Build/g);
        if (occurences !== null) {
          for (let i = 0; i < occurences.length; i++) {
            let result = tokenize(workText, "Build", tokens);
            workText = result.workText;
            tokens = result.tokens;
          }
        }
        //CreateNTimes tokenization
        occurences = workText.match(/CreateNTimes/g);
        if (occurences !== null) {
          for (let i = 0; i < occurences.length; i++) {
            let result = tokenize(workText, "CreateNTimes", tokens);
            workText = result.workText;
            tokens = result.tokens;
          }
        }
        //Do tokenization
        occurences = workText.match(/Do/g);
        if (occurences !== null) {
          for (let i = 0; i < occurences.length; i++) {
            let result = tokenize(workText, "Do", tokens);
            workText = result.workText;
            tokens = result.tokens;
          }
        }
        console.log(tokens);

        // Start Checking the tokens
        tokens.forEach((currentToken) => {
          //console.log(currentToken);
          switch (currentToken.function) {
            case "GroupElement":
              if (currentToken.args[0] === "") {
                scriptIsCorrect = false;
                tempWarning += "\n Error: empty input in a GroupElement block.";
              }
              if (currentToken.args.length < 2) {
                scriptIsCorrect = false;
                tempWarning +=
                  "\n Warning: no research rules in a GroupElement block.";
              }
              break;
            case "Group":
              if (
                currentToken.args[0] === '"Building"' &&
                currentToken.args.length >= 2
              ) {
                for (let i = 1; i < currentToken.args.length; i++) {
                  let tokenIndex = currentToken.args[i].substring(5);
                  let argToken = tokens[tokenIndex];
                  let arr = [
                    "'Command Center'",
                    "'Core Factory'",
                    "'Crystal Mine'",
                    "'Foundry'",
                    "'Solar Power Plant'",
                    "'Steel Mine'",
                    "'Workshop'",
                  ];
                  console.log(argToken.args[0]);
                  if (!arr.includes(argToken.args[0])) {
                    scriptIsCorrect = false;
                    tempWarning +=
                      "\n Error: Building group contains non-Building GroupElement block.";
                  }
                }
              }
              if (
                currentToken.args[0] === '"Unit"' &&
                currentToken.args.length >= 2
              ) {
                for (let i = 1; i < currentToken.args.length; i++) {
                  let tokenIndex = currentToken.args[i].substring(5);
                  let argToken = tokens[tokenIndex];
                  let arr = [
                    "'Artillery Bot'",
                    "'Attack Bot'",
                    "'Raider Bot'",
                    "'Tank Bot'",
                  ];
                  if (!arr.includes(argToken.args[0])) {
                    scriptIsCorrect = false;
                    tempWarning +=
                      "\n Error: Unit group contains non-Unit GroupElement block.";
                  }
                }
              }
              break;
            case "UpgradeStats":
              if (currentToken.args[1] === "") {
                scriptIsCorrect = false;
                tempWarning += "\n Error: empty input in a UpgradeStats block.";
              }
              break;
            case "Research":
              if (currentToken.args.length < 2) {
                scriptIsCorrect = false;
                tempWarning +=
                  "\n Warning: no research rules in a Research block.";
              }
              if (currentToken.args.length > 2) {
                if (isRepeatInTokenArray(currentToken.args, tokens)) {
                  scriptIsCorrect = false;
                  tempWarning +=
                    "\n Warning: repeated research rules in a Research block.";
                }
              }
              break;
            case "Buy":
              if (currentToken.args[1] === "") {
                scriptIsCorrect = false;
                tempWarning += "\n Error: empty input in a Buy block.";
              }
              if (currentToken.args[1] === "'Credits'") {
                scriptIsCorrect = false;
                tempWarning += "\n Warning: Buying Credits has no purpose.";
              }
              break;
            case "Sell":
              if (currentToken.args[1] === "") {
                scriptIsCorrect = false;
                tempWarning += "\n Error: empty input in a Sell block.";
              }
              if (currentToken.args[1] === "'Credits'") {
                scriptIsCorrect = false;
                tempWarning += "\n Warning: Selling Credits has no purpose.";
              }
              break;
            case "Trading":
              if (currentToken.args.length < 2) {
                scriptIsCorrect = false;
                tempWarning += "\n Warning: no trade rules in a Trading block.";
              }
              if (currentToken.args.length > 2) {
                if (isRepeatInTokenArray(currentToken.args, tokens)) {
                  scriptIsCorrect = false;
                  tempWarning +=
                    "\n Warning: repeated trading rules in a Trading block.";
                }
              }
              break;
            case "BuildUpTo":
              if (currentToken.args[1] === "") {
                scriptIsCorrect = false;
                tempWarning += "\n Error: empty input in a BuildUpTo block.";
              }
              break;
            case "Build":
              if (currentToken.args[1] === "") {
                scriptIsCorrect = false;
                tempWarning += "\n Error: empty input in a Build block.";
              }
              break;
            case "CreateNTimes":
              if (currentToken.args[1] === "") {
                scriptIsCorrect = false;
                tempWarning += "\n Error: empty input in a Create block.";
              }
              break;
            case "Do":
              if (currentToken.args[0] === "") {
                scriptIsCorrect = false;
                tempWarning += "\n Warning: no actions in an Action block.";
              }
              break;
            default:
              break;
          }
        });
      });
    }

    if (scriptIsCorrect) {
      tempWarning = "The check didn't find any errors.";
    }
    console.log(tempWarning);
    setWarning(tempWarning);

    setScriptCode(blocklyCode);
  }

  function checkGroupElement(elementToTest) {
    var args = elementToTest.substring(13, elementToTest.length - 1).split(",");
    if (args[0] === "") return false;
    else return true;
  }

  function checkGroup(groupToTest) {
    var args = groupToTest.substring(6, groupToTest.length - 1).split(",");
    console.log(args);
    if (args[0] === "") return false;
    else return true;
  }

  useEffect(() => {
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
          <Col md={3}>
            <Button className="btn btn-primary  btn-sm" onClick={check}>
              Check Script
            </Button>
          </Col>
        </Row>
        <Row>
          <div className="Designer">
            <div id="main">
              {script !== undefined ? (
                <Col>
                  <BlocklyDrawer
                    className="BlocklyDrawer"
                    tools={[
                      ...structures,
                      ...actions,
                      ...triggers,
                      ...types,
                      ...combatTactics,
                      ...unitTasks,
                      ...research,
                      ...trade,
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
                        "Combat Tactics": {
                          colour: "0",
                        },
                        "Unit Tasks": {
                          colour: "60",
                        },
                        Research: {
                          colour: "120",
                        },
                        Trading: {
                          colour: "330",
                        },
                      },
                    }}
                  ></BlocklyDrawer>
                </Col>
              ) : (
                <div className="d-flex justify-content-center align-items-center h-100">
                  <Spinner animation="border" />
                </div>
              )}
            </div>
            <div id="feedBack">{warning}</div>
          </div>
        </Row>
      </div>
      <ScriptSaveModal model={{ show, handleClose, handleCreate }} />
    </>
  );
}

export default EditorScreen;
