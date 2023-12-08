import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { getFirestore, getDoc, doc } from "firebase/firestore";

import { ItemDetail } from "./ItemDetail";

export const ItemDetailContainer = (props) => {
  const [item, setItem] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const db = getFirestore();

    const refDoc = doc(db, "automotores", id);

    getDoc(refDoc).then((snapshot) => {
      if (snapshot.exists()) {
        setItem({ id: snapshot.id, ...snapshot.data() });
      }
    });
  }, [id]);

  return (
    <Container className="mt-4">
    <h1>
      {props.greeting}
    </h1>
      {item ? <ItemDetail item={item} /> : <>Loading...</>}
    </Container>
  );
};
