import { Package, PackagesState } from "../../interfaces/packages";

type PackageAction =
  | { type: "refreshPackages" }
  | { type: "setPackages"; payload: Package[] }
  | { type: "addShipment"; payload: Package }
  | { type: "removeShipment"; payload: Package[] }
  | { type: "clearShipments" };

export const packageReducer = (
  state: PackagesState,
  action: PackageAction
): PackagesState => {
  switch (action.type) {
    case "refreshPackages":
      return {
        ...state,
        refresh: !state.refresh,
      };
    case "setPackages":
      return {
        ...state,
        packages: action.payload,
      };
    case "addShipment":
      return {
        ...state,
        shipments: [...state.shipments, action.payload],
      };
    case "removeShipment":
      return {
        ...state,
        shipments: [...action.payload],
      };
    case "clearShipments":
      return {
        ...state,
        shipments: [],
      };
    default:
      return state;
  }
};
