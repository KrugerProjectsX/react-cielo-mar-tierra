import React, { useEffect, useState, useRef } from "react";
import { doc, getDoc, collection, addDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app, db } from "../firebase";
import { Typography, Grid, TextField, Button, Card, CardContent, Container, Switch, FormControlLabel, CircularProgress, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const styles = {
  root: {
    padding: 24,
    borderRadius: 16,
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
    background: "linear-gradient(135deg, #fff 0%, #f0f3f4 100%)",
  },
  title: {
    marginBottom: 20,
    fontWeight: "bold",
    color: "#333",
    textTransform: "uppercase",
    textAlign: "center",
  },
  button: {
    marginTop: 16,
    width: "100%",
    backgroundColor: "#000",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#222",
    },
  },
  imagePreviewContainer: {
    textAlign: "center",
    marginTop: 10,
  },
  imagePreview: {
    maxWidth: "100%",
    maxHeight: 200,
    borderRadius: 8,
  },
  loadingCircle: {
    display: "inline-block",
    marginTop: 10,
  },
};

function FlatForm({ type, id }) {
  const currentDate = new Date().toJSON().slice(0, 10);
  const navigate = useNavigate();
  const cityRef = useRef('');
  const streetNameRef = useRef('');
  const streetNumberRef = useRef('');
  const areaSizeRef = useRef('');
  const hasACRef = useRef(false);
  const yearBuiltRef = useRef('');
  const rentPriceRef = useRef('');
  const dateAvailableRef = useRef('');
  const [pathImg, setPathImg] = useState('');
  const [imageLoading, setImageLoading] = useState(false); // Estado para el indicador de carga
  const [flat, setFlat] = useState({
    city: '',
    areaSize: 0,
    dateAvailable: currentDate,
    hasAC: false,
    rentPrice: 0,
    streetName: '',
    streetNumber: '',
    yearBuilt: '',
  });
  const [flatLoaded, setFlatLoaded] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const userCollection = collection(db, 'flat');
  const storage = getStorage(app);
  let refFlat = null;
  if (id == null && type !== 'create') {
    id = JSON.parse(localStorage.getItem('user_logged'));
  }
  if (id && type !== 'create') {
    refFlat = doc(db, "flat", id);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasAC = hasACRef.current.checked ? "Yes" : "No";
    if (
      areaSizeRef.current.value.trim() === "" ||
      cityRef.current.value.trim() === "" ||
      dateAvailableRef.current.value.trim() === "" ||
      rentPriceRef.current.value.trim() === "" ||
      streetNameRef.current.value.trim() === "" ||
      streetNumberRef.current.value.trim() === "" ||
      yearBuiltRef.current.value.trim() === ""
    ) {
      setAlertMessage("Please fill in all fields");
      setIsAlertOpen(true);
      return;
    }

    let urlImDesc = '';
    if (pathImg === undefined || pathImg === "") {
      urlImDesc =
        "https://firebasestorage.googleapis.com/v0/b/flat-project-1ac7a.appspot.com/o/documentos%2Fperson.png?alt=media&token=6db5d670-b6de-479e-b9ea-a60ed3ce2497";
    } else {
      urlImDesc = pathImg;
    }

    let flatSend = {
      areaSize: areaSizeRef.current.value,
      city: cityRef.current.value,
      dateAvailable: dateAvailableRef.current.value,
      hasAC: hasAC,
      rentPrice: rentPriceRef.current.value,
      streetName: streetNameRef.current.value,
      streetNumber: streetNumberRef.current.value,
      yearBuilt: yearBuiltRef.current.value,
      user: JSON.parse(localStorage.getItem('user_logged')),
      imgFlat: urlImDesc
    };

    if (type === "create") {
      flatSend = { ...flatSend };
      await addDoc(userCollection, flatSend);
      setAlertMessage("Flat created");
      setIsAlertOpen(true);
      areaSizeRef.current.value = "";
      cityRef.current.value = "";
      dateAvailableRef.current.value = "";
      hasACRef.current.checked = false;
      rentPriceRef.current.value = "";
      streetNameRef.current.value = "";
      streetNumberRef.current.value = "";
      yearBuiltRef.current.value = "";
      navigate('/flats', { replace: false });
    }

    if (type === 'update') {
      await updateDoc(refFlat, flatSend);
    }
  }

  let nameButton = 'Create';
  if (type === 'update') {
    nameButton = 'Update'
  }

  const getFlatData = async () => {
    const dataFlat = await getDoc(refFlat);
    const responseFlat = { ...dataFlat.data() };
    setFlat(responseFlat);
    setFlatLoaded(true);
  }
  const processData = async () => {
    if (type === 'update' || type === 'view') {
      await getFlatData();
    } else {
      setFlatLoaded(true)
    }
  }

  useEffect(() => {
    processData();
  }, []);

  const fileHandler = async (e) => {
    setImageLoading(true); // Mostrar indicador de carga
    const archivoI = e.target.files[0];
    const refArchivo = ref(storage, `documentos/${archivoI.name}`);
    await uploadBytes(refArchivo, archivoI);
    let urlImDesc = await getDownloadURL(refArchivo);
    setPathImg(urlImDesc);
    setImageLoading(false); // Ocultar indicador de carga
  }

  return (
    <Container maxWidth="md">
      <Card style={styles.root}>
        <CardContent>
          <Typography variant="h4" style={styles.title}>Add New Flat</Typography>
          <form onSubmit={handleSubmit}>
            {flatLoaded ? (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="city"
                    label="City"
                    variant="outlined"
                    inputRef={cityRef}
                    defaultValue={flat.city}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="streetName"
                    label="Street Name"
                    variant="outlined"
                    inputRef={streetNameRef}
                    defaultValue={flat.streetName}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="streetNumber"
                    label="Street Number"
                    variant="outlined"
                    inputRef={streetNumberRef}
                    defaultValue={flat.streetNumber}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="areaSize"
                    label="Area Size"
                    variant="outlined"
                    inputRef={areaSizeRef}
                    defaultValue={flat.areaSize}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Switch defaultChecked={flat.hasAC} id="hasAC" inputRef={hasACRef} color="primary" />}
                    label="Has AC"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="yearBuilt"
                    label="Year Built"
                    variant="outlined"
                    inputRef={yearBuiltRef}
                    defaultValue={flat.yearBuilt}
                    inputProps={{ min: 1900, max: 2050 }}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="rentPrice"
                    label="Rent Price"
                    variant="outlined"
                    inputRef={rentPriceRef}
                    defaultValue={flat.rentPrice}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="dateAvailable"
                    label="Date Available"
                    variant="outlined"
                    type="date"
                    inputRef={dateAvailableRef}
                    defaultValue={flat.dateAvailable}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <input type="file" id="file" className="form-control" onChange={fileHandler} />
                  {imageLoading ? ( // Mostrar indicador de carga mientras se carga la imagen
                    <Box style={styles.loadingCircle}>
                      <CircularProgress size={50} />
                    </Box>
                  ) : (
                    <div style={styles.imagePreviewContainer}>
                      {pathImg && (
                        <img src={pathImg} alt="Preview" style={styles.imagePreview} />
                      )}
                    </div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button type='submit' variant="contained" style={styles.button}>{nameButton}</Button>
                </Grid>
              </Grid>
            ) : (
              <Typography variant="body1" align="center">Loading...</Typography>
            )}
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default FlatForm;
