import { Item } from "./Item";

export const ItemList = ({ items }) => {
  return (
    <div className="d-flex row mx-auto">
      {items.map((item) => (
        <Item key={item.id} item={item} className="mx-auto"/>
      ))}
    </div>
  );
};
