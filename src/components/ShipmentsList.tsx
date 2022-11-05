import { Package } from "../interfaces/packages";
import { PackageContext } from "../context/packages/PackageContext";
import { ShipmentButton } from "./ShipmentButton";
import { useContext } from "react";

export const ShipmentsList = () => {
  const { shipments } = useContext(PackageContext);

  return (
    <div className="navbar-packages-container">
      <h4>Shipments</h4>
      <div className="navbar-packages">
        {shipments?.map((p: Package) => (
          <ShipmentButton key={p.id} shipment={p} />
        ))}
      </div>
    </div>
  );
};
