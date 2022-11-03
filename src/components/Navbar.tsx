import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { PlacesContext } from "../context/places/PlacesContext";
import { AddNewPackageModal } from "./AddNewPackageModal";

export const Navbar = () => {
  const [openAddPackageModal, setOpenAddPackageModal] = useState(false);
  const { setPlaces } = useContext(PlacesContext);

  const handleCloseModal = () => {
    setOpenAddPackageModal(false);
    setPlaces([]);
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
            Add Package
          </Button>
          <Button variant="outlined" size="large">
            Send Package(s)
          </Button>
        </div>
        <div className="navbar-packages">lista de paquetes</div>
      </div>
      <AddNewPackageModal
        open={openAddPackageModal}
        handleClose={handleCloseModal}
      />
    </>
  );
};
