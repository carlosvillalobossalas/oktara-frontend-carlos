import { Button, DialogContentText } from "@mui/material";
import { ChangeEvent, useContext, useRef, useState } from "react";
import { Feature } from "../interfaces/places";
import { logisticsApi } from "../apis";
import { PackageContext } from "../context/packages/PackageContext";
import { PlacesContext } from "../context/places/PlacesContext";
import { toast, ToastContainer } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import "react-toastify/dist/ReactToastify.css";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
}

export const AddNewPackageModal = ({ open, handleClose }: ModalProps) => {
  const { searchPlacesByTerm, setPlaces, isLoadingPlaces, places } =
    useContext(PlacesContext);
  const { refreshPackages } = useContext(PackageContext);
  const [packageName, setPackageName] = useState("");
  const [locationSelected, setLocationSelected] = useState<Feature>();
  const [placeSelected, setPlaceSelected] = useState("");
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const debounceRef = useRef<NodeJS.Timeout>();

  const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlaceSelected(event.target.value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      searchPlacesByTerm(event.target.value);
    }, 1000);
  };

  const notify = () => toast.success("Package added succesfully");

  const addNewPackage = async () => {
    try {
      const response = await logisticsApi.post("/", {
        name: packageName,
        location: locationSelected,
        status: "Pending",
      });
      console.log(response);
      if (response.status === 201) {
        refreshPackages();
        notify();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseConfirmModal = () => {
    setOpenConfirmDialog(false);
  };

  const handleAddPackage = () => {
    //save new packge in DB
    addNewPackage();
    //close modals
    handleClose();
    handleCloseConfirmModal();
    //clear form
    setPackageName("");
    setPlaceSelected("");
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Package</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Package name"
            type="text"
            fullWidth
            variant="standard"
            inputProps={{
              autoComplete: "new-password",
            }}
            value={packageName}
            onChange={({ target }) => setPackageName(target.value)}
          />
          <div className="search-container">
            <TextField
              margin="dense"
              id="name"
              label="Package location"
              type="text"
              fullWidth
              variant="standard"
              className="form-control"
              inputProps={{
                autoComplete: "new-password",
              }}
              onChange={onQueryChange}
              value={placeSelected}
            />
            {isLoadingPlaces && <>Loading</>}
            {places.length === 0 ? (
              <></>
            ) : (
              <ul className="list-group mt-3">
                {places?.map((place) => (
                  <li
                    className={`list-group-item list-group-item-action`}
                    key={place.id}
                  >
                    <h6>{place.text_es}</h6>
                    <p style={{ fontSize: "12px" }}>{place.place_name}</p>
                    <button
                      className={`btn btn-sm btn-outline-primary`}
                      onClick={() => {
                        console.log(place);
                        setPlaceSelected(place.place_name);
                        setLocationSelected(place);
                        setPlaces([]);
                      }}
                    >
                      Select location
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              if (packageName !== "" && locationSelected) {
                setOpenConfirmDialog(true);
              } else {
                alert(
                  "Please write a package name and select a location first"
                );
              }
            }}
          >
            Add Package
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to add this new package?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Package Name: {packageName} <br />
            Location: {placeSelected}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmModal}>Cancel</Button>
          <Button onClick={handleAddPackage} autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};
