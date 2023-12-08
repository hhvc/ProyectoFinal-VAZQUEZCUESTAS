import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Nav, Navbar } from "react-bootstrap";
import logo from "../assets/logoCarsas.svg";

import { CartWidget } from "./CartWidget";

function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <NavLink to="" className="navbar-brand"><img src={logo} alt="Logo" width="64" height="64" /></NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="category/0kms" className="nav-link">
              0 kms
            </NavLink>
            <NavLink to="category/usados" className="nav-link">
              Usados
            </NavLink>
            <NavLink to="category/destacados" className="nav-link">
              Destacados
            </NavLink>
          </Nav>
        </Navbar.Collapse>
        <CartWidget />
      </Container>
    </Navbar>
  );
}

export default NavBar;
