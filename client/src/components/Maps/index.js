import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { initializeScreen } from "../../api/Authentication";

function MapListScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeScreen());
  }, []);

  return (
    <Container>
      <h3>Map list</h3>
    </Container>
  );
}

export default MapListScreen;
