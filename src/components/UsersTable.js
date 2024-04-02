import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { getDocs, query, where, collection } from "firebase/firestore";
import { db } from "../firebase";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
  Card, CardMedia, CardContent, CardActions,Grid
} from "@mui/material";

import ModalUser from "../components/ModalUser";
import Modal from "@mui/material/Modal";
import UserForm from "../components/UserForm";

export default function UsersTable() {
  const ref = collection(db, "user");
  const refFlats = collection(db, "flat");
  const [userType, setUserType] = useState("");
  const [flatsCounter, setFlatsCounter] = useState("");
  const [valueSlider, setValueSlider] = React.useState([18, 120]);
  const [users, setUsers] = useState([]);
  const [flag, setFlag] = useState(false);

  const getData = async () => {
    let arrayWhere = [];
    if (userType) {
      arrayWhere.push(where("role", "==", userType));
    }

    const today = new Date();
    const minBirthDate = new Date(
      today.getFullYear() - valueSlider[0],
      today.getMonth(),
      today.getDate()
    )
      .toISOString()
      .split("T")[0];
    const maxBirthDate = new Date(
      today.getFullYear() - valueSlider[1],
      today.getMonth(),
      today.getDate()
    )
      .toISOString()
      .split("T")[0];
    if (valueSlider && valueSlider.length > 1) {
      arrayWhere.push(where("birthDate", ">=", maxBirthDate));
      arrayWhere.push(where("birthDate", "<=", minBirthDate));
    }

    const searchUser = query(ref, ...arrayWhere);

    const data = await getDocs(searchUser);
    const usersSet = []; // Conjunto para almacenar usuarios únicos

    // Iterar sobre los usuarios y agregarlos al conjunto
    for (const item of data.docs) {
      const search = query(refFlats, where("user", "==", item.id));
      const dataFlats = await getDocs(search);

      if (flatsCounter) {
        const flatsValue = flatsCounter.split("-");
        if (flatsValue.length > 1) {
          const min = flatsValue[0];
          const max = flatsValue[1];
          if (dataFlats.docs?.length < min || dataFlats.docs?.length > max) {
            continue;
          }
        } else {
          if (flatsValue[0] === "61+") {
            if (dataFlats.docs?.length < 61) {
              continue;
            }
          }
        }
      }
      const userWithFlats = {
        ...item.data(),
        id: item.id,
        flats: dataFlats.docs?.length,
      };

      usersSet.push(userWithFlats);
    }

    setUsers(usersSet);
  };

  useEffect(() => {
    getData();
  }, [userType, flatsCounter, valueSlider, flag]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add User
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <UserForm type={"create"} />{" "}
            {/* Renderiza el contenido de la página "register" dentro del modal */}
          </Box>
        </Modal>
      </div>

      <Box component="form" className="flex space-x-4 mx-auto max-w-screen-md mb-4">
        <div className="flex items-center space-x-4">
          <TextField
            select
            label="User Type"
            variant="outlined"
            SelectProps={{ native: true }}
            className="w-40"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option key="none" value=""></option>
            <option key="landlord" value="landlord">
              Landlords
            </option>
            <option key="renter" value="renter">
              Renters
            </option>
            <option key="admin" value="admin">
              Admins
            </option>
          </TextField>

          <TextField
            select
            label="Flats Counter"
            variant="outlined"
            SelectProps={{ native: true }}
            className="w-40"
            value={flatsCounter}
            onChange={(e) => setFlatsCounter(e.target.value)}
          >
            <option key="none" value=""></option>
            <option key="0-5" value="0-5">
              0-5
            </option>
            <option key="6-20" value="6-20">
              6-20
            </option>
            <option key="21-60" value="21-60">
              21-60
            </option>
            <option key="61+" value="61+">
              61+
            </option>
          </TextField>
        </div>
        <div className={"w-full"}>
          <Typography id="input-slider" gutterBottom>
            Age
          </Typography>
          <Slider
            max={120}
            min={18}
            step={10}
            value={valueSlider}
            onChange={(e, newValue) => setValueSlider(newValue)}
            getAriaLabel={() => "Age Range"}
            valueLabelDisplay="auto"
            className="flex-grow"
          />
        </div>
      </Box>

      <div style={{ margin: "2%" }}>
      <Grid container spacing={2}>  
      {users.map((row) => (  
      <Grid item key={row.id} xs={12} sm={6} md={3}>  

      <Card sx={{ maxWidth: 200 }}>
        <CardMedia
            component="img"
            height="100"
            image={row.imgPerson}
            alt="Person"
            style={{ borderRadius: "5px", 
            maxHeight: 50, // Limitar la altura máxima de la imagen
            maxWidth: '25%', // Ajustar el ancho máximo de la imagen
            objectFit: 'cover' }}
        />
        <CardContent sx={{ paddingBottom: '2px !important' }}>
           <Typography variant="body2" color="text.secondary">
            First Name: {row.firstName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Last Name: {row.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email: {row.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Birth date: {row.birthDate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Is admin:  {row.role === "admin" ? "Yes" : "No"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Flats Count: {row.flats}
          </Typography>
      </CardContent>
      <CardActions sx={{ paddingTop: '1px !important' }} variant="body2">
            {<ModalUser id={row.id} setFlag={setFlag}></ModalUser>}
        </CardActions>
        
      </Card>
      </Grid>
      ))}
      </Grid>
      </div>


    </>
  );
}
