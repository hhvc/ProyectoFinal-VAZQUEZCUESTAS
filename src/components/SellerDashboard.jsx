import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const SellerDashboard = () => {
  const { userRole } = useAuth();
  // Verifica si el usuario tiene el rol necesario
  if (!["VENDEDOR", "SUPERVISOR", "ADMINISTRADOR"].includes(userRole)) {
    return (
      <div className="container">
        <h3>No tienes permisos para acceder a esta página.</h3>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Tablero para Vendedores</h1>

      {/* Clientes para contactar */}
      <section>
        <h2>Clientes para contactar</h2>
        {/* Aquí va la tabla de clientes para contactar */}
      </section>

      {/* Clientes para seguimiento */}
      <section>
        <h2>Clientes para seguimiento</h2>
        {/* Aquí va la tabla de clientes para seguimiento */}
      </section>

      {/* Dar de alta cliente */}
      <section>
        <h2>Dar de alta cliente</h2>
        <Link to="/formclientes" className="btn btn-primary">
          Nuevo Cliente
        </Link>
      </section>
      {/* Listar automotores */}
      <section>
        <h2>Listar automotores</h2>
        <Link to="/vehiclelist" className="btn btn-primary">
          Ver Listado
        </Link>
      </section>
      {/* Dar de alta automotor */}
      <section>
        <h2>Dar de alta automotor</h2>
        <Link to="/newvehicle" className="btn btn-primary">
          Nuevo Automotor
        </Link>
      </section>

      {/* Mis Ventas */}
      <section>
        <h2>Mis Ventas</h2>
        {/* Aquí va la tabla de mis ventas */}
      </section>
    </div>
  );
};

export default SellerDashboard;
