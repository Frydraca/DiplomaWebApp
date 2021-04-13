import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { initializeScreen } from "../../api/Authentication";

function ProfileScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeScreen());
  }, []);

  return (
    <Container>
      <h3>Profile</h3>
    </Container>
  );
}

export default ProfileScreen;
