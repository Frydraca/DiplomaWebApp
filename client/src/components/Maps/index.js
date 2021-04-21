import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Card, Col, Row, Spinner } from "react-bootstrap";
import { initializeScreen } from "../../api/Authentication";
import { loadMaps, addMap } from "../../api/Maps";
import MapCard from "./MapCard";

function MapListScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeScreen());
    dispatch(loadMaps());
  }, []);

  const mapList = useSelector((state) => state.gameMaps.gameMaps);

  const newMap = {
    name: "basic 5x5 + extra steel ore",
    width: 5,
    height: 5,
    tiles: [
      {
        location: [0, 0],
        terrain: "steel ore",
      },
      {
        location: [0, 1],
        terrain: "plains",
      },
      {
        location: [0, 2],
        terrain: "plains",
      },
      {
        location: [0, 3],
        terrain: "steel ore",
      },
      {
        location: [0, 4],
        terrain: "crystal field",
      },
      {
        location: [1, 0],
        terrain: "steel ore",
      },
      {
        location: [1, 1],
        terrain: "plains",
      },
      {
        location: [1, 2],
        terrain: "steel ore",
      },
      {
        location: [1, 3],
        terrain: "plains",
      },
      {
        location: [1, 4],
        terrain: "crystal field",
      },
      {
        location: [2, 0],
        terrain: "plains",
      },
      {
        location: [2, 1],
        terrain: "plains",
      },
      {
        location: [2, 2],
        terrain: "plains",
      },
      {
        location: [2, 3],
        terrain: "plains",
      },
      {
        location: [2, 4],
        terrain: "plains",
      },
      {
        location: [3, 0],
        terrain: "crystal field",
      },
      {
        location: [3, 1],
        terrain: "plains",
      },
      {
        location: [3, 2],
        terrain: "plains",
      },
      {
        location: [3, 3],
        terrain: "plains",
      },
      {
        location: [3, 4],
        terrain: "steel ore",
      },
      {
        location: [4, 0],
        terrain: "crystal field",
      },
      {
        location: [4, 1],
        terrain: "steel ore",
      },
      {
        location: [4, 2],
        terrain: "plains",
      },
      {
        location: [4, 3],
        terrain: "plains",
      },
      {
        location: [4, 4],
        terrain: "steel ore",
      },
    ],
    startingLocations: [
      [0, 2],
      [4, 2],
    ],
  };

  function addNewMap() {
    dispatch(addMap(newMap));
    dispatch(loadMaps());
  }

  return (
    <Container>
      <h3>Map list</h3>
      <Button onClick={addNewMap}> Add map (just testing)</Button>
      {mapList !== undefined ? (
        <Row>
          {mapList.map((gameMap, index) => (
            <Col key={index} xs={12}>
              <MapCard gameMap={gameMap} />
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

export default MapListScreen;
