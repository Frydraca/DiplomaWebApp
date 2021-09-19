import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { initializeScreen } from "../../api/Authentication";
import Catalog from "./DesignerCatalog/Catalog";

function DesignerHelpScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeScreen());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="DesignerHelpScreen">
      <div id="side">
        <Catalog></Catalog>
      </div>
      <div id="main">
        <Container>
          <div className="Lexicon">
            <h3>Rules</h3>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default DesignerHelpScreen;
