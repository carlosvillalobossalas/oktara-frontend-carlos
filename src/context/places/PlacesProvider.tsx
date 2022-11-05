import { Feature, PlacesResponse, PlacesState } from "../../interfaces/places";
import { getUserLocation } from "../../helpers/getUserLocation";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";
import { searchApi } from "../../apis";
import { useEffect, useReducer } from "react";

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
  packages: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

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

  const setPlaces = (places: Feature[]) => {
    dispatch({ type: "setPlaces", payload: places });
  };

  useEffect(() => {
    getUserLocation().then((lngLat) =>
      dispatch({ type: "setUserLocation", payload: lngLat })
    );
  }, []);

  return (
    <PlacesContext.Provider
      value={{
        ...state,
        searchPlacesByTerm,
        setPlaces,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
