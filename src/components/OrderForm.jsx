import React from "react";
import { Form, Button } from "react-bootstrap";

const OrderForm = ({ buyer, handleChange, sendOrder }) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={buyer.email}
          onChange={handleChange}
          name="email"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          value={buyer.name}
          onChange={handleChange}
          name="name"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Teléfono/ celular</Form.Label>
        <Form.Control
          type="text"
          value={buyer.phone}
          onChange={handleChange}
          name="phone"
          required
        />
      </Form.Group>
      <Button variant="primary" type="button" onClick={sendOrder}>
        Enviar
      </Button>
    </Form>
  );
};

export default OrderForm;
