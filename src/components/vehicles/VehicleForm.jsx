import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Alert from "../Alert";

const VehicleForm = () => {
  const storage = getStorage();
  const [showAlert, setShowAlert] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const { userRole } = useAuth();
  // Verifica si el usuario tiene el rol necesario
  if (!["VENDEDOR", "SUPERVISOR", "ADMINISTRADOR"].includes(userRole)) {
    return (
      <div className="container">
        <h3>No tienes permisos para acceder a esta página.</h3>
      </div>
    );
  }
  const db = getFirestore();

  const atributosAutomotor = [
    { nombre: "marca", tipo: "text", label: "Marca" },
    { nombre: "modelo", tipo: "text", label: "Modelo" },
    { nombre: "version", tipo: "text", label: "Versión" },
    { nombre: "YEAR", tipo: "number", label: "Año" },
    { nombre: "DOMINIO", tipo: "text", label: "Patente/ dominio" },
    { nombre: "combustible", tipo: "text", label: "Tipo de Combustible" },
    { nombre: "kms", tipo: "number", label: "Kms" },
    { nombre: "precio", tipo: "text", label: "precio" },
    // Agrega más atributos según sea necesario
  ];

  const [vehicleData, setVehicleData] = useState({
    STOCK: 0,
    combustible: "",
    destacado: false,
    kms: 0,
    precio: 0,
    version: "",
    CONCESIONARIO: "SUPERAUTO",
    DOMINIO: "",
    USERCARGA: "",
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
      const storageRef = ref(storage, `vehiclesimg/${selectedFile.name}`);
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

      setSelectedFile(null);
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

              {atributosAutomotor.map((atributo) => (
                <div className="mb-3" key={atributo.nombre}>
                  <label htmlFor={atributo.nombre} className="form-label">
                    {atributo.label}
                  </label>
                  <input
                    type={atributo.tipo}
                    className="form-control"
                    id={atributo.nombre}
                    name={atributo.nombre}
                    value={vehicleData[atributo.nombre]}
                    onChange={handleInputChange}
                  />
                </div>
              ))}

              <label htmlFor="imagenDestacada" className="form-label">
                Imagen Destacada
              </label>
              <input
                type="file"
                accept="image/*"
                id="imagenDestacada"
                onChange={(e) => handleImageUpload(e, "DESTACADA")}
              />
              <button type="button" onClick={subirArchivo}>
                Subir Imagen
              </button>
              <label htmlFor="imagenFrente" className="form-label">
                Imagen Frente
              </label>
              <input
                type="file"
                accept="image/*"
                id="imagenFrente"
                onChange={(e) => handleImageUpload(e, "FRENTE")}
              />
              <button type="button" onClick={subirArchivo}>
                Subir Imagen
              </button>
              <label htmlFor="imagenInterior" className="form-label">
                Imagen Interior
              </label>
              <input
                type="file"
                accept="image/*"
                id="imagenInterior"
                onChange={(e) => handleImageUpload(e, "INTERIOR")}
              />
              <button type="button" onClick={subirArchivo}>
                Subir Imagen
              </button>
              <label htmlFor="imagenLateral" className="form-label">
                Imagen Lateral
              </label>
              <input
                type="file"
                accept="image/*"
                id="imagenLateral"
                onChange={(e) => handleImageUpload(e, "LATERAL")}
              />
              <button type="button" onClick={subirArchivo}>
                Subir Imagen
              </button>
              <label htmlFor="imagenTrasera" className="form-label">
                Imagen Trasera
              </label>
              <input
                type="file"
                accept="image/*"
                id="imagenTrasera"
                onChange={(e) => handleImageUpload(e, "TRASERA")}
              />
              <button type="button" onClick={subirArchivo}>
                Subir Imagen
              </button>

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
