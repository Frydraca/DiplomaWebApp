import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { initializeScreen } from "../../api/Authentication";

function DesignerHelpScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeScreen());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <h3>Rules</h3>
    </Container>
  );
}

export default DesignerHelpScreen;
