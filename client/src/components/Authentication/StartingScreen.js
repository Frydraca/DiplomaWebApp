import { Redirect } from "react-router";
import { Container, Col, Button, Row, Jumbotron } from "react-bootstrap";
import { isLoggedIn } from "../../api/Authentication";

function StartingScreen() {
  return isLoggedIn() ? (
    <Redirect
      to={{
        pathname: "/designer",
      }}
    />
  ) : (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Jumbotron>
            <h3>Ai Designer App</h3>
            <p>Description of the Ai Designer App</p>
            <Container>
              <Row>
                <Col className="text-center">
                  <Button href="/login" variant="primary">
                    Log in
                  </Button>
                </Col>
                <Col className="text-center">
                  <Button href="/register" variant="primary">
                    Register
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

export default StartingScreen;
