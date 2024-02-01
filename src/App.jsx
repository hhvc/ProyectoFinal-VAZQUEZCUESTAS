import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ItemListContainer } from "./components/ItemListContainer";
import { CartProvider } from "./contexts/CartContext";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import ProfileEditor from "./components/ProfileEditor";
import VehicleForm from "./components/vehicles/VehicleForm";
import VehicleList from "./components/vehicles/VehicleList";
import { Error404 } from "./components/Error404";
import { ItemDetailContainer } from "./components/ItemDetailContainer";
import { Cart } from "./components/Cart";
import CheckOut from "./components/CheckOut";
import { db } from "./main"; // Importa la instancia de la base de datos
import { AuthProvider } from "./contexts/AuthContext";
import SellerDashboard from "./components/SellerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import { Consigna } from "./components/Consigna";
import MassVehicleUpload from "./components/vehicles/MassVehicleUpload";
import VehicleEdit from "./components/vehicles/VehicleEdit";
import Map from "./components/Map";

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
            <Route
              path="/newvehicle"
              element={
                <VehicleEdit
                  registro={true}
                  greeting="Formulario para carga de automotores"
                />
              }
            />
            <Route
              path="/massivevehicleform"
              element={
                <MassVehicleUpload
                  registro={true}
                  greeting="Formulario para actualizar lisatado de automotores en forma masiva"
                />
              }
            />
            <Route
              path="/vehiclelist"
              element={
                <VehicleList
                  registro={true}
                  greeting="Listado de automotores disponibles"
                />
              }
            />
            <Route
              path="editarautomotor/:id"
              element={<VehicleEdit greeting="Editar automotor" />}
            />
            <Route path="/map" element={<Map />} />
            <Route path="/consigna" element={<Consigna />} />
            <Route path="/perfil" element={<ProfileEditor />} />
            <Route path="/dashboardvendedor" element={<SellerDashboard />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
export default App;
