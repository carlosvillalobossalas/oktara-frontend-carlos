import { Map } from "mapbox-gl";
import { useContext, useLayoutEffect, useRef } from "react";
import { MapContext } from "../context/map/MapContext";
import { PackagesContext } from "../context/packages/PackagesContext";

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PackagesContext);
  const { setMap } = useContext(MapContext);

  const mapDiv = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapDiv.current!, // container ID
        style: "mapbox://styles/mapbox/light-v10", // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 14, // starting zoom,
      });

      setMap(map);
    }
  }, [isLoading, userLocation]);

  if (isLoading) {
    return <>Cargando...</>;
  }
  return (
    <div
      ref={mapDiv}
      style={{
        flex: 1,
        borderRight: "1px solid grey",
      }}
    >
      {userLocation?.join(",")}
    </div>
  );
};
