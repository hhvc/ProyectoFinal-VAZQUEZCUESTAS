import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ItemListContainer } from "./components/ItemListContainer";
import { CartProvider } from "./contexts/CartContext";
import NavBar from "./components/NavBar";
import Map from "./components/Map";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { Error404 } from "./components/Error404";
import { ItemDetailContainer } from "./components/ItemDetailContainer";
import { Cart } from "./components/Cart";
import CheckOut from "./components/CheckOut";
import { db } from "./main"; // Importa la instancia de la base de datos
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
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
            <Route
              path="/checkout/:id"
              element={<CheckOut greeting="Confirmación de compras" db={db} />}
            />

            <Route
              path="/login"
              element={
                <Login registro={false} greeting="Formularios de logueo" />
              }
            />
            <Route
              path="/registro"
              element={
                <Login registro={true} greeting="Formulario de registro" />
              }
            />
            <Route path="*" element={<Error404 />} />
          </Routes>
          <Map />
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
export default App;
