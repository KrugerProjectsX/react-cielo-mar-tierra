import React, { useEffect, useState, useRef } from "react";
import { doc, getDoc, collection, addDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app, db } from "../firebase";
import { Box, Switch } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Button,Grid,TextField } from "@mui/material";




const styles = {
  root: {
    display: "flex",
    maxWidth: 600,
    margin: "auto",
    marginTop: 16,
  },
  media: {
    width: 200,
    objectFit: "cover",
  },
  content: {
    flex: "1 0 auto",
  },
  button: {
    marginTop: 16,
  },
};



function FlatForm({ type, id }) { console.log(type); console.log(id)
  let urlImDesc;
  let pathImg;
  const currentDate = new Date().toJSON().slice(0, 10);
  const [flat, setFlat] = useState({
    city: '',
    areaSize: 0,
    dateAvailable: currentDate,
    hasAC: false,
    rentPrice: 0,
    streetName: '',
    streetNumber: 0,
    yearBuilt: 0,
  });
  const [flatLoaded, setFlatLoaded] = useState(false);
  const navigate = useNavigate();
  const cityRef = useRef('');
  const streetNameRef = useRef('');
  const streetNumberRef = useRef(0);
  const areaSizeRef = useRef(0);
  const hasACRef = useRef(false);
  const yearBuiltRef = useRef(0);
  const rentPriceRef = useRef(0);
  const dateAvailableRef = useRef('');

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
    console.log(hasACRef)
    console.log(areaSizeRef.current.value)
    console.log(cityRef.current.value)
    console.log(dateAvailableRef.current.value)
    console.log(streetNameRef.current.value)
    console.log(yearBuiltRef.current.value)
    console.log(streetNumberRef.current.value)

    if (
      areaSizeRef.current.value.trim() === "" ||
      cityRef.current.value.trim() === "" ||
      dateAvailableRef.current.value.trim() === "" ||
      rentPriceRef.current.value.trim() === "" ||
      streetNameRef.current.value.trim() === "" ||
      streetNumberRef.current.value.trim() === "" ||
      yearBuiltRef.current.value.trim() === ""
    ) {
      setAlertMessage("Por favor, complete todos los campos");
      setIsAlertOpen(true);
      return;
    }

    if (pathImg === undefined || pathImg === "") {
      // Si no hay una imagen seleccionada, usar una URL de imagen predeterminada
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
      setAlertMessage("Flat creado");
      setIsAlertOpen(true);
      // Limpiar campos después de crear
      areaSizeRef.current.value = "";
      cityRef.current.value = "";
      dateAvailableRef.current.value = "";
      hasACRef.current.checked = "";
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
    console.log(responseFlat)
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
    //detectar el archivo
    const archivoI = e.target.files[0];
    //cargar esto al storage
    const refArchivo = ref(storage, `documentos/${archivoI.name}`);
    await uploadBytes(refArchivo, archivoI);
    //obtener la url de la imagen
    urlImDesc = await getDownloadURL(refArchivo);
  }

  return (
    <Box maxWidth="700px" margin="auto" bgcolor="rgba(255, 255, 255, 0.5)" p={4} sx ={{borderRadius: 3}} >
    <form className="max-w-md mx-auto my-4" onSubmit={handleSubmit}>
      {flatLoaded ? (
        <>
          {type !== "create" && type !== "update" && (
            <Card style={styles.root}>
              <CardMedia
                component="img"
                style={styles.media}
                image={flat.imgFlat}
                title="Flat image"
              />
              <CardContent style={styles.content}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Flat Details
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Price:</strong> ${flat.rentPrice}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  <strong>Year Built:</strong> {flat.yearBuilt}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  <strong>City:</strong> {flat.city}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  <strong>Street:</strong> {flat.streetName}, No. {flat.streetNumber}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  <strong>Area Size:</strong> {flat.areaSize} sqft
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  <strong>Date Available:</strong> {flat.dateAvailable}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  <strong>AC:</strong> {flat.hasAC ? 'Yes' : 'No'}
                </Typography>
              
              </CardContent>
            </Card>
          )}
          {(type === 'create' || type === 'update') && ( 
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled={type === 'view'}
                  fullWidth
                  id="city"
                  label="City"
                  variant="outlined"
                  inputRef={cityRef}
                  defaultValue={flat.city}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled={type === 'view'}
                  fullWidth
                  id="streetName"
                  label="Street Name"
                  variant="outlined"
                  inputRef={streetNameRef}
                  defaultValue={flat.streetName}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled={type === 'view'}
                  fullWidth
                  id="streetNumber"
                  label="Street Number"
                  variant="outlined"
                  type="number"
                  inputRef={streetNumberRef}
                  defaultValue={flat.streetNumber}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled={type === 'view'}
                  fullWidth
                  id="areaSize"
                  label="Area Size"
                  variant="outlined"
                  type="number"
                  inputRef={areaSizeRef}
                  defaultValue={flat.areaSize}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center" marginBottom="16px">
                  <label htmlFor="hasAC" style={{ marginRight: "8px" }}>Has AC</label>
                  <Switch disabled={type === 'view'} defaultChecked={flat.hasAC} id="hasAC" inputRef={hasACRef} color="primary" />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled={type === 'view'}
                  fullWidth
                  id="yearBuilt"
                  label="Year Built"
                  variant="outlined"
                  type="number"
                  inputRef={yearBuiltRef}
                  defaultValue={flat.yearBuilt}
                  inputProps={{ min: 1900, max: 2050 }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled={type === 'view'}
                  fullWidth
                  id="rentPrice"
                  label="Rent Price"
                  variant="outlined"
                  type="number"
                  inputRef={rentPriceRef}
                  defaultValue={flat.rentPrice}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled={type === 'view'}
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
                <input disabled={type === 'view'} type="file" id="file" placeholder="Add photo" className="form-control" onChange={fileHandler} />
              </Grid>
              <Grid item xs={12}>
                <div className="justify-center flex"> 
                    <Button type='submit' variant="contained" sx={{ backgroundColor: 'black' }}>{nameButton}</Button>
                </div>
           
              </Grid>
            </Grid>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </form>
  </Box>
    
  );
}

export default FlatForm;
