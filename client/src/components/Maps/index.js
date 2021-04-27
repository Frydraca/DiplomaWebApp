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
    name: "big 10x10",
    width: 10,
    height: 10,
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
        terrain: "crystal field",
      },
      {
        location: [0, 6],
        terrain: "plains",
      },
      {
        location: [0, 7],
        terrain: "plains",
      },
      {
        location: [0, 8],
        terrain: "plains",
      },
      {
        location: [0, 9],
        terrain: "plains",
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
        terrain: "plains",
      },
      {
        location: [1, 3],
        terrain: "plains",
      },
      {
        location: [1, 4],
        terrain: "plains",
      },
      {
        location: [1, 5],
        terrain: "plains",
      },
      {
        location: [1, 6],
        terrain: "plains",
      },
      {
        location: [1, 7],
        terrain: "plains",
      },
      {
        location: [1, 8],
        terrain: "plains",
      },
      {
        location: [1, 9],
        terrain: "plains",
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
        terrain: "steel ore",
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
        terrain: "plains",
      },
      {
        location: [2, 7],
        terrain: "plains",
      },
      {
        location: [2, 8],
        terrain: "plains",
      },
      {
        location: [2, 9],
        terrain: "plains",
      },
      {
        location: [3, 0],
        terrain: "plains",
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
        location: [3, 7],
        terrain: "crystal field",
      },
      {
        location: [3, 8],
        terrain: "plains",
      },
      {
        location: [3, 9],
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
        location: [4, 7],
        terrain: "crystal field",
      },
      {
        location: [4, 8],
        terrain: "crystal field",
      },
      {
        location: [4, 9],
        terrain: "plains",
      },
      {
        location: [5, 0],
        terrain: "plains",
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
        terrain: "plains",
      },
      {
        location: [5, 4],
        terrain: "plains",
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
        location: [5, 7],
        terrain: "plains",
      },
      {
        location: [5, 8],
        terrain: "plains",
      },
      {
        location: [5, 9],
        terrain: "plains",
      },
      {
        location: [6, 0],
        terrain: "steel ore",
      },
      {
        location: [6, 1],
        terrain: "steel ore",
      },
      {
        location: [6, 2],
        terrain: "steel ore",
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
        terrain: "plains",
      },
      {
        location: [6, 7],
        terrain: "plains",
      },
      {
        location: [6, 8],
        terrain: "plains",
      },
      {
        location: [6, 9],
        terrain: "plains",
      },
      {
        location: [7, 0],
        terrain: "steel ore",
      },
      {
        location: [7, 1],
        terrain: "steel ore",
      },
      {
        location: [7, 2],
        terrain: "plains",
      },
      {
        location: [7, 3],
        terrain: "plains",
      },
      {
        location: [7, 4],
        terrain: "plains",
      },
      {
        location: [7, 5],
        terrain: "plains",
      },
      {
        location: [7, 6],
        terrain: "plains",
      },
      {
        location: [7, 7],
        terrain: "plains",
      },
      {
        location: [7, 8],
        terrain: "plains",
      },
      {
        location: [7, 9],
        terrain: "crystal field",
      },
      {
        location: [8, 0],
        terrain: "crystal field",
      },
      {
        location: [8, 1],
        terrain: "plains",
      },
      {
        location: [8, 2],
        terrain: "plains",
      },
      {
        location: [8, 3],
        terrain: "plains",
      },
      {
        location: [8, 4],
        terrain: "plains",
      },
      {
        location: [8, 5],
        terrain: "steel ore",
      },
      {
        location: [8, 6],
        terrain: "plains",
      },
      {
        location: [8, 7],
        terrain: "plains",
      },
      {
        location: [8, 8],
        terrain: "plains",
      },
      {
        location: [8, 9],
        terrain: "steel ore",
      },
      {
        location: [9, 0],
        terrain: "plains",
      },
      {
        location: [9, 1],
        terrain: "plains",
      },
      {
        location: [9, 2],
        terrain: "steel ore",
      },
      {
        location: [9, 3],
        terrain: "plains",
      },
      {
        location: [9, 4],
        terrain: "plains",
      },
      {
        location: [9, 5],
        terrain: "plains",
      },
      {
        location: [9, 6],
        terrain: "plains",
      },
      {
        location: [9, 7],
        terrain: "plains",
      },
      {
        location: [9, 8],
        terrain: "plains",
      },
      {
        location: [9, 9],
        terrain: "steel ore",
      },
    ],
    startingLocations: [
      [0, 1],
      [9, 8],
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
