import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Col, Container, Row, Table } from "react-bootstrap";
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
import useMousePosition from "./useMousePosition";

function SimulatorScreen() {
  var { id } = useParams();
  const dispatch = useDispatch();

  const simulationState = useSelector((state) => state.simulationState);

  const [ref, mousePosition] = useMousePosition();

  useEffect(() => {
    // do something with the mouse position values here
    // console.log(mousePosition);
    getHoveredObject();
  }, [mousePosition]); // eslint-disable-line react-hooks/exhaustive-deps

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
      }, 500);
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
  const userScriptList = useSelector((state) => state.script.scripts);
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

  const [hoveredObject, setHoveredObject] = useState({
    objectName: "Object",
    owner: "No one",
    stats: {
      attack: 0,
      armor: 0,
      hp: 0,
      maxHp: 0,
      speed: 0,
      range: 0,
    },
  });

  /* eslint-disable react-hooks/exhaustive-deps */

  const selectOwnScriptCallback = useCallback((script) =>
    selectOwnScript(script)
  );
  const selectEnemyScriptCallback = useCallback((script) =>
    selectEnemyScript(script)
  );
  const selectTurnIncrementValueCallback = useCallback((value) =>
    setTurnIncrementValue(value)
  );

  /* eslint-enable react-hooks/exhaustive-deps */

  var cLeft = 0;
  var cTop = 0;

  const draw = (ctx) => {
    let cellSize = 40;
    ctx.canvas.width = 1000;
    ctx.canvas.height = 1000;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.lineWidth = "2";
    ctx.strokeStyle = "black";

    var canvasRect = ctx.canvas.getBoundingClientRect();
    cLeft = canvasRect.left;
    cTop = canvasRect.top;

    if (currentGameState !== undefined) {
      let tiles = currentGameState.tiles;
      tiles.forEach((element) => {
        ctx.beginPath();
        ctx.rect(
          (element.location.x + 1) * cellSize,
          element.location.y * cellSize,
          cellSize,
          cellSize
        );
        switch (element.terrain) {
          case "Plains":
            ctx.fillStyle = "lightgreen";
            break;
          case "Steel Ore":
            ctx.fillStyle = "grey";
            break;
          case "Crystal Field":
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
          (element.location.x + 1) * cellSize + 8,
          element.location.y * cellSize + 4,
          0.6 * cellSize * hpPercent,
          3
        );
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.beginPath();
        ctx.rect(
          (element.location.x + 1) * cellSize + 8 + 0.6 * cellSize * hpPercent,
          element.location.y * cellSize + 4,
          0.6 * cellSize - 0.6 * cellSize * hpPercent,
          3
        );
        ctx.fillStyle = "red";
        ctx.fill();

        const img = new Image();
        // if (element.status !== "Foundation") {
        //   img.src = BuildingImages[element.owner][element.name];
        // } else {
        //   img.src = BuildingImages[element.owner]["Foundation"];
        // }
        img.src = BuildingImages[element.owner][element.name];
        ctx.drawImage(
          img,
          (element.location.x + 1) * cellSize + 8,
          element.location.y * cellSize + 8,
          0.6 * cellSize,
          0.6 * cellSize
        );
      });
      let units = currentGameState.units;
      units.forEach((element) => {
        let hpPercent = element.hitPoints / element.maxHitPoints;
        ctx.beginPath();
        ctx.rect(
          (element.location.x + 1) * cellSize + 8,
          element.location.y * cellSize + 4,
          0.6 * cellSize * hpPercent,
          3
        );
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.beginPath();
        ctx.rect(
          (element.location.x + 1) * cellSize + 8 + 0.6 * cellSize * hpPercent,
          element.location.y * cellSize + 4,
          0.6 * cellSize - 0.6 * cellSize * hpPercent,
          3
        );
        ctx.fillStyle = "red";
        ctx.fill();

        const img = new Image();
        img.src = UnitImages[element.owner][element.name];
        ctx.drawImage(
          img,
          (element.location.x + 1) * cellSize + 8,
          element.location.y * cellSize + 8,
          0.6 * cellSize,
          0.6 * cellSize
        );
      });
    }
  };

  /* eslint-disable react-hooks/exhaustive-deps */

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

  /* eslint-enable react-hooks/exhaustive-deps */

  function simulate() {
    if (ownScriptId !== "" && enemyScriptId !== "") {
      dispatch(
        setSimulationState({
          simulationState: "Stopped",
        })
      );
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
          simulationState: "Stopped",
        })
      );
    }
  }
  function goToStart() {
    if (simulationState === "Stopped") {
      dispatch(getStartOfGame(gameId));
    }
  }
  function goToEnd() {
    if (simulationState === "Stopped") {
      dispatch(getEndOfGame(gameId));
    }
  }
  function incrementTurnToView() {
    if (simulationState === "Stopped") {
      dispatch(getNextTurnOfGame(gameId, turnIncrementValue));
    }
  }
  function decrementTurnToView() {
    if (simulationState === "Stopped") {
      dispatch(getPreviousTurnOfGame(gameId, turnIncrementValue));
    }
  }

  function selectOwnScript(script) {
    setCurrentOwnScript(script.name);
    setOwnScriptId(script._id);
  }
  function selectEnemyScript(script) {
    setCurrentEnemyScript(script.name);
    setEnemyScriptId(script._id);
  }

  function getHoveredObject() {
    if (currentGameState !== undefined) {
      var coordX = Math.floor((mousePosition.left - cLeft) / 40) - 1;
      var coordY = Math.floor((mousePosition.top - cTop) / 40);

      let buildings = currentGameState.buildings;
      buildings.forEach((element) => {
        if (element.location.x === coordX && element.location.y === coordY) {
          setHoveredObject({
            objectName: element.name,
            owner: element.owner,
            stats: {
              attack: element.attackDamage,
              armor: element.armor,
              hp: element.hitPoints,
              maxHp: element.maxHitPoints,
              speed: 0,
              range: element.range,
            },
          });
        }
      });
      let units = currentGameState.units;
      units.forEach((element) => {
        if (element.location.x === coordX && element.location.y === coordY) {
          setHoveredObject({
            objectName: element.name,
            owner: element.owner,
            stats: {
              attack: element.attackDamage,
              armor: element.armor,
              hp: element.hitPoints,
              maxHp: element.maxHitPoints,
              speed: element.speed,
              range: element.range,
            },
          });
        }
      });
    }
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
    <div className="SimulatorScreen" ref={ref}>
      <div id="side">
        {userScriptList !== undefined && allScriptList !== undefined ? (
          <>
            <Sidebar
              model={UIFunctionCallbacks}
              ownScriptData={ownScriptData}
              enemyScriptData={enemyScriptData}
              turnIncrementData={turnIncrementData}
              hoveredObject={hoveredObject}
            ></Sidebar>
          </>
        ) : (
          <div></div>
        )}
      </div>
      <div id="main">
        <Container>
          <Row className="DataTable">
            <Col>
              {currentGameState !== undefined ? (
                <>
                  <Row>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Turn</th>
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
                              <td>{player.playerName}</td>
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
    </div>
  );
}

export default SimulatorScreen;
