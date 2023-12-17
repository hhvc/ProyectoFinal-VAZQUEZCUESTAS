import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

const CheckOut = ({ greeting, db }) => {
  const { id } = useParams();
  const orderId = id;

  const [buyerInfo, setBuyerInfo] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getOrderData = async () => {
      try {
        if (!orderId) {
          console.error("ID de compra no especificado");
          return;
        }

        const orderRef = doc(db, "orders", orderId);
        const orderSnapshot = await getDoc(orderRef);

        if (orderSnapshot.exists()) {
          const orderData = orderSnapshot.data();
          setBuyerInfo(orderData.buyer);
          setItems(orderData.items);
          setTotal(orderData.total);
        } else {
          console.error("La orden no existe");
        }
      } catch (error) {
        console.error("Error al obtener la orden:", error);
      }
    };

    getOrderData();
  }, [orderId, db]);

  return (
    <Container className="mt-4">
      <h1>{greeting}</h1>
      <h2>Gracias por tu compra. Aquí está el resumen:</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio unitario</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.modelo}</td>
              <td>{item.quantity}</td>
              <td>${item.precio}</td>
              <td>${item.quantity * item.precio}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3>Total de la compra: ${total}</h3>
      <h3>Datos del Comprador:</h3>
      <p>Nombre: {buyerInfo.name}</p>
      <p>Teléfono: {buyerInfo.phone}</p>
      <p>Email: {buyerInfo.email}</p>
      <p>ID de la compra: {orderId}</p>
      <Button href="/">Volver a la Tienda</Button>
    </Container>
  );
};

export default CheckOut;
