import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useContext, useRef, useState } from "react";
import { PlacesContext } from "../context/places/PlacesContext";
import { Feature } from "../interfaces/places";
import { Button } from "@mui/material";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
}

export const AddNewPackageModal = ({ open, handleClose }: ModalProps) => {
  const { searchPlacesByTerm, setPlaces, isLoadingPlaces, places } =
    useContext(PlacesContext);
  const [packageName, setPackageName] = useState("");
  const [locationSelected, setLocationSelected] = useState<Feature>();
  const [placeSelected, setPlaceSelected] = useState("");

  const debounceRef = useRef<NodeJS.Timeout>();

  const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlaceSelected(event.target.value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      searchPlacesByTerm(event.target.value);
    }, 1000);
  };

  const handleAddPackage = () => {
    alert(`Adding package: ${packageName}\nLocation: ${placeSelected}`);
    //TODO: guardar en db
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add new Package</DialogTitle>
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
        <Button onClick={() => handleAddPackage()}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};
