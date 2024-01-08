import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { ItemList } from "./ItemList";
import { Item } from "./Item";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Map from "./Map";

export const ItemListContainer = (props) => {
  const [items, setItems] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const db = getFirestore();

    const refCollection = !id
      ? collection(db, "automotores")
      : id == "0kms"
      ? query(collection(db, "automotores"), where("kms", "==", 0))
      : id == "destacados"
      ? query(collection(db, "automotores"), where("destacado", "==", true))
      : query(collection(db, "automotores"), where("kms", ">", 0));

    getDocs(refCollection).then((snapshot) => {
      if (snapshot.size === 0)
        console.log("No se encontraron automotores para mostrar");
      else
        setItems(
          snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          })
        );
    });
  }, [id]);

  return (
    <>
      <Container className="mt-4">
        <h1>{props.greeting}</h1>
        <div className="row">
          {items ? <ItemList items={items} /> : <>Loading ...</>}
        </div>
      </Container>
      <Map />
      {/* <Container className="mt-4">
        <h1>{props.greeting}</h1>
        <div className="row">
          {items ? (
            items.map((item) => (
              <div key={item.id} className="col-md-2 col-8 mb-3">
                <Item item={item} />
              </div>
            ))
          ) : (
            <>Loading ...</>
          )}
        </div>
      </Container> */}
    </>
  );
};
