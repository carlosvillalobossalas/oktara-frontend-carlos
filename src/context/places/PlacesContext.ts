import { createContext } from "react";
import { PlacesContextProps } from "../../interfaces/places";

export const PlacesContext = createContext<PlacesContextProps>(
  {} as PlacesContextProps
);
