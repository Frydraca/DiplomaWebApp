import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Row } from "react-bootstrap";
import Canvas from "../tools/Canvas";
import { initializeScreen } from "../../api/Authentication";
import {
  simulateGame,
  getStartOfGame,
  getNextTurnOfGame,
  getPreviousTurnOfGame,
} from "../../api/Simulator";

function SimulatorScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeScreen());
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
    dispatch(
      simulateGame({
        gameId: "607762d486490906cc9bdd1a",
        script: "script",
      })
    );
  }
  function goToStart() {
    dispatch(getStartOfGame(gameId));
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
          <Col>
            <Canvas draw={draw}></Canvas>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SimulatorScreen;
