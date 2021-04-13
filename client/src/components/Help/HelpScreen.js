import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Col, Button, Row, Jumbotron } from "react-bootstrap";
import { initializeScreen } from "../../api/Authentication";

function HelpScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeScreen());
  }, []);

  return (
    <Container>
      <Row>
        <Col md={{ span: 4, offset: 1 }}>
          <Jumbotron>
            <h3>Game rules</h3>
            <p>
              Read about the game rules. Learn the game mechanincs, the
              buildings and units.
            </p>
            <Container>
              <Row>
                <Col className="text-center">
                  <Button href="/gameRules" variant="primary">
                    Game rules
                  </Button>
                </Col>
              </Row>
            </Container>
          </Jumbotron>
        </Col>
        <Col md={{ span: 4, offset: 2 }}>
          <Jumbotron>
            <h3>Designer help</h3>
            <p>Learn how to use the Ai Designer.</p>
            <Container>
              <Row>
                <Col className="text-center">
                  <Button href="/designerHelp" variant="primary">
                    Designer help
                  </Button>
                </Col>
              </Row>
            </Container>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}

export default HelpScreen;
