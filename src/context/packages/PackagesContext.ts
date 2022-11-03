import { createContext } from "react";
import { Feature } from "../../interfaces/places";

export interface PackagesContextProps {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
  packages: Feature[];
  searchPlacesByTerm: (query: string) => Promise<Feature[]>;
}

export const PackagesContext = createContext<PackagesContextProps>(
  {} as PackagesContextProps
);
