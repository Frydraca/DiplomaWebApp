import { Button, Col, Row } from "react-bootstrap";
import Canvas from "../tools/Canvas";
import RunGame from "../../tempGameEngine/temp";

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

  return (
    <div className="SimulatorScreen">
      <div>
        <Row>
          <Col>
            <Button onClick={RunGame}>Run</Button>
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
