import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import ImgXDefecto from "../assets/LogoSuperAuto1Transparente.svg";

export const Item = ({ item, index }) => {
  const carouselId = `carousel-${index}`; // Genera un identificador único para cada tarjeta
  return (
    <Card style={{ width: "18rem" }} className="mx-auto m-2">
      <div
        id={carouselId} // Utiliza el identificador único en el id del carrusel
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target={`#${carouselId}`}
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target={`#${carouselId}`}
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target={`#${carouselId}`}
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target={`#${carouselId}`}
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
          <button
            type="button"
            data-bs-target={`#${carouselId}`}
            data-bs-slide-to="4"
            aria-label="Slide 5"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            {" "}
            <Card.Img
              variant="top"
              className="d-block w-100"
              alt="Imagen destacada"
              src={item.IMAGEN.DESTACADA || ImgXDefecto}
            />
          </div>
          <div className="carousel-item">
            <Card.Img
              variant="top"
              className="d-block w-100"
              alt="Imagen frontal"
              src={item.IMAGEN.FRENTE || ImgXDefecto}
            />
          </div>
          <div className="carousel-item">
            <Card.Img
              variant="top"
              className="d-block w-100"
              alt="Imagen interior"
              src={item.IMAGEN.INTERIOR || ImgXDefecto}
            />
          </div>
          <div className="carousel-item">
            <Card.Img
              variant="top"
              className="d-block w-100"
              alt="Imagen lateral"
              src={item.IMAGEN.LATERAL || ImgXDefecto}
            />
          </div>
          <div className="carousel-item">
            <Card.Img
              variant="top"
              className="d-block w-100"
              alt="Imagen trasera"
              src={item.IMAGEN.TRASERA || ImgXDefecto}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target={`#${carouselId}`}
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target={`#${carouselId}`}
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <Card.Body>
        <Card.Title>{item.marca}</Card.Title>
        <Card.Text>{item.modelo}</Card.Text>
        <Card.Text>Versión: {item.version}</Card.Text>
        <Card.Text>Año: {item.YEAR}</Card.Text>
        <Card.Text>Kms: {item.kms}</Card.Text>
        <Link to={`/items/${item.id}`}>
          <Button variant="primary">Ver detalle</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};
