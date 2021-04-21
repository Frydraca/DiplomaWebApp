import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import Canvas from "../tools/Canvas";
import { initializeScreen } from "../../api/Authentication";
import {
  simulateGame,
  getStartOfGame,
  getEndOfGame,
  getNextTurnOfGame,
  getPreviousTurnOfGame,
  loadCurrentMap,
} from "../../api/Simulator";

function SimulatorScreen() {
  var { id } = useParams();
  var simulationRan = false;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeScreen());
    dispatch(loadCurrentMap(id));
  }, []);

  const gameId = useSelector((state) => state.currentGame.id);
  const currentGameState = useSelector(
    (state) => state.currentGame.currentGameState
  );

  const draw = (ctx) => {
    ctx.canvas.width = 500;
    ctx.canvas.height = 500;
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
        ctx.beginPath();
        ctx.rect(
          (element.location[0] + 1) * 50 + 10,
          (element.location[1] + 1) * 50 + 10,
          30,
          30
        );
        switch (element.owner) {
          case "player1":
            ctx.fillStyle = "orange";
            break;
          case "serverAi":
            ctx.fillStyle = "yellow";
            break;
          default:
            ctx.fillStyle = "red";
            break;
        }
        ctx.fill();
      });
      let units = currentGameState.units;
      units.forEach((element) => {
        ctx.beginPath();
        ctx.rect(
          (element.location[0] + 1) * 50 + 10,
          (element.location[1] + 1) * 50 + 10,
          30,
          30
        );
        switch (element.owner) {
          case "player1":
            ctx.fillStyle = "darkviolet";
            break;
          case "serverAi":
            ctx.fillStyle = "violet";
            break;
          default:
            ctx.fillStyle = "red";
            break;
        }
        ctx.fill();
      });
    }
  };

  function simulate() {
    simulationRan = true;
    console.log(simulationRan);
    dispatch(
      simulateGame({
        gameId: id,
        script: "script",
      })
    );
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
        {currentGameState !== undefined ? (
          <>
            <Row>
              <Table striped bordered hover>
                <thead>
                  <tr>
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
