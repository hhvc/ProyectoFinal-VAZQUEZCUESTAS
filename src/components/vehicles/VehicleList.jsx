import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  getFirestore,
  collection,
  getDocs,
  query as firestoreQuery,
} from "firebase/firestore";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const VehicleList = () => {
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
  const [vehicles, setVehicles] = useState([]);
  const [localVehicles, setLocalVehicles] = useState([]);
  const [filterMarca, setFilterMarca] = useState("");
  const [filterModelo, setFilterModelo] = useState("");
  const [filterCombustible, setFilterCombustible] = useState("");
  const [sortBy, setSortBy] = useState(""); // Puede ser 'añoAsc', 'añoDesc', 'precioAsc', 'precioDesc'
  const [combustibleOptions, setCombustibleOptions] = useState([]); // Opciones de combustible
  const [showMarcaOptions, setShowMarcaOptions] = useState(false);
  const [showModeloOptions, setShowModeloOptions] = useState(false);
  const [showCombustibleOptions, setShowCombustibleOptions] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const vehiclesRef = collection(db, "automotores");
        const queryFirestore = firestoreQuery(vehiclesRef);

        const querySnapshot = await getDocs(queryFirestore);
        const vehiclesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Convertir todos los valores de texto a mayúsculas
        const vehiclesDataUpperCase = vehiclesData.map((vehicle) => ({
          ...vehicle,
          marca: vehicle.marca.toUpperCase(),
          modelo: vehicle.modelo.toUpperCase(),
          combustible: vehicle.combustible.toUpperCase(),
        }));

        setLocalVehicles(vehiclesDataUpperCase);
        setVehicles(vehiclesDataUpperCase);
        // Obtener las opciones únicas de combustible
        const uniqueCombustibleOptions = Array.from(
          new Set(vehiclesDataUpperCase.map((vehicle) => vehicle.combustible))
        );

        // Filtrar opciones duplicadas y agregar la opción "Todos"
        const filteredCombustibleOptions = [
          "Todos",
          ...uniqueCombustibleOptions,
        ];

        setCombustibleOptions(filteredCombustibleOptions);
      } catch (error) {
        console.error("Error buscando automotores:", error);
      }
    };

    fetchVehicles();
  }, [db]);

  useEffect(() => {
    // Filtrar y ordenar localmente
    let filteredVehicles = [...localVehicles];

    if (filterMarca) {
      const uppercaseFilterMarca = filterMarca.toUpperCase().trim();
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        vehicle.marca.includes(uppercaseFilterMarca)
      );
    }

    if (filterModelo) {
      const uppercaseFilterModelo = filterModelo.toUpperCase().trim();
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        vehicle.modelo.includes(uppercaseFilterModelo)
      );
    }

    if (filterCombustible && filterCombustible !== "Todos") {
      const uppercaseFilterCombustible = filterCombustible.toUpperCase().trim();
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        vehicle.combustible.includes(uppercaseFilterCombustible)
      );
    }

    if (sortBy) {
      const orderField = sortBy.includes("año") ? "año" : "precio";
      const orderDirection = sortBy.includes("Asc") ? 1 : -1;
      filteredVehicles.sort((a, b) => {
        if (a[orderField] < b[orderField]) return -orderDirection;
        if (a[orderField] > b[orderField]) return orderDirection;
        return 0;
      });
    }

    setVehicles(filteredVehicles);
  }, [localVehicles, filterMarca, filterModelo, filterCombustible, sortBy]);

  const handleFilterMarca = (value) => {
    setFilterMarca(value);
    setShowMarcaOptions(false);
    applyFiltersLocally();
  };

  const handleFilterModelo = (value) => {
    setFilterModelo(value);
    setShowModeloOptions(false);
    applyFiltersLocally();
  };

  const handleFilterCombustible = (value) => {
    setFilterCombustible(value.toUpperCase());
    setShowCombustibleOptions(false);
    applyFiltersLocally();
  };

  const handleUpdateFromServer = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "automotores"));
      const updatedVehiclesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLocalVehicles(updatedVehiclesData);
      setVehicles(updatedVehiclesData);
    } catch (error) {
      console.error("Error updating vehicles from server:", error);
    }
  };

  return (
    <div className="container">
      <h3 className="title">Lista de Automotores</h3>

      {/* Controles de Filtros y Orden */}
      <div className="mb-3">
        <label className="me-2">Filtrar por Marca:</label>
        <div className="filter-container">
          <input
            type="text"
            value={filterMarca}
            onChange={(e) => handleFilterMarca(e.target.value)}
            onClick={() => setShowMarcaOptions(true)}
          />
          {showMarcaOptions && (
            <div className="filter-options">
              {vehicles
                .map((vehicle) => vehicle.marca)
                .filter((value, index, self) => self.indexOf(value) === index)
                .map((option, index) => (
                  <div key={index} onClick={() => handleFilterMarca(option)}>
                    {option}
                  </div>
                ))}
            </div>
          )}
        </div>

        <label className="mx-2">Filtrar por Modelo:</label>
        <div className="filter-container">
          <input
            type="text"
            value={filterModelo}
            onChange={(e) => handleFilterModelo(e.target.value)}
            onClick={() => setShowModeloOptions(true)}
          />
          {showModeloOptions && (
            <div className="filter-options">
              {vehicles
                .map((vehicle) => vehicle.modelo)
                .filter((value, index, self) => self.indexOf(value) === index)
                .map((option, index) => (
                  <div key={index} onClick={() => handleFilterModelo(option)}>
                    {option}
                  </div>
                ))}
            </div>
          )}
        </div>

        <label className="mx-2">Filtrar por Combustible:</label>
        <div className="filter-container">
          <select
            value={filterCombustible}
            onChange={(e) => handleFilterCombustible(e.target.value)}
            onClick={() => setShowCombustibleOptions(true)}
          >
            {combustibleOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {showCombustibleOptions && (
            <div className="filter-options">
              {combustibleOptions.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleFilterCombustible(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        <label className="mx-2">Ordenar por:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Ninguno</option>
          <option value="añoAsc">Año (Ascendente)</option>
          <option value="añoDesc">Año (Descendente)</option>
          <option value="precioAsc">Precio (Ascendente)</option>
          <option value="precioDesc">Precio (Descendente)</option>
        </select>

        <Button
          variant="secondary"
          className="mx-2"
          onClick={handleUpdateFromServer}
        >
          Actualizar desde el servidor
        </Button>
      </div>

      {/* Tabla de Automotores */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => setSortBy("marca")}>Marca</th>
            <th onClick={() => setSortBy("modelo")}>Modelo</th>
            <th>Versión</th>
            <th onClick={() => setSortBy("año")}>
              Año {sortBy === "añoAsc" ? "↑" : sortBy === "añoDesc" ? "↓" : ""}
            </th>
            <th>Dominio</th>
            <th onClick={() => setSortBy("combustible")}>
              Combustible{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-funnel"
                viewBox="0 0 16 16"
              >
                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
              </svg>
            </th>
            <th>
              Kms{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-caret-down"
                viewBox="0 0 16 16"
              >
                <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-caret-up"
                viewBox="0 0 16 16"
              >
                <path d="M3.204 11h9.592L8 5.519zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659" />
              </svg>
            </th>
            <th onClick={() => setSortBy("precio")}>
              Precio{" "}
              {sortBy === "precioAsc"
                ? "↑"
                : sortBy === "precioDesc"
                ? "↓"
                : ""}
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.marca}</td>
              <td>{vehicle.modelo}</td>
              <td>{vehicle.version}</td>
              <td>{vehicle.YEAR}</td>
              <td>{vehicle.dominio}</td>
              <td>{vehicle.combustible}</td>
              <td>{vehicle.kms}</td>
              <td>{vehicle.precio}</td>
              <td>
                <Link to={`/editarautomotor/${vehicle.id}`}>
                  <Button variant="primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-wrench-adjustable"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 4.5a4.5 4.5 0 0 1-1.703 3.526L13 5l2.959-1.11q.04.3.041.61" />
                      <path d="M11.5 9c.653 0 1.273-.139 1.833-.39L12 5.5 11 3l3.826-1.53A4.5 4.5 0 0 0 7.29 6.092l-6.116 5.096a2.583 2.583 0 1 0 3.638 3.638L9.908 8.71A4.5 4.5 0 0 0 11.5 9m-1.292-4.361-.596.893.809-.27a.25.25 0 0 1 .287.377l-.596.893.809-.27.158.475-1.5.5a.25.25 0 0 1-.287-.376l.596-.893-.809.27a.25.25 0 0 1-.287-.377l.596-.893-.809.27-.158-.475 1.5-.5a.25.25 0 0 1 .287.376M3 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                    </svg>
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default VehicleList;
