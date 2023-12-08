import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ItemListContainer } from "./components/ItemListContainer";
import { CartProvider } from "./contexts/CartContext";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Error404 } from "./components/Error404";
import { ItemDetailContainer } from "./components/ItemDetailContainer";
import { Cart } from "./components/Cart";

function App() {
  return (
    <CartProvider>
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
          <Route
            path="/items/:id"
            element={<ItemDetailContainer greeting="Producto" />}
          />
          <Route
            path="/cart"
            element={<Cart greeting="Carrito de compras" />}
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
        {/* <div className="container-fluid"> */}
          <Footer />
        {/* </div> */}
      </BrowserRouter>
    </CartProvider>
  );
}
export default App;
