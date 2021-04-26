import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Col, Row, Spinner } from "react-bootstrap";
import { initializeScreen } from "../../api/Authentication";
import { loadMyScripts } from "../../api/Profile";
import { ScriptCard } from "./ScriptCard";

function ProfileScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeScreen());
    dispatch(loadMyScripts());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const scriptList = useSelector((state) => state.ownScripts.ownScripts);

  return (
    <Container>
      <h3>Profile</h3>
      <h5>Your scripts</h5>
      {scriptList !== undefined ? (
        <Row>
          {scriptList.map((script, index) => (
            <Col key={index} xs={12}>
              <ScriptCard script={script} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="d-flex justify-content-center align-items-center h-100">
          <Spinner animation="border" />
        </div>
      )}
    </Container>
  );
}

export default ProfileScreen;
