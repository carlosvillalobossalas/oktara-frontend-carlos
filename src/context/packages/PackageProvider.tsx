import { useReducer } from "react";
import { Package, PackagesState } from "../../interfaces/packages";
import { PackageContext } from "./PackageContext";
import { packageReducer } from "./packageReducer";

const INITIAL_STATE: PackagesState = {
  refresh: false,
  packages: [],
  shipments: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PackageProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(packageReducer, INITIAL_STATE);

  const refreshPackages = () => {
    dispatch({
      type: "refreshPackages",
    });
  };

  const setPackages = (packages: Package[]) => {
    dispatch({
      type: "setPackages",
      payload: packages,
    });
  };

  const addShipment = (p: Package) => {
    dispatch({
      type: "addShipment",
      payload: p,
    });
  };

  const clearShipments = () => {
    dispatch({
      type: "clearShipments",
    });
  };

  const removeShipment = (p: Package) => {
    const index = state.shipments.indexOf(p);
    state.shipments.splice(index, 1);

    dispatch({
      type: "removeShipment",
      payload: state.shipments,
    });
  };

  return (
    <PackageContext.Provider
      value={{
        ...state,
        refreshPackages,
        setPackages,
        addShipment,
        removeShipment,
        clearShipments,
      }}
    >
      {children}
    </PackageContext.Provider>
  );
};
