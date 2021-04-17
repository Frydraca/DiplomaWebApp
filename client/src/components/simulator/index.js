import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Row } from "react-bootstrap";
import Canvas from "../tools/Canvas";
import { AiEngine } from "../../tempGameEngine/aiEngine";
import { initializeScreen } from "../../api/Authentication";
import { simulateGame, getStartOfGame } from "../../api/Simulator";

function SimulatorScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeScreen());
  }, []);

  const gameId = useSelector((state) => state.currentGame.id);

  const startingGameState = require("../../tempGameEngine/gameState.json");
  const playerIds = ["player1", "player2"];
  const scripts = [];
  var game = new AiEngine(playerIds, scripts, startingGameState);
  var turnToView = 0;
  let gameState = game.game.GetGameStateInTurn(turnToView);

  const draw = (ctx) => {
    ctx.canvas.width = 500;
    ctx.canvas.height = 500;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.lineWidth = "2";
    ctx.strokeStyle = "black";
    let tiles = gameState.GetTiles();
    tiles.forEach((element) => {
      ctx.beginPath();
      ctx.rect(
        (element.GetLocation()[0] + 1) * 50,
        (element.GetLocation()[1] + 1) * 50,
        50,
        50
      );
      switch (element.GetTerrain()) {
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
    let buildings = gameState.GetBuildings();
    buildings.forEach((element) => {
      ctx.beginPath();
      ctx.rect(
        (element.GetLocation()[0] + 1) * 50 + 10,
        (element.GetLocation()[1] + 1) * 50 + 10,
        30,
        30
      );
      switch (element.GetOwner()) {
        case "player1":
          ctx.fillStyle = "orange";
          break;
        case "player2":
          ctx.fillStyle = "yellow";
          break;
        default:
          ctx.fillStyle = "red";
          break;
      }
      ctx.fill();
    });
    let units = gameState.GetUnits();
    units.forEach((element) => {
      ctx.beginPath();
      ctx.rect(
        (element.GetLocation()[0] + 1) * 50 + 10,
        (element.GetLocation()[1] + 1) * 50 + 10,
        30,
        30
      );
      switch (element.GetOwner()) {
        case "player1":
          ctx.fillStyle = "darkviolet";
          break;
        case "player2":
          ctx.fillStyle = "violet";
          break;
        default:
          ctx.fillStyle = "red";
          break;
      }
      ctx.fill();
    });
  };

  function simulate() {
    game.RunGame();
    dispatch(
      simulateGame({
        startingGameState: game.game.GetStartingGameState(),
        commands: game.game.GetCommands(),
      })
    );
  }
  function goToStart() {
    turnToView = 0;
    gameState = game.game.GetGameStateInTurn(turnToView);
    dispatch(getStartOfGame(gameId));
  }
  function incrementTurnToView() {
    turnToView++;
    gameState = game.game.GetGameStateInTurn(turnToView);
  }
  function decrementTurnToView() {
    turnToView--;
    gameState = game.game.GetGameStateInTurn(turnToView);
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
