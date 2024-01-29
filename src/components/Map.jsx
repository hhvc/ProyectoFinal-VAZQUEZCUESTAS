import React, { useEffect } from "react";

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const libraries = ["places"];
const googleMapsScript = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=${libraries.join(
  ","
)}`;

const Map = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = googleMapsScript;
    script.defer = true;
    script.async = true;

    script.onload = () => {
      initMap();
    };

    script.onerror = () => {
      console.error("Error loading Google Maps script.");
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup if component unmounts
      document.head.removeChild(script);
    };
  }, []);

  const initMap = () => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API not loaded");
      return;
    }

    const map = new window.google.maps.Map(
      document.getElementById("google-map"),
      {
        center: { lat: -31.3848841, lng: -64.2072695 },
        zoom: 12,
      }
    );

    new window.google.maps.Marker({
      position: { lat: -31.3848841, lng: -64.2072695 },
      map,
      title: "Super Auto",
    });
  };

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
        </div>
        <div className="col-lg-6">
          <div id="google-map" style={{ height: "450px", width: "100%" }}></div>
        </div>
      </div>
    </div>
  );
};

export default Map;
