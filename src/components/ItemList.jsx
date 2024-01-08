import { Item } from "./Item";

export const ItemList = ({ items }) => {
  return (
    <div className="d-flex row">
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};
