import React, { useCallback, useState } from "react";
import { FunctionComponent } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export function MapCard({ gameMap }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  return (
    <>
      <Card style={{ marginBottom: 20 }} className="mx-auto" border="primary">
        <Card.Header>{gameMap.name}</Card.Header>
        <Card.Body>
          <p>description</p>
          <Button>View</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default MapCard;
