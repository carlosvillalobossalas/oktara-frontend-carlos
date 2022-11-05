import { useContext } from "react";
import { PackageContext } from "../context/packages/PackageContext";
import { Package } from "../interfaces/packages";
import { ShipmentButton } from "./ShipmentButton";

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
