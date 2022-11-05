/* eslint import/no-webpack-loader-syntax: off */
//@ts-ignore
import { Map } from "!mapbox-gl";
import { MapContext } from "../context/map/MapContext";
import { PlacesContext } from "../context/places/PlacesContext";
import { useContext, useLayoutEffect, useRef } from "react";

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);

  const mapDiv = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapDiv.current!, // container ID
        style: "mapbox://styles/mapbox/light-v10", // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 8, // starting zoom,
      });

      setMap(map);
    }
  }, [isLoading, userLocation]);

  if (isLoading) {
    return <>Loading...</>;
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
