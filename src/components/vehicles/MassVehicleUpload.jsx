import React, { useState, useEffect } from "react";
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
import { useAuth } from "../../contexts/AuthContext";
import UploadForm from "./UploadForm";
import VehicleTable from "./VehicleTable";

const MassVehicleUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [editedData, setEditedData] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const { user, userRole, userName, userLastName } = useAuth();
  const [userNameComplete, setUserNameComplete] = useState("");
  const db = getFirestore();

  if (!["ADMINISTRADOR"].includes(userRole)) {
    return (
      <div className="container">
        <h3>No tienes permisos para acceder a esta página.</h3>
      </div>
    );
  }

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();

  useEffect(() => {
    if (user) {
      setUserNameComplete(
        userName
          ? userLastName
            ? `${userName} ${userLastName}`
            : userName
          : userLastName || ""
      );
    }
  }, [user]);

  const handleFileUpload = (file) => {
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Por favor, selecciona un archivo");
      return;
    }

    try {
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
          id: vehicle.id || "",
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
          FECHAMODIFICACION: formattedDate,
          ESTADOACTIVO: false,
        };

        // Si el documento ya existe, no actualizamos FECHACARGA y USUARIOCARGA
        if (docSnap.exists()) {
          const existingData = docSnap.data();
          vehicleData.FECHACARGA = existingData.FECHACARGA;
          vehicleData.USUARIOCARGA = existingData.USUARIOCARGA;
        } else {
          // Si es un nuevo documento, asignamos FECHACARGA y USUARIOCARGA
          vehicleData.FECHACARGA = formattedDate;
          vehicleData.USUARIOCARGA = userNameComplete || "";
        }

        // Agregamos USUARIOMODIFICACION
        vehicleData.USUARIOMODIFICACION = userNameComplete || "";

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
            <UploadForm
              onFileUpload={handleFileUpload}
              onUpload={handleUpload}
            />
            {showTable && (
              <VehicleTable
                data={csvData}
                editedData={editedData}
                onEdit={handleEdit}
                onUploadToFirestore={handleUploadToFirestore}
              />
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
