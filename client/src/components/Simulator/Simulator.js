import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Col, Container, Dropdown, Row, Table } from "react-bootstrap";
import Canvas from "../tools/Canvas";
import "../../App.css";
import { initializeScreen } from "../../api/Authentication";
import { loadScripts, loadMyScripts } from "../../api/Profile";
import Sidebar from "./Sidebar/Sidebar";
import {
  simulateGame,
  getStartOfGame,
  getEndOfGame,
  getNextTurnOfGame,
  getPreviousTurnOfGame,
  loadCurrentMap,
} from "../../api/Simulator";
import BuildingImages from "./buildings";
import UnitImages from "./units";

function SimulatorScreen() {
  var { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeScreen());
    dispatch(loadCurrentMap(id));
    dispatch(loadMyScripts());
    dispatch(loadScripts());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const gameId = useSelector((state) => state.currentGame.id);
  const allScriptList = useSelector((state) => state.script.scripts);
  const userScriptList = useSelector((state) => state.ownScripts.ownScripts);
  const currentGameState = useSelector(
    (state) => state.currentGame.currentGameState
  );

  const [ownScriptId, setOwnScriptId] = useState("");
  const [enemyScriptId, setEnemyScriptId] = useState("");
  const [currentOwnScript, setCurrentOwnScript] =
    useState("Select your script");
  const [currentEnemyScript, setCurrentEnemyScript] = useState(
    "Select your opponent's script"
  );

  const selectOwnScriptCallback = useCallback((script) =>
    selectOwnScript(script)
  );
  const selectEnemyScriptCallback = useCallback((script) =>
    selectEnemyScript(script)
  );

  const draw = (ctx) => {
    ctx.canvas.width = 700;
    ctx.canvas.height = 700;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.lineWidth = "2";
    ctx.strokeStyle = "black";
    if (currentGameState !== undefined) {
      let tiles = currentGameState.tiles;
      tiles.forEach((element) => {
        ctx.beginPath();
        ctx.rect(
          (element.location[0] + 1) * 50,
          (element.location[1] + 1) * 50,
          50,
          50
        );
        switch (element.terrain) {
          case "plains":
            ctx.fillStyle = "lightgreen";
            break;
          case "steel ore":
            ctx.fillStyle = "grey";
            break;
          case "crystal field":
            ctx.fillStyle = "lightskyblue";
            break;
          default:
            ctx.fillStyle = "red";
            break;
        }
        ctx.fill();
      });
      let buildings = currentGameState.buildings;
      buildings.forEach((element) => {
        // TODO refactor into hpbar function
        let hpPercent = element.hitPoints / element.maxHitPoints;
        ctx.beginPath();
        ctx.rect(
          (element.location[0] + 1) * 50 + 10,
          (element.location[1] + 1) * 50 + 4,
          30 * hpPercent,
          3
        );
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.beginPath();
        ctx.rect(
          (element.location[0] + 1) * 50 + 10 + 30 * hpPercent,
          (element.location[1] + 1) * 50 + 4,
          30 - 30 * hpPercent,
          3
        );
        ctx.fillStyle = "red";
        ctx.fill();

        const img = new Image();
        img.src = BuildingImages[element.owner][element.name];
        ctx.drawImage(
          img,
          (element.location[0] + 1) * 50 + 10,
          (element.location[1] + 1) * 50 + 10,
          30,
          30
        );
      });
      let units = currentGameState.units;
      units.forEach((element) => {
        let hpPercent = element.hitPoints / element.maxHitPoints;
        ctx.beginPath();
        ctx.rect(
          (element.location[0] + 1) * 50 + 10,
          (element.location[1] + 1) * 50 + 4,
          30 * hpPercent,
          3
        );
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.beginPath();
        ctx.rect(
          (element.location[0] + 1) * 50 + 10 + 30 * hpPercent,
          (element.location[1] + 1) * 50 + 4,
          30 - 30 * hpPercent,
          3
        );
        ctx.fillStyle = "red";
        ctx.fill();

        const img = new Image();
        img.src = UnitImages[element.owner][element.name];
        ctx.drawImage(
          img,
          (element.location[0] + 1) * 50 + 10,
          (element.location[1] + 1) * 50 + 10,
          30,
          30
        );
      });
    }
  };

  function simulate() {
    console.log(ownScriptId);
    console.log(enemyScriptId);
    if (ownScriptId !== "" && enemyScriptId !== "") {
      dispatch(
        simulateGame({
          gameId: id,
          ownScript: ownScriptId,
          enemyScript: enemyScriptId,
        })
      );
    }
  }
  function goToStart() {
    dispatch(getStartOfGame(gameId));
  }
  function goToEnd() {
    dispatch(getEndOfGame(gameId));
  }
  function incrementTurnToView() {
    dispatch(getNextTurnOfGame(gameId));
  }
  function decrementTurnToView() {
    dispatch(getPreviousTurnOfGame(gameId));
  }

  function selectOwnScript(script) {
    setCurrentOwnScript(script.name);
    setOwnScriptId(script._id);
  }
  function selectEnemyScript(script) {
    setCurrentEnemyScript(script.name);
    setEnemyScriptId(script._id);
  }

  return (
    <div className="SimulatorScreen">
      {/* <div id="side">
        {userScriptList !== undefined && allScriptList !== undefined ? (
          <>
            <Sidebar
              ownCurrentScript={currentOwnScript}
              ownScriptList={userScriptList}
              ownScriptCallback={selectOwnScriptCallback}
              enemyCurrentScript={currentEnemyScript}
              enemyScriptList={allScriptList}
              enemyScriptCallback={selectEnemyScriptCallback}
            ></Sidebar>
          </>
        ) : (
          <div></div>
        )}
      </div>
      <div id="main">
        <Container>
          <Row>
            <Col>
              {currentGameState !== undefined ? (
                <>
                  <Row>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Turn Number</th>
                          <th>Player</th>
                          <th>Steel</th>
                          <th>RoboSteel</th>
                          <th>Energy</th>
                          <th>Crystals</th>
                          <th>Energy Cores</th>
                          <th>Credits</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentGameState.players.map((player, index) => {
                          return (
                            <tr key={index}>
                              <td>{currentGameState.turnNumber}</td>
                              <td>{player.playerId}</td>
                              <td>{player.resources.steel}</td>
                              <td>{player.resources.roboSteel}</td>
                              <td>{player.resources.energy}</td>
                              <td>{player.resources.crystal}</td>
                              <td>{player.resources.energyCore}</td>
                              <td>{player.resources.credits}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Row>
                  <Row>
                    <Col>
                      <Canvas draw={draw}></Canvas>
                    </Col>
                  </Row>
                </>
              ) : (
                <div className="d-flex justify-content-center align-items-center h-100"></div>
              )}
            </Col>
          </Row>
        </Container>
      </div> */}
      <Container>
        <Row>
          <Col md={2}>
            <Container>
              <Button onClick={simulate} size="sm">
                Run
              </Button>
              <Button onClick={goToStart} size="sm">
                Go to Start
              </Button>
              <Button onClick={goToEnd} size="sm">
                Go to End
              </Button>
              <Button onClick={decrementTurnToView} size="sm">
                Previous Turn
              </Button>
              <Button onClick={incrementTurnToView} size="sm">
                Next Turn
              </Button>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-user">
                  {currentOwnScript}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {userScriptList !== undefined ? (
                    <>
                      {userScriptList.map((script, index) => (
                        <Dropdown.Item
                          onClick={() => selectOwnScript(script)}
                          key={index}
                        >
                          {script.name}
                        </Dropdown.Item>
                      ))}
                    </>
                  ) : (
                    <div></div>
                  )}
                </Dropdown.Menu>
              </Dropdown>
              {allScriptList !== undefined ? (
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-all">
                    {currentEnemyScript}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {allScriptList.map((script, index) => (
                      <Dropdown.Item
                        onClick={() => selectEnemyScript(script)}
                        key={index}
                      >
                        {script.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <div></div>
              )}
            </Container>
          </Col>
        </Row>
        {currentGameState !== undefined ? (
          <>
            <Row>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Turn Number</th>
                    <th>Player</th>
                    <th>Steel</th>
                    <th>RoboSteel</th>
                    <th>Energy</th>
                    <th>Crystals</th>
                    <th>Energy Cores</th>
                    <th>Credits</th>
                  </tr>
                </thead>
                <tbody>
                  {currentGameState.players.map((player, index) => {
                    return (
                      <tr key={index}>
                        <td>{currentGameState.turnNumber}</td>
                        <td>{player.playerId}</td>
                        <td>{player.resources.steel}</td>
                        <td>{player.resources.roboSteel}</td>
                        <td>{player.resources.energy}</td>
                        <td>{player.resources.crystal}</td>
                        <td>{player.resources.energyCore}</td>
                        <td>{player.resources.credits}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Row>
            <Row>
              <Col>
                <Canvas draw={draw}></Canvas>
              </Col>
            </Row>
          </>
        ) : (
          <div className="d-flex justify-content-center align-items-center h-100"></div>
        )}
      </Container>
    </div>
  );
}

export default SimulatorScreen;
