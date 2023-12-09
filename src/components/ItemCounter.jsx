import { useState } from "react";
import Button from "react-bootstrap/Button";

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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={handleDecreaseCount}
            style={{
              fontSize: "1.5em",
              padding: "5px 10px",
              marginRight: "5px",
            }}
          >
            -
          </Button>
          <mark style={{ margin: "0 5px", fontSize: "1.2em" }}>{count}</mark>
          <Button
            onClick={handleIncreaseCount}
            style={{
              fontSize: "1.5em",
              padding: "5px 10px",
              marginLeft: "5px",
            }}
          >
            +
          </Button>
        </div>
        <Button onClick={handleAdd} style={{ marginTop: "10px" }}>
          Agregar al carrito
        </Button>
      </div>
    </>
  );
};
