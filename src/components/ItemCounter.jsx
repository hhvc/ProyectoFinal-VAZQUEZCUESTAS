import { useState } from "react";

export const ItemCounter = ({ onAdd, stock, initial }) => {
  const [count, setCount] = useState(initial);

  const handleIncreaseCount = () => {
    if (stock > count) {
      setCount((prev) => prev + 1);
    }
  };

  const handleDecreaseCount = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  const handleAdd = () => {
    onAdd(count);
    setCount(initial);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <mark>{count}</mark>
        <label onClick={handleDecreaseCount}>-</label>
        <label onClick={handleIncreaseCount}>+</label>
      </div>
      <button onClick={handleAdd}>Agregar al carrito</button>
    </>
  );
};
