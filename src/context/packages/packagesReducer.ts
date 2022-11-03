import { Feature } from "../../interfaces/places";
import { PackagesState } from "./PackagesProvider";

type PackagesAction =
  | { type: "setUserLocation"; payload: [number, number] }
  | { type: "setPlaces"; payload: Feature[] }
  | { type: "setLoadingPlaces" };

export const packagesReducer = (
  state: PackagesState,
  action: PackagesAction
): PackagesState => {
  switch (action.type) {
    case "setUserLocation":
      return {
        ...state,
        isLoading: false,
        userLocation: action.payload,
      };
    case "setLoadingPlaces":
      return {
        ...state,
        isLoadingPlaces: true,
        places: [],
      };
    case "setPlaces":
      return {
        ...state,
        isLoadingPlaces: false,
        places: action.payload,
      };
    default:
      return state;
  }
};
