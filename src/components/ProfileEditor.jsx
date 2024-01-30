import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  getFirestore,
  doc,
  updateDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import ReCaptcha from "./ReCaptcha";

const ProfileEditor = () => {
  const [showAlert, setShowAlert] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const db = getFirestore();
  const [userData, setUserData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    direccion: "",
    telefono: "",
  });

  useEffect(() => {
    // Cargar los datos actuales del usuario al montar el componente
    const fetchData = async () => {
      try {
        if (auth.user) {
          const userDocRef = doc(db, "users", auth.user.uid);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            setUserData(userDocSnapshot.data());
          } else {
            // Si el documento del usuario no existe en Firestore.
            // Creamos un nuevo documento con el rol "customer".
            await setDoc(userDocRef, { rol: "customer" }, { merge: true });
            console.log("Nuevo documento de usuario creado en Firestore");
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
              // Restablecer el formulario o redirigir
            }, 2000);

            // Actualizamos el estado con los datos predeterminados.
            setUserData({ rol: "customer" });
          }
        }
      } catch (error) {
        console.error(
          "Error al obtener datos del usuario en Firestore:",
          error
        );
      }
    };

    fetchData();
  }, [auth.user, db]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Actualizar datos en Firestore
    try {
      const userDocRef = doc(db, "users", auth.user.uid);
      await updateDoc(userDocRef, userData);
      console.log("Datos actualizados con éxito en Firestore");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        // Redirigir al usuario al home
        navigate("/home");
      }, 2000);
      return () => clearTimeout(timeout);
    } catch (error) {
      console.error("Error al actualizar datos en Firestore:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card card-body shadow">
            <form onSubmit={handleSubmit}>
              <h3 className="title">Editar Perfil</h3>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  name="nombre"
                  value={userData.nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="apellido" className="form-label">
                  Apellido
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="apellido"
                  name="apellido"
                  value={userData.apellido}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="dni" className="form-label">
                  DNI
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="dni"
                  name="dni"
                  value={userData.dni}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="direccion" className="form-label">
                  Dirección
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="direccion"
                  name="direccion"
                  value={userData.direccion}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="telefono" className="form-label">
                  Teléfono
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="telefono"
                  name="telefono"
                  value={userData.telefono}
                  onChange={handleInputChange}
                />
              </div>
              <ReCaptcha />
              <button type="submit" className="btn btn-primary">
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
      {showAlert && (
        <Alert
          message="Datos guardados con éxito"
          type="success"
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
};

export default ProfileEditor;
