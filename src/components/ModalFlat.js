import * as React from "react";
import { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Modal from "@mui/material/Modal";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Lista from "../components/Lista";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #FFFFF",
  borderRadius: "32px",
  boxShadow: 24,
  p: 4,
};
function ModalFlat({ id, setFlag }) {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const refDoc = doc(db, "flat", id);
  const [open, setOpen] = useState(false);
  const [flat, setFlat] = useState({
    areaSize: 0,
    city: "",
    dateAvailable: "",
    hasAC: "",
    rentPrice: "",
  });
  const areaSize = useRef(0);
  const city = useRef("");
  const dateAvailable = useRef("");
  const hasAC = useRef(false);
  const rentPrice = useRef("");
  const getFLats = async () => {
    const response = await getDoc(refDoc);

    setFlat(response.data());
  };
  const handleOpen = async () => {
    await getFLats();
    setOpen(true);
   
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(refDoc, {
      areaSize: areaSize.current.value,
      city: city.current.value,
      dateAvailable: dateAvailable.current.value,
      hasAC: hasAC.current.checked,
      rentPrice: rentPrice.current.value,
    });
   handleClose();
   //setFlag((prev) => !prev);
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="title" onSubmit={handleSubmit}>
            <h2 className="title">Update flats</h2>
            <TextField
              inputRef={city}
              defaultValue={flat.city}
              label="City"
              variant="outlined"
              type="text"
              sx={{ marginBottom: "10px" }}
            />
            <br />
            <TextField
              inputRef={areaSize}
              defaultValue={flat.areaSize}
              label="Area Size"
              variant="outlined"
              type="number"
              sx={{ marginBottom: "10px" }}
            />
            <br />
            <TextField
              inputRef={rentPrice}
              defaultValue={flat.rentPrice}
              label="Rent Price"
              variant="outlined"
              type="text"
              sx={{ marginBottom: "10px" }}
            />
            <br />

            <TextField
              inputRef={dateAvailable}
              defaultValue={flat.dateAvailable}
              label="Date Available"
              variant="outlined"
              type="date"
              sx={{ marginBottom: "10px" }}
            />
            <br />
            <div>
              <Switch {...label} defaultChecked={flat.hasAC} inputRef={hasAC} />
              <label htmlFor="switch">Has AC</label>
            </div>
            <br />
            <Button variant="contained" type="submit" sx={{ width: "220px" }}>
              Update
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalFlat;
