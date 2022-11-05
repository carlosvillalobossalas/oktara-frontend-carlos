import { Package } from "../interfaces/packages";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { PackageContext } from "../context/packages/PackageContext";

interface PackageInfoCardProps {
  packageInfo: Package;
}

export const PackageInfoCard = ({ packageInfo }: PackageInfoCardProps) => {
  const { addShipment, shipments } = useContext(PackageContext);

  const disabled =
    packageInfo.status !== "Pending" || shipments?.includes(packageInfo);

  const addToShipments = () => {
    addShipment(packageInfo);
  };

  return (
    <Box sx={{ width: "90%", mb: 1, mt: 0.5 }}>
      <Card
        variant="outlined"
        sx={{ borderRadius: 5, border: "2px solid rgb(128, 149, 204)" }}
        className="package-info-card"
      >
        <CardContent>
          <Typography color="text.secondary">ID: {packageInfo.id}</Typography>
          <Typography variant="h6" sx={{ mb: 1.5 }}>
            {packageInfo.name}
          </Typography>
          <Typography style={{}}>
            <strong>Location:</strong> {packageInfo.location.place_name}
          </Typography>
          <Typography
            // color="text.secondary"
            className={`${
              packageInfo.status === "Shipped"
                ? "shipped"
                : !shipments?.includes(packageInfo)
                ? "pending"
                : "shipping"
            }`}
          >
            Status: {packageInfo.status}
          </Typography>
        </CardContent>
        <CardActions>
          <Button disabled={disabled} onClick={addToShipments}>
            Add Package to Shipments
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
