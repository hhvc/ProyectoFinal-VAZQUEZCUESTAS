import Container from "react-bootstrap/Container";
import logo from "../assets/logoCarsas.svg";

function Footer() {
  return (
    <footer className="bd-footer py-4 py-md-5 mt-5 bg-light">
      <Container
        style={{
          padding: "1rem",
          paddingTop: "1.5rem",
          paddingBottom: "1.5rem",
        }}
      >
        <div className="row">
          <a
            className="d-inline-flex align-items-center mb-2 link-dark text-decoration-none"
            href="/"
            aria-label="Inicio"
          >
            <img src={logo} alt="Logo" width="64" height="64" className="me-3" />
            <span className="fs-5">Carsas - Proyecto educativo</span>
          </a>
          <ul className="list-unstyled small text-muted">
            <li className="mb-2">
              Éste e-commerce es el trabajo final del curso de React de{" "}
              <a href="https://www.coderhouse.com/">Coderhouse </a>.
            </li>
            <li className="mb-2">Alumno: Héctor Vázquez Cuestas</li>
            <li className="mb-2">Comisión: 49875</li>
            <li className="mb-2">Profesor: Julio Avantt</li>
            <li className="mb-2">Tutor: Juan Manuel Chico</li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
