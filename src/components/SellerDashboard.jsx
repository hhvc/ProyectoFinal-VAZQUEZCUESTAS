import React from 'react';
import { Link } from 'react-router-dom';

const SellerDashboard = () => {
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
        <Link to="/carsas/formclientes" className="btn btn-primary">
          Nuevo Cliente
        </Link>
      </section>

      {/* Dar de alta automotor */}
      <section>
        <h2>Dar de alta automotor</h2>
        <Link to="/vehicleform" className="btn btn-primary">
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