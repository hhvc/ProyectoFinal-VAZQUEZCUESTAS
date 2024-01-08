import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const libraries = ["places"]; // Definir las bibliotecas fuera del componente

const Map = () => {
  return (
    <div className="container col-xxl-8 px-4 py-5">
      <div className="row">
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold lh-1 mb-3">¡Visítenos!</h1>
          <p className="lead">
            Estamos en Av. Monseñor Pablo Cabrera 2213, CÓRDOBA, Argentina.
          </p>
          <h4>Horarios</h4>
          <p>Lunes a Viernes de 09:00 - 18:00 hs</p>
          <p>Sábados de 09:00 - 13:00 hs</p>
          {/* <div className="d-grid gap-2 d-md-flex justify-content-md-start">
//           <button type="button" className="btn btn-primary btn-lg px-4 me-md-2">
//             Primary
//           </button>
//           <button
//             type="button"
//             className="btn btn-outline-secondary btn-lg px-4"
//           >
//             Default
//           </button>
//         </div> */}
        </div>
        <div className="col-lg-6">
          <LoadScript
            googleMapsApiKey={googleMapsApiKey}
            libraries={libraries}
          >
            <GoogleMap
              id="google-map"
              mapContainerStyle={{
                height: "450px",
                width: "100%", // Ajusta el ancho al 100% del contenedor padre
              }}
              center={{
                lat: -31.3848841,
                lng: -64.2072695,
              }}
              zoom={15}
            >
              <Marker
                position={{
                  lat: -31.3848841,
                  lng: -64.2072695,
                }}
                title="Super Auto"
              />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};

export default Map;
