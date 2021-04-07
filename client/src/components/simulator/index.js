import { Button, Col, Row } from "react-bootstrap";
import Canvas from "../tools/Canvas";
import { AiEngine } from "../../tempGameEngine/aiEngine";

function SimulatorScreen() {
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
    // var img = new Image(30, 30);
    // img.src =
    //   "file://E:Lajos/Egyetem/MSc/Diploma/DiplomaWebApp/client/images/Crystal_Mine.png";
    // ctx.drawImage(img, 100, 100, 30, 30);
    ctx.lineWidth = "2";
    ctx.strokeStyle = "black";
    let tiles = gameState.GetTiles();
    tiles.forEach((element) => {
      ctx.beginPath();
      var img = new Image(30, 30);
      img.src = "./Crystal_Mine.png";
      ctx.drawImage(img, 100, 100, 30, 30);
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
    return game.RunGame();
  }
  function goToStart() {
    turnToView = 0;
    gameState = game.game.GetGameStateInTurn(turnToView);
  }
  function incrementTurnToView() {
    turnToView++;
    gameState = game.game.GetGameStateInTurn(turnToView);
  }
  function decrementTurnToView() {
    turnToView--;
    gameState = game.game.GetGameStateInTurn(turnToView);
  }

  function getGameState() {
    return game.game.gameState;
  }

  return (
    <div className="SimulatorScreen">
      <div>
        <Row>
          <Col>
            <Button onClick={simulate}>Run</Button>
          </Col>
          <Col>
            <Button onClick={goToStart}>Go to Start</Button>
          </Col>
          <Col>
            <Button onClick={decrementTurnToView}> Previous Turn</Button>
          </Col>
          <Col>
            <Button onClick={incrementTurnToView}> Next Turn</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Canvas draw={draw}></Canvas>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default SimulatorScreen;
