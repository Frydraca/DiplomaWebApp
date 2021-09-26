import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Col, Container, Dropdown, Row, Table } from "react-bootstrap";
import Canvas from "../tools/Canvas";
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
import UpgradeBar from "./UpgradeBar/UpgradeBar";
import { setSimulationState } from "../../store/SimulationState";

function SimulatorScreen() {
  var { id } = useParams();
  const dispatch = useDispatch();

  const simulationState = useSelector((state) => state.simulationState);

  useEffect(() => {
    dispatch(initializeScreen());
    dispatch(loadCurrentMap(id));
    dispatch(loadMyScripts());
    dispatch(loadScripts());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (simulationState === "Running") {
      var interval = setInterval(() => {
        dispatch(getNextTurnOfGame(gameId, 1));
      }, 1000);
    } else {
      if (interval) {
        clearInterval(interval);
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [simulationState]); // eslint-disable-line react-hooks/exhaustive-deps

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
  const [turnIncrementValue, setTurnIncrementValue] = useState(1);

  const selectOwnScriptCallback = useCallback((script) =>
    selectOwnScript(script)
  );
  const selectEnemyScriptCallback = useCallback((script) =>
    selectEnemyScript(script)
  );
  const selectTurnIncrementValueCallback = useCallback((value) =>
    setTurnIncrementValue(value)
  );

  const draw = (ctx) => {
    ctx.canvas.width = 1000;
    ctx.canvas.height = 1000;
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

  const handleSimulate = useCallback(() => {
    simulate();
  });
  const handleStart = useCallback(() => {
    start();
  });
  const handleStop = useCallback(() => {
    stop();
  });
  const handleGoToStart = useCallback(() => {
    goToStart();
  });
  const handleGoToEnd = useCallback(() => {
    goToEnd();
  });
  const handleIncrementTurnToView = useCallback(() => {
    incrementTurnToView();
  });
  const handleDecrementTurnToView = useCallback(() => {
    decrementTurnToView();
  });

  function simulate() {
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
  function start() {
    if (simulationState !== "Not started yet") {
      dispatch(
        setSimulationState({
          simulationState: "Running",
        })
      );
    }
  }
  function stop() {
    if (simulationState !== "Not started yet") {
      dispatch(
        setSimulationState({
          simulationState: "Stop",
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
    dispatch(getNextTurnOfGame(gameId, turnIncrementValue));
  }
  function decrementTurnToView() {
    dispatch(getPreviousTurnOfGame(gameId, turnIncrementValue));
  }

  function selectOwnScript(script) {
    setCurrentOwnScript(script.name);
    setOwnScriptId(script._id);
  }
  function selectEnemyScript(script) {
    setCurrentEnemyScript(script.name);
    setEnemyScriptId(script._id);
  }
  function selectEnemyScript(script) {
    setCurrentEnemyScript(script.name);
    setEnemyScriptId(script._id);
  }

  const turnIncrementList = [1, 2, 3, 5, 10];

  const UIFunctionCallbacks = {
    handleSimulate,
    handleStart,
    handleStop,
    handleGoToStart,
    handleGoToEnd,
    handleIncrementTurnToView,
    handleDecrementTurnToView,
  };

  const ownScriptData = {
    currentScript: currentOwnScript,
    scriptList: userScriptList,
    scriptCallback: selectOwnScriptCallback,
  };

  const enemyScriptData = {
    currentScript: currentEnemyScript,
    scriptList: allScriptList,
    scriptCallback: selectEnemyScriptCallback,
  };

  const turnIncrementData = {
    currentTurnIncrementValue: turnIncrementValue,
    turnIncrementList: turnIncrementList,
    turnIncrementCallback: selectTurnIncrementValueCallback,
  };

  return (
    <div className="SimulatorScreen">
      <div id="side">
        {userScriptList !== undefined && allScriptList !== undefined ? (
          <>
            <Sidebar
              model={UIFunctionCallbacks}
              ownScriptData={ownScriptData}
              enemyScriptData={enemyScriptData}
              turnIncrementData={turnIncrementData}
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
      </div>
      <div id="upgrades">
        {currentGameState !== undefined &&
        currentGameState.players.length !== 0 ? (
          <UpgradeBar players={currentGameState.players}></UpgradeBar>
        ) : (
          <div></div>
        )}
      </div>
      {/* <Container>
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
      </Container> */}
    </div>
  );
}

export default SimulatorScreen;
