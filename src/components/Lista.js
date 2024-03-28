import {Link} from "react-router-dom";
import React, { useEffect, useState } from "react";
import { app } from "../firebase";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import Container from "@mui/material/Container";
import CardMedia from "@mui/material/CardMedia";
import ModalFlat from './ModalFlat';


const db = getFirestore(app);

function Lista() {
  const [lista, setLista] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "flat"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setLista(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getLista();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "flat", id));
      setLista(lista.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  

  return (
    <div>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" style={{ marginTop: "5px" }}>
          My Flat
        </Typography>
        <Grid container spacing={5} style={{ marginTop: "5px" }}>
          {lista.map((item) => (
            <Grid item xs={12} sm={6} md={4} id={item.id}>
              <Card sx={{ maxWidth: 345 }} style={{ padding: "10px", marginBottom: "30px" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.imagen}
                  alt="Flat"
                  style={{ borderRadius: "5px" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    For rent
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" >
                    City: {item.city}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" >
                    Area Size: {item.areaSize}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" >
                    Rent Price: {item.rentPrice}
                  </Typography>
                </CardContent>
                <CardActions>
                 <div>
                    {<ModalFlat id={item.id} setFlag={setLista}></ModalFlat>}
                  </div>          

                  <Button variant="contained" size="small" onClick={() => handleDelete(item.id)}>Delete</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Lista;
