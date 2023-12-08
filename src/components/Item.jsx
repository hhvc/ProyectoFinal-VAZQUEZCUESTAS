import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";


export const Item = ({ item }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={item.IMAGEN.DESTACADA} />
      <Card.Body>
        <Card.Title>{item.marca}</Card.Title>
        <Card.Text>{item.modelo}</Card.Text>
        <Card.Text>Versión: {item.version}</Card.Text>
        <Card.Text>Año: {item.año}</Card.Text>
        <Card.Text>Kms: {item.kms}</Card.Text>
        <Link to={`/items/${item.id}`}>
          <Button variant="primary">Ver detalle</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};
