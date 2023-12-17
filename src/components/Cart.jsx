import { useContext, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { collection, getFirestore, addDoc } from "firebase/firestore";
import OrderForm from "./OrderForm.jsx";

import { CartContext } from "../contexts/CartContext.jsx";

const initialValues = {
  name: "",
  phone: "",
  email: "",
};

export const Cart = (props) => {
  const [buyer, setBuyer] = useState(initialValues);

  const { clear, items, onRemove } = useContext(CartContext);

  const navigate = useNavigate();

  const total = items.reduce(
    (acumulador, valorActual) =>
      acumulador + valorActual.quantity * valorActual.precio,
    0
  );

  const handleChange = (event) => {
    setBuyer((buyer) => {
      return { ...buyer, [event.target.name]: event.target.value };
    });
  };

  const sendOrder = async () => {
    if (!buyer.name || !buyer.email || !buyer.phone) {
      alert("Por favor, complete todos los campos.");
      return;
    }
  
    const calculatedTotal = items.reduce(
      (acumulador, valorActual) =>
        acumulador + valorActual.quantity * valorActual.precio,
      0
    );
  
    const order = {
      buyer,
      items,
      total: calculatedTotal,
    };
  
    try {
      const db = getFirestore();
      const orderCollection = collection(db, "orders");
  
      const docRef = await addDoc(orderCollection, order);
      const orderId = docRef.id;
  
      if (orderId) {
        alert("Su orden fue procesada con éxito. ID: " + orderId);
        setBuyer(initialValues);
        clear();
        navigate(`/checkout/${orderId}`);
      } else {
        console.error("No se pudo obtener el ID de la orden");
      }
    } catch (error) {
      console.error("Error al procesar la orden:", error);
    }
  };
  
  

  if (!items.length) {
    return (
      <Container className="mt-4">
        <h2>El carrito está vacío</h2>
        <Button onClick={() => navigate("/")}>Volver</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1>{props.greeting}</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Imagen</th>
            <th>Precio</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item) => (
            <tr key={item.id}>
              <td>{item.modelo}</td>
              <td className="text-center">{item.quantity}</td>
              <td>
                <img src={item.IMAGEN.DESTACADA} width={300} alt={item.modelo} />
              </td>
              <td>$ {item.precio.toLocaleString()}</td>
              <td className="text-center" onClick={() => onRemove(item.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total $ {total.toLocaleString()}</td>
          </tr>
        </tfoot>
      </Table>
      <Button onClick={clear}>Vaciar Carrito</Button>
      <hr />
      <br />
      <h3>Por favor, completa el formulario para confirmar la compra:</h3>
      <br />
      <OrderForm
        buyer={buyer}
        handleChange={handleChange}
        sendOrder={sendOrder}
      />
    </Container>
  );
};

