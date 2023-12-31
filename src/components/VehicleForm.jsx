import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import Alert from "./Alert";

const VehicleForm = () => {
  const [showAlert, setShowAlert] = useState(false);
  const auth = useAuth();
  const db = getFirestore();
  const [vehicleData, setVehicleData] = useState({
    stock: 0,
    year: 0,
    fuel: "",
    featured: false,
    kms: 0,
    brand: "",
    model: "",
    price: 0,
    version: "",
    images: {
      featured: "",
      front: "",
      side: "",
      back: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (file, type) => {
    // Lógica para subir la imagen a Cloud Storage y obtener la URL
    // Puedes usar Firebase Storage o la solución que prefieras
    // Luego actualiza el estado con la URL obtenida
    const imageUrl = ""; // Obtener la URL de Cloud Storage
    setVehicleData((prevData) => ({
      ...prevData,
      images: {
        ...prevData.images,
        [type]: imageUrl,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Agregar el vehículo a la colección de Firestore
    try {
      await addDoc(collection(db, "automotores"), {
        ...vehicleData,
        // Otros campos si es necesario
      });

      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        // Restablecer el formulario o redirigir
      }, 2000);
    } catch (error) {
      console.error("Error al agregar vehículo a Firestore:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card card-body shadow">
            <form onSubmit={handleSubmit}>
              <h3 className="title">Alta de Automotor</h3>
              {/* Otros campos de formulario */}
              <div className="mb-3">
                <label htmlFor="brand" className="form-label">
                  Marca
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="brand"
                  name="brand"
                  value={vehicleData.brand}
                  onChange={handleInputChange}
                />
              </div>
              {/* Campos para subir imágenes */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageUpload(e.target.files[0], "featured")
                }
              />
              {/* Otros campos de imagen */}
              {/* ... */}
              <button type="submit" className="btn btn-primary">
                Guardar Automotor
              </button>
            </form>
          </div>
        </div>
      </div>
      {showAlert && (
        <Alert
          message="Automotor agregado con éxito"
          type="success"
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
};

export default VehicleForm;
