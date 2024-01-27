import React, { useState } from "react";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { saveAs } from "file-saver";
// import { CsvWriter } from "filefy";
import Papa from "papaparse";
import { useAuth } from "../contexts/AuthContext";

// Generador de ID automático
function autoId() {
  // Caracteres permitidos en el ID
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Longitud del ID
  const autoIdLength = 20;

  let autoId = "";
  for (let i = 0; i < autoIdLength; i++) {
    const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
    autoId += randomChar;
  }

  return autoId;
}

const MassVehicleUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { userRole, user } = useAuth();
  const db = getFirestore();

  // Verifica si el usuario tiene el rol necesario
  if (!["ADMINISTRADOR"].includes(userRole)) {
    return (
      <div className="container">
        <h3>No tienes permisos para acceder a esta página.</h3>
      </div>
    );
  }

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Por favor, selecciona un archivo");
      return;
    }

    try {
      let userName = "";
      // Obtener el nombre y apellido del usuario desde Firestore
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          userName = `${userData.nombre || ""} ${userData.apellido || ""}`;
        }
      }

      const fileReader = new FileReader();
      fileReader.readAsText(selectedFile);

      fileReader.onload = async (e) => {
        const csvData = e.target.result;

        Papa.parse(csvData, {
          complete: async (result) => {
            console.log("Datos de vehículos:", result.data);

            const automotoresCollection = collection(db, "automotores");

            // Limpiar los datos eliminando propiedades no deseadas
            const cleanData = result.data.map((vehicle) => {
              const { __parsed_extra, ...cleanVehicle } = vehicle;
              return cleanVehicle;
            });

            // Dentro del bucle for (const vehicle of result.data)
            for (const vehicle of cleanData) {
              try {
                // Verificar si el vehículo tiene un ID
                const docId = vehicle.id || autoId();
                const docRef = doc(automotoresCollection, docId);
                const docSnap = await getDoc(docRef);

                // Eliminar las propiedades específicas que no deben ir en el objeto automotor
                const {
                  IMAGEN_DESTACADA,
                  IMAGEN_FRENTE,
                  IMAGEN_INTERIOR,
                  IMAGEN_LATERAL,
                  IMAGEN_TRASERA,
                  ...vehicleWithoutImages
                } = vehicle;

                // Construye el objeto MAP, incluso si no hay datos
                const imageMap = {
                  DESTACADA: IMAGEN_DESTACADA || "",
                  FRENTE: IMAGEN_FRENTE || "",
                  INTERIOR: IMAGEN_INTERIOR || "",
                  LATERAL: IMAGEN_LATERAL || "",
                  TRASERA: IMAGEN_TRASERA || "",
                };

                // Crear un objeto con los datos del vehículo y el mapa de imágenes
                const vehicleData = {
                  ...vehicleWithoutImages,
                  IMAGEN: imageMap,
                  USUARIOCARGA: userName || "",
                  FECHACARGA: formattedDate,
                  FECHAMODIFICACION: formattedDate,
                  ESTADOACTIVO: false,
                };

                if (docSnap.exists()) {
                  // Actualiza solo los campos proporcionados
                  await updateDoc(docRef, vehicleData);
                  console.log(`Documento ${docId} actualizado con éxito.`);
                } else {
                  // Crea el documento en Firestore
                  await setDoc(docRef, vehicleData);
                  console.log(`Documento ${docId} insertado con éxito.`);
                }
              } catch (error) {
                console.error(
                  `Error al procesar el documento ${vehicle.id}:`,
                  error
                );
              }
            }
          },
          header: true,
        });
      };
    } catch (error) {
      console.error("Error al procesar el archivo:", error);
    }
  };

  const handleDownload = async () => {

    const automotoresCollection = collection(db, "automotores");

    try {
      const snapshot = await getDocs(automotoresCollection);
      const vehicles = [];

      snapshot.forEach((doc) => {
        const vehicleData = doc.data();
        const vehicleWithIdAndUrls = {
          id: doc.id, // Agrega el ID del documento
          ...vehicleData,
          IMAGEN_DESTACADA: vehicleData.IMAGEN.DESTACADA,
          IMAGEN_FRENTE: vehicleData.IMAGEN.FRENTE,
          IMAGEN_INTERIOR: vehicleData.IMAGEN.INTERIOR,
          IMAGEN_LATERAL: vehicleData.IMAGEN.LATERAL,
          IMAGEN_TRASERA: vehicleData.IMAGEN.TRASERA,
        };
        vehicles.push(vehicleWithIdAndUrls);
      });

      // Convierte los datos de los vehículos en un CSV
      const csv = Papa.unparse(vehicles);

      // Crea un Blob con el contenido CSV
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

      // Descarga el archivo CSV
      saveAs(blob, "automotores.csv");
    } catch (error) {
      console.error("Error al descargar la colección:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card card-body shadow">
            <h3 className="title">Carga Masiva de Automotores</h3>
            <label htmlFor="fileInput" className="form-label">
              Selecciona un archivo CSV:
            </label>
            <input
              type="file"
              id="fileInput"
              accept=".csv"
              onChange={handleFileUpload}
            />
            <button type="button" onClick={handleUpload}>
              Subir Archivo
            </button>
            <button type="button" onClick={handleDownload}>
              Descargar Colección
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MassVehicleUpload;
