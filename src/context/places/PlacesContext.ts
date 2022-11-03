import { createContext } from "react";
import { Feature } from "../../interfaces/places";

export interface PlacesContextProps {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
  packages: Feature[];
  searchPlacesByTerm: (query: string) => Promise<Feature[]>;
  setPlaces: (places: Feature[]) => void;
}

export const PlacesContext = createContext<PlacesContextProps>(
  {} as PlacesContextProps
);
