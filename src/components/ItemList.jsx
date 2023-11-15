import  {Item} from "./Item";

export const ItemList = ({ items }) => {
  return items.map((item)=><Item key={item.id} item={item}/>);
  
};
