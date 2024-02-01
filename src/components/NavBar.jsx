import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from "../assets/LogoSuperAutoTransparente2.png";
import { CartWidget } from "./CartWidget";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const auth = useAuth();
  const navigate = useNavigate();
  const userDisplayName = auth.userName || "Usuario invitado";
  const { userFotoPerfil} = useAuth();
  const userPhotoURL = userFotoPerfil || auth.user?.photoURL || null;
  const renderProfileLink = () => {
    return (
      <NavDropdown.Item onClick={handleEditProfileClick}>
        <div className="d-flex align-items-center">
          {userPhotoURL ? (
            <img
              src={userPhotoURL}
              alt="User"
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-person-fill-gear"
              viewBox="0 0 16 16"
            >
              <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
            </svg>
          )}
          <div>Editar Perfil</div>
        </div>
      </NavDropdown.Item>
    );
  };

  const renderRoleSpecificLinks = () => {
    const role = auth.userRole ? auth.userRole : null;

    switch (role) {
      case "VENDEDOR":
        return (
          <>
            <NavDropdown.Divider />
            <NavDropdown.Item as={NavLink} to="/dashboardvendedor">
              Dashboard Vendedor
            </NavDropdown.Item>
          </>
        );
      case "ADMINISTRADOR":
        return (
          <>
            <NavDropdown.Divider />
            <NavDropdown.Item as={NavLink} to="/admindashboard">
              Dashboard Administrador
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/dashboardvendedor">
              Dashboard Vendedor
            </NavDropdown.Item>
          </>
        );
      default:
        return null;
    }
  };

  const handleEditProfileClick = () => {
    navigate("/perfil");
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand>
          <NavLink to="" className="navbar-brand">
            <img src={logo} alt="Logo" width="200" />
          </NavLink>
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
            <NavLink to="consigna" className="nav-link">
              Vendé tu auto
            </NavLink>
          </Nav>
        </Navbar.Collapse>
        <NavDropdown
          title={
            <>
              {auth.user ? (
                <>
                  {userPhotoURL ? (
                    <img
                      src={userPhotoURL}
                      alt="User"
                      width="32"
                      height="32"
                      className="rounded-circle"
                      style={{ marginRight: "8px" }}
                    />
                  ) : (
                    // Enlace a la imagen por defecto
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="currentColor"
                      className="bi bi-person-fill-gear"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                    </svg>
                  )}
                  {userDisplayName}
                </>
              ) : (
                <>
                  <img
                    src="https://img2.freepng.es/20190622/uih/kisspng-person-computer-icons-question-mark-portable-netwo-5d0ee9ed8a09b7.9577084615612584775654.jpg"
                    alt="Default User"
                    width="32"
                    height="32"
                    className="rounded-circle"
                  />
                  Anonimo
                </>
              )}
            </>
          }
          id="basic-nav-dropdown"
        >
          {auth.user ? (
            <>
              {renderProfileLink()}
              {renderRoleSpecificLinks()}
              <NavDropdown.Divider />
              <NavDropdown.Item href="#" onClick={auth.logout}>
                Desloguearse
              </NavDropdown.Item>
            </>
          ) : (
            <>
              <NavDropdown.Item as={NavLink} to="/login">
                Loguearse
              </NavDropdown.Item>
              <NavDropdown.Item onClick={auth.loginWithGoogle}>
                Loguearse con Google
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/registro">
                Crear Cuenta
              </NavDropdown.Item>
            </>
          )}
        </NavDropdown>
        <CartWidget />
      </Container>
    </Navbar>
  );
}

export default NavBar;
