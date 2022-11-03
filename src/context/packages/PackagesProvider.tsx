import { useEffect, useReducer } from "react";
import { searchApi } from "../../apis";
import { getUserLocation } from "../../helpers/getUserLocation";
import { Feature, PlacesResponse } from "../../interfaces/places";
import { PackagesContext } from "./PackagesContext";
import { packagesReducer } from "./packagesReducer";

export interface PackagesState {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
  packages: Feature[];
}

const INITIAL_STATE: PackagesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
  packages: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PackagesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(packagesReducer, INITIAL_STATE);

  const searchPlacesByTerm = async (query: string): Promise<Feature[]> => {
    if (query.length === 0) {
      dispatch({ type: "setPlaces", payload: [] });
      return [];
    }
    if (!state.userLocation) throw new Error("No hay ubicacion del usuario");

    dispatch({ type: "setLoadingPlaces" });

    const response = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(","),
      },
    });

    dispatch({ type: "setPlaces", payload: response.data.features });

    return response.data.features;
  };

  useEffect(() => {
    getUserLocation().then((lngLat) =>
      dispatch({ type: "setUserLocation", payload: lngLat })
    );
  }, []);

  return (
    <PackagesContext.Provider
      value={{
        ...state,
        searchPlacesByTerm,
      }}
    >
      {children}
    </PackagesContext.Provider>
  );
};
