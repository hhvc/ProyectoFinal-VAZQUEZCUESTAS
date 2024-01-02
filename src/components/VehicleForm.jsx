import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import Alert from "./Alert";

const VehicleForm = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const auth = useAuth();
  const db = getFirestore();
  const [vehicleData, setVehicleData] = useState({
    STOCK: 0,
    año: 0,
    combustible: "",
    destacado: false,
    kms: 0,
    marca: "",
    modelo: "",
    precio: 0,
    version: "",
    IMAGEN: {
      DESTACADA: "",
      FRENTE: "",
      INTERIOR: "",
      LATERAL: "",
      TRASERA: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const subirArchivo = async () => {
    if (!selectedFile) {
      alert("Por favor, selecciona un archivo");
      return;
    }

    try {
      const storageRef = ref(storage, selectedFile.name);
      await uploadBytes(storageRef, selectedFile);
      console.log("Terminó la descarga...");

      const url = await getDownloadURL(storageRef);
      console.log("URL de descarga:", url);

      setVehicleData((prevData) => ({
        ...prevData,
        IMAGEN: {
          ...prevData.IMAGEN,
          DESTACADA: url,
        },
      }));

      setSelectedFile(null); // Limpiar el archivo seleccionado después de la carga
    } catch (error) {
      console.error("Error al subir archivo:", error);
    }
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
              <div className="mb-3">
                <label htmlFor="marca" className="form-label">
                  Marca
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="marca"
                  name="marca"
                  value={vehicleData.marca}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="modelo" className="form-label">
                  Modelo
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="modelo"
                  name="modelo"
                  value={vehicleData.modelo}
                  onChange={handleInputChange}
                />
              </div>
              {/* Otros campos del formulario */}
              <div className="mb-3">
                <label htmlFor="precio" className="form-label">
                  Precio
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="precio"
                  name="precio"
                  value={vehicleData.precio}
                  onChange={handleInputChange}
                />
              </div>
              {/* Campos para subir imágenes */}
              <label htmlFor="imagenDestacada" className="form-label">
                Imagen Destacada
              </label>
              <input
                type="file"
                accept="image/*"
                id="imagenDestacada"
                onChange={(e) =>
                  handleImageUpload(e, "DESTACADA")
                }
              />
              <button type="button" onClick={subirArchivo}>
                Subir Imagen
              </button>
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
