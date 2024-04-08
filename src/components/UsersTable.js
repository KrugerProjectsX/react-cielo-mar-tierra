import * as React from "react";
import { useEffect, useState } from "react";
import { getDocs, query, where, collection } from "firebase/firestore";
import { db } from "../firebase";
import {
  Box,
  Button,
  Slider,
  TextField,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Grid
} from "@mui/material";

export default function UsersTable() {
  const ref = collection(db, "user");
  const refFlats = collection(db, "flat");
  const [userType, setUserType] = useState("");
  const [flatsCounter, setFlatsCounter] = useState("");
  const [valueSlider, setValueSlider] = useState([18, 120]);
  const [users, setUsers] = useState([]);

  const today = new Date();

  const getData = async () => {
    const arrayWhere = [];

    if (userType) arrayWhere.push(where("role", "==", userType));

    const minBirthDate = new Date(
      today.getFullYear() - valueSlider[0],
      today.getMonth(),
      today.getDate()
    ).toISOString();

    const maxBirthDate = new Date(
      today.getFullYear() - valueSlider[1],
      today.getMonth(),
      today.getDate()
    ).toISOString();

    arrayWhere.push(where("birthDate", ">=", maxBirthDate));
    arrayWhere.push(where("birthDate", "<=", minBirthDate));

    const searchUser = query(ref, ...arrayWhere);
    const data = await getDocs(searchUser);
    const usersSet = [];

    if (data && data.docs) {
      for (const item of data.docs) {
        const search = query(refFlats, where("user", "==", item.id));
        const dataFlats = await getDocs(search);

        if (flatsCounter) {
          const [min, max] = flatsCounter.split("-").map(Number);
          if (
            (max && dataFlats.docs.length < min) ||
            (max && dataFlats.docs.length > max) ||
            (!max && dataFlats.docs.length < 61)
          ) {
            continue;
          }
        }

        const userWithFlats = {
          ...item.data(),
          id: item.id,
          flats: dataFlats.docs.length
        };
        usersSet.push(userWithFlats);
      }
    } else {
      console.error("No se pudieron obtener los documentos de la consulta.");
    }

    setUsers(usersSet);
  };

  useEffect(() => {
    getData();
  }, [userType, flatsCounter, valueSlider]);

  return (
    <>
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
                  style={{
                    borderRadius: "5px",
                    maxHeight: 50,
                    maxWidth: "25%",
                    objectFit: "cover"
                  }}
                />
                <div className="relative">
                  <div className="hover:bg-blue-200 transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                  </div>
                  <CardContent sx={{ paddingBottom: "2px !important" }}>
                    <Typography variant="body2" color="text.secondary">
                      <p>
                        <strong>First Name: </strong>
                        {row.firstName}
                        <br />
                        <strong>Last Name: </strong>
                        {row.lastName}
                        <br />
                        <strong>Email: </strong>
                        {row.email}
                        <br />
                        <strong>Birth date: </strong>
                        {row.birthDate}
                        <br />
                        <strong>Flats Count:</strong> {row.flats}
                        <br />
                        <strong>Is admin: </strong>
                        {row.role === "admin" ? "Yes" : "No"}
                      </p>
                      <p></p>
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ paddingTop: "1px !important" }} variant="body2">
                    <Button href={`/profile/edit/${row.id}`}>Edit</Button>
                  </CardActions>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}
