/* eslint import/no-webpack-loader-syntax: off */
//@ts-ignore
import { Map, Marker } from "!mapbox-gl";

export interface MapContextProps {
  isMapReady: boolean;
  map?: Map;
  setMap: (map: Map) => void;
  getRouteBetweenPoints: (
    start: [number, number],
    route: string
  ) => Promise<void>;
}

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}
