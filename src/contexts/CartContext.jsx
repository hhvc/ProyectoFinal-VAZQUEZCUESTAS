import { createContext, useState } from "react";

export const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const clear = () => setItems([]);

  const onAdd = (item, quantity) => {
    const exist = items.some((i) => i.id === item.id);
    if (exist) {
      const updateItems = items.map((i) => {
        if (i.id === item.id) {
          return {
            ...i,
            quantity: i.quantity + quantity,
          };
        } else {
          return i;
        }
      });
      setItems(updateItems);
    } else {
      setItems((prev) => {
        return [...prev, { ...item, quantity }];
      });
    }
  };

  const onRemove = (id) => {
    const filterItems = items.filter((item) => item.id !== id);
    setItems(filterItems);
  };

  return (
    <CartContext.Provider value={{ items, clear, onAdd, onRemove }}>
      {children}
    </CartContext.Provider>
  );
};
