import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ItemListContainer } from "./components/ItemListContainer";
import NavBar from "./components/NavBar";
import { Error404 } from "./components/Error404";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<ItemListContainer greeting="Productos" />}
        />
        <Route
          path="/category/:id"
          element={<ItemListContainer greeting="Lista" />}
        />
        <Route path="/items/:id" element={<div>Detalle</div>} />
        <Route
          path="/category/:id"
          element={<ItemListContainer greeting="Hello World" />}
        />
        <Route
          path="*"
          element={<Error404 />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
