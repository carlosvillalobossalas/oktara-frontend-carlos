import { AddNewPackageModal } from "./AddNewPackageModal";
import { Button, DialogContentText } from "@mui/material";
import { MapContext } from "../context/map/MapContext";
import { PackageContext } from "../context/packages/PackageContext";
import { PlacesContext } from "../context/places/PlacesContext";
import { ShipmentsList } from "./ShipmentsList";
import { toast, ToastContainer } from "react-toastify";
import { useContext, useState } from "react";
import { logisticsApi } from "../apis";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "react-toastify/dist/ReactToastify.css";

export const Navbar = () => {
  const [openAddPackageModal, setOpenAddPackageModal] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const { setPlaces, userLocation } = useContext(PlacesContext);
  const { shipments, clearShipments, refreshPackages } =
    useContext(PackageContext);
  const { getRouteBetweenPoints } = useContext(MapContext);

  const handleCloseConfirmModal = () => {
    setOpenConfirmDialog(false);
  };

  const handleCloseModal = () => {
    setOpenAddPackageModal(false);
    setPlaces([]);
  };

  const notifyProgress = () =>
    toast.warning("Shipping Packages...", { autoClose: 5000 });
  const notifySuccess = () => toast.success("Packages shipped successfully");

  const updatePackagesStatus = async () => {
    const shipmentsIds = shipments.map((p) => p.id);
    const response = await logisticsApi.put("/", {
      ids: shipmentsIds,
      status: "Shipped",
    });
    console.log(response);
  };

  const handleSendPackages = () => {
    handleCloseConfirmModal();
    if (!userLocation) return;
    let coords = "";
    coords += userLocation.join(",") + ";";
    for (const shipment of shipments) {
      const [lng, lat] = shipment.location.center;
      coords += `${lng},${lat};`;
    }
    coords = coords.slice(0, -1);

    getRouteBetweenPoints(userLocation, coords);
    notifyProgress();
    setTimeout(() => {
      updatePackagesStatus();
      clearShipments();
      notifySuccess();
      refreshPackages();
    }, 5000);
  };
  return (
    <>
      <div className="navbar">
        <div className="navbar-buttons">
          <Button
            variant="contained"
            size="large"
            onClick={() => setOpenAddPackageModal(true)}
          >
            Add New Package
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => setOpenConfirmDialog(true)}
          >
            Send Package(s)
          </Button>
        </div>
        <ShipmentsList />
      </div>
      <AddNewPackageModal
        open={openAddPackageModal}
        handleClose={handleCloseModal}
      />
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to send this packages?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {shipments.map((p) => p.name + " ")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmModal}>Cancel</Button>
          <Button onClick={handleSendPackages} autoFocus>
            Send
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};
