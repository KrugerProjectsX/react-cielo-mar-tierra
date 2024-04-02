import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  Snackbar,
  SnackbarContent,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Alert,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  doc,
  updateDoc,
  getDoc,
  collection,
  addDoc,
  getFirestore,
} from "firebase/firestore";
import { db } from "../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../firebase";
import { convertLength } from "@mui/material/styles/cssUtils";

export default function UserForm({ type }) {
  let urlImDesc;
  let pathImg;
  const currentDate = new Date().toJSON().slice(0, 10);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    birthDate: currentDate,
    role: "",
  });
  const [email, setEmail] = useState("");
  const [userLoaded, setUserLoaded] = useState(false);
  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const birthDateRef = useRef("");
  const [roleRef, setRole] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [password, setPassword] = useState("");
  const id = JSON.parse(localStorage.getItem("user_logged"));
  const userCollection = collection(db, "user"); // Cambio de nombre de la constante
  const storage = getStorage(app);
  let userTipeRole = user.role;
  const userTypeRef = useRef(userTipeRole);

  const handleRoleChange = (event) => {
    console.log(event.target.value);

    setRole(event.target.value);
  };

  let refe = null;
  if (id) {
    refe = doc(db, "user", id);
  }
  const today = new Date();
  const minBirthDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0];
  const maxBirthDate = new Date(
    today.getFullYear() - 120,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0];
  let nameButton = "Create";
  if (type === "update") {
    nameButton = "Update";
  }

  const getUserData = async () => {
    const dataUser = await getDoc(refe);
    const responseUser = { ...dataUser.data() };
    setUser(responseUser);
    setUserLoaded(true);
  };
  const processData = async () => {
    if (type === "view" || type === "update") {
      await getUserData();
    } else {
      setUserLoaded(true);
    }
  };
  useEffect(() => {
    processData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      firstNameRef.current.value.trim() === "" ||
      lastNameRef.current.value.trim() === "" ||
      emailRef.current.value.trim() === "" ||
      birthDateRef.current.value.trim() === "" 
    ) {
      setAlertMessage("Por favor, complete todos los campos");
      setIsAlertOpen(true);
      return;
    }

    let urlImDesc;
    if (pathImg === undefined || pathImg === "") {
      // Si no hay una imagen seleccionada, usar una URL de imagen predeterminada
      urlImDesc =
        "https://firebasestorage.googleapis.com/v0/b/flat-project-1ac7a.appspot.com/o/documentos%2Fperson.png?alt=media&token=6db5d670-b6de-479e-b9ea-a60ed3ce2497";
    } else {
      urlImDesc = pathImg;
    }

    let userSend = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      birthDate: birthDateRef.current.value,
      role: userTypeRef.current.value,
      imgPerson: urlImDesc,
    };
    //console.log("Datos del usuario a enviar:", userSend);
    if (type === "create") {
      userSend = { ...userSend, password: passwordRef.current.value };
      await addDoc(userCollection, userSend); // Cambio a userCollection
      setAlertMessage("Usuario creado");
      setIsAlertOpen(true);
      // Limpiar campos después de crear
      firstNameRef.current.value = "";
      lastNameRef.current.value = "";
      emailRef.current.value = "";
      birthDateRef.current.value = "";
      setRole("");
      if (passwordRef.current) {
        passwordRef.current.value = "";
      }
    }

    if (type === "update") {
      setUser(userSend); // Actualiza el estado con los nuevos datos
      await updateDoc(refe, userSend); // Envía los nuevos datos al servidor
      setAlertMessage("Usuario actualizado"); // Notifica al usuario que se actualizó la información
      setIsAlertOpen(true); // Abre la alerta
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(e.target.value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setAlertMessage("Formato de correo electrónico inválido");
      setIsAlertOpen(true);
    }
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsAlertOpen(false);
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    if (passwordValue.length < 6) {
      setAlertMessage("La contraseña debe tener al menos 6 caracteres");
      setIsAlertOpen(true);
      return;
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\s]).{6,}$/;
    if (!passwordRegex.test(passwordValue)) {
      setAlertMessage(
        "La contraseña debe contener al menos una letra, un número y un carácter especial"
      );
      setIsAlertOpen(true);
    }
  };

  const fileHandler = async (e) => {
    //detectar el archivo
    const archivoI = e.target.files[0];
    //cargar esto al storage
    const refArchivo = ref(storage, `documentos/${archivoI.name}`);
    await uploadBytes(refArchivo, archivoI);
    //obtener la url de la imagen
    pathImg = await getDownloadURL(refArchivo);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 border rounded"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Centra horizontalmente
      }}
    >
      {userLoaded ? (
        <>
          {type !== "create" && (
            <Card
              sx={{ maxWidth: 200 }}
              style={{ padding: "10px", marginBottom: "30px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CardMedia
                  component="img"
                  height="100"
                  image={user.imgPerson}
                  alt="Person"
                  style={{
                    borderRadius: "5px",
                    maxHeight: 100, // Limitar la altura máxima de la imagen
                    maxWidth: "50%", // Ajustar el ancho máximo de la imagen
                    objectFit: "cover",
                    display: "block", // Esto asegura que la imagen sea un bloque y se centre correctamente
                    margin: "auto", // Esto centra la imagen horizontalmente
                  }}
                />
              </div>
            </Card>
          )}

          <Grid container spacing={2} sx={{ maxWidth: "100%", overflow: "auto" }}>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={type === "view"}
                label="First Name"
                inputRef={firstNameRef}
                defaultValue={user.firstName}
                variant="outlined"
                className="w-full"
                sx={{ marginBottom: "2px" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={type === "view"}
                label="Last Name"
                inputRef={lastNameRef}
                defaultValue={user.lastName}
                variant="outlined"
                className="w-full"
                sx={{ marginBottom: "2px" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={type === "view"}
                type="email"
                label="Email"
                inputRef={emailRef}
                defaultValue={user.email}
                variant="outlined"
                className="w-full"
                sx={{ marginBottom: "2px" }}
                onChange={handleEmailChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {type === "create" && (
                <TextField
                  type={"password"}
                  label="Password"
                  inputRef={passwordRef}
                  variant="outlined"
                  className="w-full"
                  sx={{ marginBottom: "2px" }}
                  onChange={handlePasswordChange}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={type === "view"}
                label="Birth Date"
                type="date"
                inputRef={birthDateRef}
                inputProps={{ min: maxBirthDate, max: minBirthDate }}
                defaultValue={currentDate}
                variant="outlined"
                className="w-full"
                sx={{ marginBottom: "8px" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ minWidth: 120 }}>
              <TextField
                        select
                        label="User Type"
                        variant="outlined"
                        SelectProps={{ native: true }}
                        className="w-full mb-5"
                        inputRef={userTypeRef}
                    >
                        <option key="landlord" value="landlord">landlord</option>
                        <option key="renter" value="renter">renter</option>
                    </TextField>
              </Box>
            </Grid>

           {type === "update" && (
              <Grid item xs={2} sm={2}>
                <div className="form-group">
                  <input
                    type="file"
                    id="file"
                    placeholder="Agregar imagen"
                    className="form-control"
                    onChange={fileHandler}
                  />
                </div>
              </Grid>





            )}

            {type !== "view" && (
              <Button type="submit" variant="contained" fullWidth>
                {nameButton}
              </Button>
            )}
          </Grid>

          <Snackbar
            open={isAlertOpen}
            autoHideDuration={6000}
            onClose={() => setIsAlertOpen(false)}
          >
            <Alert onClose={handleAlertClose} severity="error">
              {alertMessage}
            </Alert>
          </Snackbar>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Box>
  );
}
