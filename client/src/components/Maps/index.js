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
    name: "huge 20x20",
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
        terrain: "plains",
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
        location: [0, 10],
        terrain: "steel ore",
      },
      {
        location: [0, 11],
        terrain: "steel ore",
      },
      {
        location: [0, 12],
        terrain: "plains",
      },
      {
        location: [0, 13],
        terrain: "plains",
      },
      {
        location: [0, 14],
        terrain: "plains",
      },
      {
        location: [1, 0],
        terrain: "plains",
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
        terrain: "steel ore",
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
        location: [1, 10],
        terrain: "crystal field",
      },
      {
        location: [1, 11],
        terrain: "plains",
      },
      {
        location: [1, 12],
        terrain: "plains",
      },
      {
        location: [1, 13],
        terrain: "plains",
      },
      {
        location: [1, 14],
        terrain: "plains",
      },
      {
        location: [2, 0],
        terrain: "crystal field",
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
        terrain: "plains",
      },
      {
        location: [2, 7],
        terrain: "steel ore",
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
        location: [2, 10],
        terrain: "plains",
      },
      {
        location: [2, 11],
        terrain: "plains",
      },
      {
        location: [2, 12],
        terrain: "plains",
      },
      {
        location: [2, 13],
        terrain: "plains",
      },
      {
        location: [2, 14],
        terrain: "plains",
      },
      {
        location: [3, 0],
        terrain: "plains",
      },
      {
        location: [3, 1],
        terrain: "steel ore",
      },
      {
        location: [3, 2],
        terrain: "steel ore",
      },
      {
        location: [3, 3],
        terrain: "plains",
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
        terrain: "plains",
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
        location: [3, 10],
        terrain: "plains",
      },
      {
        location: [3, 11],
        terrain: "plains",
      },
      {
        location: [3, 12],
        terrain: "plains",
      },
      {
        location: [3, 13],
        terrain: "plains",
      },
      {
        location: [3, 14],
        terrain: "steel ore",
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
        terrain: "steel ore",
      },
      {
        location: [4, 6],
        terrain: "plains",
      },
      {
        location: [4, 7],
        terrain: "plains",
      },
      {
        location: [4, 8],
        terrain: "plains",
      },
      {
        location: [4, 9],
        terrain: "plains",
      },
      {
        location: [4, 10],
        terrain: "plains",
      },
      {
        location: [4, 11],
        terrain: "plains",
      },
      {
        location: [4, 12],
        terrain: "plains",
      },
      {
        location: [4, 13],
        terrain: "plains",
      },
      {
        location: [4, 14],
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
        terrain: "steel ore",
      },
      {
        location: [5, 10],
        terrain: "steel ore",
      },
      {
        location: [5, 11],
        terrain: "plains",
      },
      {
        location: [5, 12],
        terrain: "plains",
      },
      {
        location: [5, 13],
        terrain: "plains",
      },
      {
        location: [5, 14],
        terrain: "plains",
      },
      {
        location: [6, 0],
        terrain: "plains",
      },
      {
        location: [6, 1],
        terrain: "plains",
      },
      {
        location: [6, 2],
        terrain: "plains",
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
        location: [6, 10],
        terrain: "plains",
      },
      {
        location: [6, 11],
        terrain: "plains",
      },
      {
        location: [6, 12],
        terrain: "plains",
      },
      {
        location: [6, 13],
        terrain: "plains",
      },
      {
        location: [6, 14],
        terrain: "plains",
      },
      {
        location: [7, 0],
        terrain: "plains",
      },
      {
        location: [7, 1],
        terrain: "plains",
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
        terrain: "crystal field",
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
        terrain: "plains",
      },
      {
        location: [7, 10],
        terrain: "steel ore",
      },
      {
        location: [7, 11],
        terrain: "steel ore",
      },
      {
        location: [7, 12],
        terrain: "plains",
      },
      {
        location: [7, 13],
        terrain: "plains",
      },
      {
        location: [7, 14],
        terrain: "plains",
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
        terrain: "plains",
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
        terrain: "plains",
      },
      {
        location: [8, 10],
        terrain: "plains",
      },
      {
        location: [8, 11],
        terrain: "steel ore",
      },
      {
        location: [8, 12],
        terrain: "plains",
      },
      {
        location: [8, 13],
        terrain: "crystal field",
      },
      {
        location: [8, 14],
        terrain: "crystal field",
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
        terrain: "plains",
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
        terrain: "plains",
      },
      {
        location: [9, 10],
        terrain: "plains",
      },
      {
        location: [9, 11],
        terrain: "plains",
      },
      {
        location: [9, 12],
        terrain: "plains",
      },
      {
        location: [9, 13],
        terrain: "plains",
      },
      {
        location: [9, 14],
        terrain: "plains",
      },
      {
        location: [10, 0],
        terrain: "steel ore",
      },
      {
        location: [10, 1],
        terrain: "plains",
      },
      {
        location: [10, 2],
        terrain: "plains",
      },
      {
        location: [10, 3],
        terrain: "plains",
      },
      {
        location: [10, 4],
        terrain: "plains",
      },
      {
        location: [10, 5],
        terrain: "plains",
      },
      {
        location: [10, 6],
        terrain: "plains",
      },
      {
        location: [10, 7],
        terrain: "steel ore",
      },
      {
        location: [10, 8],
        terrain: "plains",
      },
      {
        location: [10, 9],
        terrain: "plains",
      },
      {
        location: [10, 10],
        terrain: "plains",
      },
      {
        location: [10, 11],
        terrain: "crystal field",
      },
      {
        location: [10, 12],
        terrain: "plains",
      },
      {
        location: [10, 13],
        terrain: "plains",
      },
      {
        location: [10, 14],
        terrain: "plains",
      },
      {
        location: [11, 0],
        terrain: "steel ore",
      },
      {
        location: [11, 1],
        terrain: "steel ore",
      },
      {
        location: [11, 2],
        terrain: "steel ore",
      },
      {
        location: [11, 3],
        terrain: "plains",
      },
      {
        location: [11, 4],
        terrain: "plains",
      },
      {
        location: [11, 5],
        terrain: "plains",
      },
      {
        location: [11, 6],
        terrain: "plains",
      },
      {
        location: [11, 7],
        terrain: "steel ore",
      },
      {
        location: [11, 8],
        terrain: "plains",
      },
      {
        location: [11, 9],
        terrain: "plains",
      },
      {
        location: [11, 10],
        terrain: "steel ore",
      },
      {
        location: [11, 11],
        terrain: "plains",
      },
      {
        location: [11, 12],
        terrain: "plains",
      },
      {
        location: [11, 13],
        terrain: "plains",
      },
      {
        location: [11, 14],
        terrain: "plains",
      },
      {
        location: [12, 0],
        terrain: "steel ore",
      },
      {
        location: [12, 1],
        terrain: "steel ore",
      },
      {
        location: [12, 2],
        terrain: "plains",
      },
      {
        location: [12, 3],
        terrain: "plains",
      },
      {
        location: [12, 4],
        terrain: "plains",
      },
      {
        location: [12, 5],
        terrain: "plains",
      },
      {
        location: [12, 6],
        terrain: "plains",
      },
      {
        location: [12, 7],
        terrain: "plains",
      },
      {
        location: [12, 8],
        terrain: "plains",
      },
      {
        location: [12, 9],
        terrain: "plains",
      },
      {
        location: [12, 10],
        terrain: "plains",
      },
      {
        location: [12, 11],
        terrain: "plains",
      },
      {
        location: [12, 12],
        terrain: "plains",
      },
      {
        location: [12, 13],
        terrain: "crystal field",
      },
      {
        location: [12, 14],
        terrain: "plains",
      },
      {
        location: [13, 0],
        terrain: "steel ore",
      },
      {
        location: [13, 1],
        terrain: "plains",
      },
      {
        location: [13, 2],
        terrain: "steel ore",
      },
      {
        location: [13, 3],
        terrain: "steel ore",
      },
      {
        location: [13, 4],
        terrain: "plains",
      },
      {
        location: [13, 5],
        terrain: "plains",
      },
      {
        location: [13, 6],
        terrain: "plains",
      },
      {
        location: [13, 7],
        terrain: "plains",
      },
      {
        location: [13, 8],
        terrain: "plains",
      },
      {
        location: [13, 9],
        terrain: "steel ore",
      },
      {
        location: [13, 10],
        terrain: "steel ore",
      },
      {
        location: [13, 11],
        terrain: "plains",
      },
      {
        location: [13, 12],
        terrain: "plains",
      },
      {
        location: [13, 13],
        terrain: "plains",
      },
      {
        location: [13, 14],
        terrain: "plains",
      },
      {
        location: [14, 0],
        terrain: "steel ore",
      },
      {
        location: [14, 1],
        terrain: "plains",
      },
      {
        location: [14, 2],
        terrain: "plains",
      },
      {
        location: [14, 3],
        terrain: "plains",
      },
      {
        location: [14, 4],
        terrain: "plains",
      },
      {
        location: [14, 5],
        terrain: "crystal field",
      },
      {
        location: [14, 6],
        terrain: "plains",
      },
      {
        location: [14, 7],
        terrain: "plains",
      },
      {
        location: [14, 8],
        terrain: "plains",
      },
      {
        location: [14, 9],
        terrain: "plains",
      },
      {
        location: [14, 10],
        terrain: "plains",
      },
      {
        location: [14, 11],
        terrain: "plains",
      },
      {
        location: [14, 12],
        terrain: "plains",
      },
      {
        location: [14, 13],
        terrain: "plains",
      },
      {
        location: [14, 14],
        terrain: "crystal field",
      },
    ],
    startingLocations: [
      [0, 1],
      [14, 13],
    ],
  };

  function addNewMap() {
    dispatch(addMap(newMap));
    dispatch(loadMaps());
  }

  return (
    <Container>
      <h3>Map list</h3>
      {/* <Button onClick={addNewMap}> Add map (just testing)</Button> */}
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
