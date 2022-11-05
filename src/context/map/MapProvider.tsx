import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "mapbox-gl";
import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";
import { useContext, useEffect, useReducer } from "react";
import { MapState } from "../../interfaces/map";
import { PackageContext } from "../packages/PackageContext";
import { directionsApi } from "../../apis";
import { DirectionsResponse } from "../../interfaces/directions";

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const { shipments } = useContext(PackageContext);

  const setMap = (map: Map) => {
    const myLocationPopup = new Popup().setHTML(`
      <h4>Aqui estoy</h4>
      <p>En algun lugar del mundo</p>
    `);
    new Marker({
      color: "#61DAFB",
    })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map);

    dispatch({
      type: "setMap",
      payload: map,
    });
  };

  const getRouteBetweenPoints = async (
    start: [number, number],
    route: string
  ) => {
    const response = await directionsApi.get<DirectionsResponse>(`/${route}`);

    const { distance, duration, geometry } = response.data.routes[0];
    const { coordinates: coords } = geometry;
    let kms = distance / 1000;
    kms = Math.round(kms * 100);
    kms /= 100;
    const minutes = Math.floor(duration / 60);
    console.log({ kms, minutes });

    const bounds = new LngLatBounds(start, start);

    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }

    state.map?.fitBounds(bounds, {
      padding: 200,
    });
    //Polyline
    const sourceData: AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coords,
            },
          },
        ],
      },
    };

    if (state.map?.getLayer("RouteString")) {
      state.map.removeLayer("RouteString");
      state.map.removeSource("RouteString");
    }

    state.map?.addSource("RouteString", sourceData);
    state.map?.addLayer({
      id: "RouteString",
      type: "line",
      source: "RouteString",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "black",
        "line-width": 3,
      },
    });
  };

  useEffect(() => {
    state.markers.forEach((marker) => marker.remove());
    if (state.map?.getLayer("RouteString")) {
      state.map.removeLayer("RouteString");
      state.map.removeSource("RouteString");
    }
    const newMarkers: Marker[] = [];
    for (const shipment of shipments) {
      const [lng, lat] = shipment.location.center;
      const popup = new Popup().setHTML(`
        <h6>${shipment.location.text_es}</h6>
        <p>${shipment.location.place_name_es}</p>
      `);
      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(state.map!);
      newMarkers.push(newMarker);
    }
    dispatch({ type: "setMarkers", payload: newMarkers });
  }, [shipments]);

  return (
    <MapContext.Provider
      value={{
        ...state,
        setMap,
        getRouteBetweenPoints,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
