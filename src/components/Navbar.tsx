import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useContext, useRef, useState } from "react";
import { SearchResults } from "./SearchResults";
import { PackagesContext } from "../context/packages/PackagesContext";

export const Navbar = () => {
  const [openAddPackageModal, setOpenAddPackageModal] = useState(false);
  const { searchPlacesByTerm } = useContext(PackagesContext);

  const debounceRef = useRef<NodeJS.Timeout>();

  const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      searchPlacesByTerm(event.target.value);
    }, 1000);
  };

  const handleCloseModal = () => {
    setOpenAddPackageModal(false);
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

      <Dialog open={openAddPackageModal} onClose={handleCloseModal}>
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
          />
          <div className="search-container">
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Package location"
              type="text"
              fullWidth
              variant="standard"
              className="form-control"
              onChange={onQueryChange}
            />
            <SearchResults />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
