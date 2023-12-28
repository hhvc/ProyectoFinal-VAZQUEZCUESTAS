import { Link } from "react-router-dom";
import cart from "../assets/carritoCompras.png";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

export const CartWidget = () => {
  const { items } = useContext(CartContext);

  const total = items.reduce(
    (acumulador, valorActual) => acumulador + valorActual.quantity,
    0
  );

  return (
    <Link to="/cart" className="d-flex align-items-center m-3">
      <img src={cart} alt="carrito de compras" width={30} />
      <span>{total}</span>
    </Link>
  );
};
