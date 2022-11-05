import React from "react";
import ReactDOM from "react-dom";
//@ts-ignore
import mapboxgl from "!mapbox-gl";
import { LogisticsApp } from "./LogisticsApp";
import "./index.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2FybG9zMzg5NyIsImEiOiJjbGEwZW9idWcwNHJ1M3dxZ2doYm10dmJpIn0.Wygg1LWkef9akBZdNzleBA";

if (!navigator.geolocation) {
  alert("Tu navegador no tiene opcion de Geolocalizacion");
  throw new Error("Tu navegador no tiene opcion de Geolocalizacion");
}

ReactDOM.render(
  <React.StrictMode>
    <LogisticsApp />
  </React.StrictMode>,
  document.getElementById("root")
);
