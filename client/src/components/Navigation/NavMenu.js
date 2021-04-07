import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

function NavMenu() {
  const activePath = "";

  //const dispatch = useDispatch();

  return (
    <Navbar fixed="top" bg="dark" variant="dark" expand="sm">
      <Navbar.Brand href="#home">Ai Designer</Navbar.Brand>
      {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
      <Navbar.Collapse id="basic-navbar-nav">
        {true ? (
          <Nav className="ml-auto mr-3">
            <Link to="/simulator">Simulator</Link>
            <Link to="/editor">Designer</Link>
          </Nav>
        ) : (
          <Nav className="ml-auto mr-3">
            <Link to="/register">Register</Link>
            <Link to="/login">Log In</Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavMenu;
