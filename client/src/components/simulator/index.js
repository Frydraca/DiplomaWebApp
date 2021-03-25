import { Button, Col, Row } from "react-bootstrap";
import Canvas from "../tools/Canvas";
import { AiEngine } from "../../tempGameEngine/aiEngine";

function SimulatorScreen() {
  const draw = (ctx, gameState) => {
    ctx.canvas.width = 500;
    ctx.canvas.height = 500;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.lineWidth = "2";
    ctx.strokeStyle = "black";
    for (var i = 0; i < 5; i++) {
      for (var ii = 0; ii < 5; ii++) {
        ctx.beginPath();
        ctx.rect((ii + 1) * 50, (i + 1) * 50, 50, 50);
        ctx.stroke();
      }
    }
  };

  const startingGameState = require("../../tempGameEngine/gameState.json");
  const playerIds = ["player1"];
  const scripts = [];
  var game = new AiEngine(playerIds, scripts, startingGameState);

  function simulate() {
    return game.RunGame();
  }

  return (
    <div className="SimulatorScreen">
      <div>
        <Row>
          <Col>
            <Button onClick={simulate}>Run</Button>
          </Col>
          <Col>
            <Button> Previous Turn</Button>
          </Col>
          <Col>
            <Button> Next Turn</Button>
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
