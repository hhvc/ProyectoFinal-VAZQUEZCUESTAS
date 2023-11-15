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
            <NavLink to="category/carne" className={"m-2"}>Carne</NavLink>
            <NavLink to="category/fruta" className={"m-2"}>Fruta</NavLink>
            <NavLink to="category/verdura" className={"m-2"}>Verdura</NavLink>
          </Nav>
          <CartWidget />
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
