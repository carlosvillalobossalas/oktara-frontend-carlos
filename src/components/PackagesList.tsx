import { logisticsApi } from "../apis";
import { Package } from "../interfaces/packages";
import { PackageContext } from "../context/packages/PackageContext";
import { PackageInfoCard } from "./PackageInfoCard";
import { useContext, useEffect, useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export const PackagesList = () => {
  const { refresh, packages, setPackages } = useContext(PackageContext);
  const [filterPackages, setFilterPackages] = useState("all");

  const getAllPackages = async () => {
    const response = await logisticsApi.get("/");
    if (response.status === 200) {
      let packagesResponse: Package[] = response.data.packages;
      let packagesSorted = packagesResponse.sort((a, b) =>
        b.status < a.status ? 1 : b.status > a.status ? -1 : 0
      );
      setPackages(packagesSorted);
    }
  };

  const handleToggleChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: string
  ) => {
    setFilterPackages(newFilter);
  };

  useEffect(() => {
    getAllPackages();
  }, [refresh]);

  return (
    <div className="package-list-container">
      <h4>Packages</h4>
      <ToggleButtonGroup
        color="primary"
        value={filterPackages}
        exclusive
        onChange={handleToggleChange}
        aria-label="Platform"
      >
        <ToggleButton value="Pending">Pending</ToggleButton>
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="Shipped">Shipped</ToggleButton>
      </ToggleButtonGroup>
      <div className="package-list">
        {packages
          ?.filter((p) => {
            if (filterPackages === "all") return true;
            else return p.status === filterPackages;
          })
          .map((p: Package) => (
            <PackageInfoCard key={p.id} packageInfo={p} />
          ))}
      </div>
    </div>
  );
};
