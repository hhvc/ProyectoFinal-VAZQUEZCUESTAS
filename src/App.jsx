import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ItemListContainer } from "./components/ItemListContainer";
import NavBar from "./components/NavBar";
import { Error404 } from "./components/Error404";
import { ItemDetailContainer } from "./components/ItemDetailContainer";

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
          element={<ItemListContainer greeting="Lista por categoría" />}
        />
        <Route path="/items/:id" element={<ItemDetailContainer/>} />
        {/* <Route
          path="/category/:id"
          element={<ItemListContainer greeting="Hello World" />}
        /> */}
        <Route
          path="*"
          element={<Error404 />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
