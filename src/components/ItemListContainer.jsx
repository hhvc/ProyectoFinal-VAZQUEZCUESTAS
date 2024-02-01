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
      : id === "0kms"
      ? query(collection(db, "automotores"), where("kms", "in", [0, "0", "si", "sí"]))
      : id === "destacados"
      ? query(
          collection(db, "automotores"),
          where("destacado", "in", [true, "true", "VERDADERO", "si", "sí"])
        )
      : query(collection(db, "automotores"), where("kms", "not-in", [0, "0", "si", "sí"]));

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
        <div>
          {items.length > 0 ? (
            <ItemList items={items} />
          ) : (
            <p>No se encontraron automotores para mostrar.</p>
          )}
        </div>
      </Container>
      {/* <Map /> */}
    </>
  );
};
