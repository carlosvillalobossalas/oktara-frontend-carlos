import { useContext, useCallback, useEffect } from "react";
import logisticsApi from "../apis/logisticsApi";
import { PackageContext } from "../context/packages/PackageContext";
import { Package } from "../interfaces/packages";
import { PackageInfoCard } from "./PackageInfoCard";

export const PackagesList = () => {
  const { refresh, packages, setPackages } = useContext(PackageContext);

  const getAllPackages = async () => {
    const response = await logisticsApi.get("/");
    if (response.status === 200) {
      setPackages(response.data.packages);
    }
  };

  useEffect(() => {
    getAllPackages();
  }, [refresh]);

  return (
    <div className="package-list-container">
      <h4>Packages</h4>
      <div className="package-list">
        {packages?.map((p: Package) => (
          <PackageInfoCard key={p.id} packageInfo={p} />
        ))}
      </div>
    </div>
  );
};
