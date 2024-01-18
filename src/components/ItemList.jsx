import { Item } from "./Item";

export const ItemList = ({ items }) => {
  return (
    <div className="d-flex flex-wrap justify-content-center">
      {items.map((item, index) => (
        <Item key={item.id} item={item} index={index} className="mx-auto" />
      ))}
    </div>
  );
};
