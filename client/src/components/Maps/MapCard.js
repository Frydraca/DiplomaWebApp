import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadOneMap } from "../../api/Maps";

export function MapCard({ gameMap }) {
  const dispatch = useDispatch();

  function viewMap() {
    console.log("view");
    dispatch(loadOneMap(gameMap._id));
  }

  return (
    <>
      <Card style={{ marginBottom: 20 }} className="mx-auto" border="primary">
        <Card.Header>{gameMap.name}</Card.Header>
        <Card.Body>
          <p>description</p>
          <Button onClick={viewMap}>View</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default MapCard;