import { Feature } from "./places";

export interface PackageContextProps {
  refresh: boolean;
  packages?: Package[];
  shipments: Package[];
  refreshPackages: () => void;
  setPackages: (packages: Package[]) => void;
  addShipment: (p: Package) => void;
  removeShipment: (p: Package) => void;
  clearShipments: () => void;
}

export interface PackagesState {
  refresh: boolean;
  packages: Package[];
  shipments: Package[];
}

// Generated by https://quicktype.io

export interface Packages {
  packages: Package[];
}

export interface Package {
  id: string;
  name: string;
  // location: Location;
  location: Feature;
  status: string;
  __v: number;
}

export interface Location {
  place_name: string;
  id?: string;
  type?: string;
  place_type?: string[];
  relevance?: number;
  properties?: Properties;
  text_es?: string;
  place_name_es?: string;
  text?: string;
  center: number[];
  geometry?: Geometry;
  context?: Context[];
  matching_text?: string;
  matching_place_name?: string;
  language_es?: Language;
  language?: Language;
  bbox?: number[];
}

export interface Context {
  id: string;
  text_es: string;
  text: string;
  wikidata?: string;
  language_es?: Language;
  language?: Language;
  short_code?: string;
}

export enum Language {
  Es = "es",
}

export interface Geometry {
  coordinates: number[];
  type: string;
}

export interface Properties {
  foursquare?: string;
  landmark?: boolean;
  category?: string;
  short_code?: string;
  wikidata?: string;
}
