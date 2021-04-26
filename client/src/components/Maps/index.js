import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Col, Row, Spinner } from "react-bootstrap";
import { initializeScreen } from "../../api/Authentication";
import { loadMaps, addMap } from "../../api/Maps";
import MapCard from "./MapCard";

function MapListScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeScreen());
    dispatch(loadMaps());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const mapList = useSelector((state) => state.gameMaps.gameMaps);

  const newMap = {
    name: "basic 7x7",
    width: 7,
    height: 7,
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
        terrain: "plains",
      },
      {
        location: [0, 4],
        terrain: "crystal field",
      },
      {
        location: [0, 5],
        terrain: "plains",
      },
      {
        location: [0, 6],
        terrain: "plains",
      },
      {
        terrain: "plains",
        location: [1, 0],
      },
      {
        location: [1, 1],
        terrain: "plains",
      },
      {
        location: [1, 2],
        terrain: "plains",
      },
      {
        location: [1, 3],
        terrain: "steel ore",
      },
      {
        location: [1, 4],
        terrain: "steel ore",
      },
      {
        location: [1, 5],
        terrain: "plains",
      },
      {
        location: [1, 6],
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
        location: [2, 5],
        terrain: "plains",
      },
      {
        location: [2, 6],
        terrain: "crystal field",
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
        terrain: "steel ore",
      },
      {
        location: [3, 4],
        terrain: "plains",
      },
      {
        location: [3, 5],
        terrain: "plains",
      },
      {
        location: [3, 6],
        terrain: "plains",
      },
      {
        location: [4, 0],
        terrain: "plains",
      },
      {
        location: [4, 1],
        terrain: "plains",
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
        terrain: "plains",
      },
      {
        location: [4, 5],
        terrain: "plains",
      },
      {
        location: [4, 6],
        terrain: "plains",
      },
      {
        location: [5, 0],
        terrain: "crystal field",
      },
      {
        location: [5, 1],
        terrain: "plains",
      },
      {
        location: [5, 2],
        terrain: "plains",
      },
      {
        location: [5, 3],
        terrain: "steel ore",
      },
      {
        location: [5, 4],
        terrain: "steel ore",
      },
      {
        location: [5, 5],
        terrain: "plains",
      },
      {
        location: [5, 6],
        terrain: "plains",
      },
      {
        location: [6, 0],
        terrain: "steel ore",
      },
      {
        location: [6, 1],
        terrain: "plains",
      },
      {
        location: [6, 2],
        terrain: "crystal field",
      },
      {
        location: [6, 3],
        terrain: "plains",
      },
      {
        location: [6, 4],
        terrain: "plains",
      },
      {
        location: [6, 5],
        terrain: "plains",
      },
      {
        location: [6, 6],
        terrain: "steel ore",
      },
    ],
    startingLocations: [
      [1, 1],
      [5, 5],
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
