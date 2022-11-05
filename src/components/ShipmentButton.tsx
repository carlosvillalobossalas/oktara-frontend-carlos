import { Button, Popover, Typography } from "@mui/material";
import { Package } from "../interfaces/packages";
import { PackageContext } from "../context/packages/PackageContext";
import React, { useContext, useState } from "react";

interface Shipment {
  shipment: Package;
}

export const ShipmentButton = ({ shipment }: Shipment) => {
  const { removeShipment } = useContext(PackageContext);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <div className="shipment-button">
      <Button
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        color={open ? "error" : "primary"}
        size="large"
        variant="outlined"
        onClick={() => removeShipment(shipment)}
        fullWidth
      >
        {shipment.name}
      </Button>
      <Popover
        id="mouse-over-popover"
        sx={{ pointerEvents: "none" }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>{shipment.location.place_name}</Typography>
      </Popover>
    </div>
  );
};
