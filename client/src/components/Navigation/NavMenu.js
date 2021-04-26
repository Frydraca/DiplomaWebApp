import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logOut, isLoggedIn } from "../../api/Authentication";

function NavMenu() {
  const dispatch = useDispatch();

  return (
    <Navbar fixed="top" bg="dark" variant="dark" expand="sm">
      <Navbar.Brand href="/">Ai Designer</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto mr-3">
          {isLoggedIn() ? (
            <>
              <Nav.Link href="/mapList">Maps</Nav.Link>
              <Nav.Link href="/simulator">Simulator</Nav.Link>
              <Nav.Link href="/designer/new">Designer</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link href="/help">Help</Nav.Link>
              <Nav.Link onClick={() => dispatch(logOut())}>Log out</Nav.Link>
            </>
          ) : (
            <></>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavMenu;
