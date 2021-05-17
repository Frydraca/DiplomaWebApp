import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Col, Container, Dropdown, Row, Table } from "react-bootstrap";
import Canvas from "../tools/Canvas";
import { initializeScreen } from "../../api/Authentication";
import { loadScripts, loadMyScripts } from "../../api/Profile";
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

  return (
    <div className="SimulatorScreen">
      <Container>
        <Row>
          <Col md={2}>
            <Button onClick={simulate} size="sm">
              Run
            </Button>
          </Col>
          <Col md={2}>
            <Button onClick={goToStart} size="sm">
              Go to Start
            </Button>
          </Col>
          <Col md={2}>
            <Button onClick={goToEnd} size="sm">
              Go to End
            </Button>
          </Col>
          <Col md={2}>
            <Button onClick={decrementTurnToView} size="sm">
              Previous Turn
            </Button>
          </Col>
          <Col md={2}>
            <Button onClick={incrementTurnToView} size="sm">
              Next Turn
            </Button>
          </Col>
        </Row>
        <Row>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-user">
              Select your script
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {userScriptList !== undefined ? (
                <>
                  {userScriptList.map((script, index) => (
                    <Dropdown.Item
                      onClick={() => setOwnScriptId(script._id)}
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
        </Row>
        <Row>
          {allScriptList !== undefined ? (
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-all">
                Select the opposing script
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {allScriptList.map((script, index) => (
                  <Dropdown.Item
                    onClick={() => setEnemyScriptId(script._id)}
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
