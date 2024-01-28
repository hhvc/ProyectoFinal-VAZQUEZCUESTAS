import React, { useState } from "react";
import {
  getFirestore,
  collection,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { useAuth } from "../contexts/AuthContext";

const MassVehicleUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [editedData, setEditedData] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const { userRole, user } = useAuth();
  const [userNameComplete, setUserNameComplete] = useState("");
  const db = getFirestore();

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();

  if (!["ADMINISTRADOR"].includes(userRole)) {
    return (
      <div className="container">
        <h3>No tienes permisos para acceder a esta página.</h3>
      </div>
    );
  }

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

      let userNameComplete ="";

      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          userNameComplete = `${userData.nombre || ""} ${userData.apellido || ""}`;
          setUserNameComplete(userNameComplete);
        }
      }

      const fileReader = new FileReader();
      fileReader.readAsText(selectedFile);

      fileReader.onload = async (e) => {
        const csvData = e.target.result;

        const parsedData = Papa.parse(csvData, { header: true }).data;
        const enrichedData = parsedData.map((vehicle) => ({
          ...vehicle,
          IMAGEN: {
            DESTACADA: vehicle.IMAGEN_DESTACADA || "",
            FRENTE: vehicle.IMAGEN_FRENTE || "",
            INTERIOR: vehicle.IMAGEN_INTERIOR || "",
            LATERAL: vehicle.IMAGEN_LATERAL || "",
            TRASERA: vehicle.IMAGEN_TRASERA || "",
          },
          USUARIOCARGA: userNameComplete || "",
          FECHACARGA: formattedDate,
          FECHAMODIFICACION: formattedDate,
          ESTADOACTIVO: false,
          id: vehicle.id || "", // Si no hay un id proporcionado, asigna un string vacío
        }));

        setCsvData(enrichedData);
        setEditedData(enrichedData);
        setShowTable(true);
      };
    } catch (error) {
      console.error("Error al procesar el archivo:", error);
    }
  };

  const handleEdit = (index, columnName, value) => {
    const editedDataCopy = [...editedData];
    editedDataCopy[index][columnName] = value;
    setEditedData(editedDataCopy);
  };

  const handleUploadToFirestore = async () => {
    try {
      const automotoresCollection = collection(db, "automotores");

      for (const vehicle of editedData) {
        const { __parsed_extra, id, ...restOfVehicle } = vehicle;

        const docRef = id
          ? doc(automotoresCollection, id)
          : doc(automotoresCollection);
        const docSnap = await getDoc(docRef);

        const {
          IMAGEN_DESTACADA,
          IMAGEN_FRENTE,
          IMAGEN_INTERIOR,
          IMAGEN_LATERAL,
          IMAGEN_TRASERA,
          ...restOfImages
        } = restOfVehicle;

        const imageMap = {
          DESTACADA: IMAGEN_DESTACADA || "",
          FRENTE: IMAGEN_FRENTE || "",
          INTERIOR: IMAGEN_INTERIOR || "",
          LATERAL: IMAGEN_LATERAL || "",
          TRASERA: IMAGEN_TRASERA || "",
        };

        const vehicleData = {
          ...restOfImages,
          IMAGEN: imageMap,
          USUARIOCARGA: userNameComplete || "",
          FECHACARGA: formattedDate,
          FECHAMODIFICACION: formattedDate,
          ESTADOACTIVO: false,
        };

        if (docSnap.exists()) {
          await updateDoc(docRef, vehicleData);
          console.log(`Documento ${docRef.id} actualizado con éxito.`);
        } else {
          await setDoc(docRef, vehicleData);
          console.log(`Documento ${docRef.id} insertado con éxito.`);
        }
      }

      setCsvData(null);
      setEditedData(null);
      setSelectedFile(null);
      setShowTable(false);
    } catch (error) {
      console.error("Error al subir a Firestore:", error);
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
          id: doc.id,
          ...vehicleData,
          IMAGEN_DESTACADA: vehicleData.IMAGEN.DESTACADA,
          IMAGEN_FRENTE: vehicleData.IMAGEN.FRENTE,
          IMAGEN_INTERIOR: vehicleData.IMAGEN.INTERIOR,
          IMAGEN_LATERAL: vehicleData.IMAGEN.LATERAL,
          IMAGEN_TRASERA: vehicleData.IMAGEN.TRASERA,
        };
        vehicles.push(vehicleWithIdAndUrls);
      });

      const csv = Papa.unparse(vehicles);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

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
              Mostrar datos
            </button>
            {showTable && (
              <div>
                <h4>Datos del Archivo CSV</h4>
                <table className="table">
                  <thead>
                    <tr>
                      {Object.keys(csvData[0]).map(
                        (key) =>
                          !["__parsed_extra", "IMAGEN"].includes(key) && (
                            <th key={key}>{key}</th>
                          )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {csvData.map((row, index) => (
                      <tr key={index}>
                        {Object.entries(row).map(
                          ([key, value], colIndex) =>
                            !["__parsed_extra", "IMAGEN"].includes(key) && (
                              <td key={colIndex}>
                                {typeof value === "object" ? (
                                  <div>
                                    {Object.entries(value).map(
                                      ([imgKey, imgValue], imgIndex) => (
                                        <div key={imgIndex}>
                                          <strong>{imgKey}:</strong> {imgValue}
                                        </div>
                                      )
                                    )}
                                  </div>
                                ) : (
                                  <input
                                    type="text"
                                    value={editedData[index][key]}
                                    onChange={(e) =>
                                      handleEdit(index, key, e.target.value)
                                    }
                                  />
                                )}
                              </td>
                            )
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button type="button" onClick={handleUploadToFirestore}>
                  Subir a BD principal
                </button>
              </div>
            )}

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