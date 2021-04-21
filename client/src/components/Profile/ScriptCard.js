import React from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

export function ScriptCard({ script }) {
  const dispatch = useDispatch();

  function loadScript() {
    console.log("load");
    dispatch(push(`/designer/${script._id}`));
    window.location.reload();
  }

  function deleteScript() {
    console.log("deleteload");
  }

  return (
    <>
      <Card style={{ marginBottom: 20 }} className="mx-auto" border="primary">
        <Card.Header>{script.name}</Card.Header>
        <Card.Body>
          <p>description</p>
          <Button onClick={loadScript}>Load</Button>
          <Button class="btn btn-danger" onClick={deleteScript}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default ScriptCard;
