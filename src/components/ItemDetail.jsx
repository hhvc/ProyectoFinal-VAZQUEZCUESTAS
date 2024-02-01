import { useContext, useState } from "react";
import { ItemCounter } from "./ItemCounter";
import { CartContext } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { Card, Button } from "react-bootstrap";
import ImgXDefecto from "../assets/LogoSuperAuto1Transparente.svg";
import { Link } from "react-router-dom";

export const ItemDetail = ({ item }) => {
  const { onAdd } = useContext(CartContext);
  const { userRole } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);

  const add = (quantity) => {
    onAdd(item, quantity);
  };

  const isAdminOrSeller =
    userRole &&
    (userRole === "VENDEDOR" ||
      userRole === "ADMINISTRADOR" ||
      userRole === "SUPERVISOR");

  return (
    <>
      <Card style={{ width: "100%" }} className="mx-auto m-2">
        <div
          id={`carousel-detail`}
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ width: "100%" }}
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
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
            data-bs-target="#carousel-detail"
            data-bs-slide="prev"
            onClick={() =>
              setActiveIndex((prev) => (prev === 0 ? 0 : prev - 1))
            }
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
            data-bs-target="#carousel-detail"
            data-bs-slide="next"
            onClick={() =>
              setActiveIndex((prev) => (prev === 4 ? 4 : prev + 1))
            }
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
          {isAdminOrSeller && <h3>Precio: ${item.precio.toLocaleString()}</h3>}
          <h4>Stock: {item.STOCK}</h4>
          {isAdminOrSeller ? (
            <Link to={`/editarautomotor/${item.id}`}>
              <Button variant="primary">Editar automotor</Button>
            </Link>
          ) : (
            <>
              <ItemCounter onAdd={add} stock={item.STOCK} initial={1} />
              <Button variant="primary" onClick={() => add(1)}>
                Agregar al carrito
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </>
  );
};
