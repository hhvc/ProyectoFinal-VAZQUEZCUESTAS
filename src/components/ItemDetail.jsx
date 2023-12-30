import { useContext } from "react";
import { ItemCounter } from "./ItemCounter";
import { CartContext } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

export const ItemDetail = ({ item }) => {
  const { onAdd } = useContext(CartContext);
  const { user } = useAuth();

  const add = (quantity) => {
    onAdd(item, quantity);
  };

  return (
    <>
      <h1>{item.marca}</h1>
      <h2>
        {item.modelo} {item.version}
      </h2>
      <img src={item.IMAGEN.DESTACADA} width={400} />
      <p>Año: {item.año}</p>
      <p>Kms: {item.kms}</p>
      {user && (user.rol === "VENDEDOR" || user.rol === "ADMINISTRADOR") && (
        <h3>Precio: ${item.precio.toLocaleString()}</h3>
      )}
      <h4>Stock: {item.STOCK}</h4>
      <ItemCounter onAdd={add} stock={item.STOCK} initial={1} />
    </>
  );
};
