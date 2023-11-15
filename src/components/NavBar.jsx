import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { CartWidget } from "./CartWidget";

function NavBar() {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand>
            <NavLink to="">INICIO</NavLink>
          </Navbar.Brand>
          <Nav className="me-auto">
            <NavLink to="category/carne">Carne</NavLink>
            <NavLink to="category/fruta">Fruta</NavLink>
            <NavLink to="category/verdura">Verdura</NavLink>
          </Nav>
          <CartWidget />
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
