import React, { useState, useRef } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Snackbar,
  Alert,
} from "@mui/material";
import UserForm from "../components/UserForm";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

// Define los colores
const theme = createTheme({
  palette: {
    primary: {
      main: "#27374D", // PRIMARY_COLOR
    },
    text: {
      primary: "#333333", // FONT_COLOR
      secondary: "#777777", // LIGHT_FONT_COLOR
    },
    background: {
      default: "#F5F5F5", // BACKGROUND_COLOR
    },
  },
});

const Login = ({ isOpen = true, handleClose = false }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("1");
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usersRef = collection(db, "user");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(e.target.value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setAlertMessage("Formato de correo electrónico inválido");
      setIsAlertOpen(true);
    }
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

  const handleLoginClick = async () => {
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    if (!email || !password) {
      setAlertMessage("Por favor, complete todos los campos");
      setIsAlertOpen(true);
      return;
    }

    try {
      const querySnapshot = await getDocs(
        query(usersRef, where("email", "==", emailValue))
      );
      if (!querySnapshot.empty) {
        const user = querySnapshot.docs[0].data();
        const userId = querySnapshot.docs[0].id;

        if (user.password === passwordValue) {
          console.log("Login success");
          localStorage.setItem("user_logged", JSON.stringify(userId));
          navigate("/dashboard", { replace: true });
          handleClose(); // Cierra el modal cuando el inicio de sesión es exitoso
        } else {
          console.log("Contraseña incorrecta");
          setAlertMessage("Usuario o contraseña incorrectos");
          setIsAlertOpen(true);
        }
      } else {
        console.log("Usuario no encontrado");
        setAlertMessage("Usuario o contraseña incorrectos");
        setIsAlertOpen(true);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setAlertMessage(
        "Ocurrió un error al iniciar sesión. Por favor, inténtelo de nuevo más tarde."
      );
      setIsAlertOpen(true);
    }
  };

  const cambiarTab = (numeroTab) => {
    if (activeTab !== numeroTab) {
      setActiveTab(numeroTab);
    }
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsAlertOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={isOpen}
        onClose={handleClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 400, // Ancho fijo
            height: 300, // Alto fijo
            backgroundColor: "background.default",
            border: "2px solid #000",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
          >
            <Tab label="Login" value="1" />
            <Tab label="Register" value="2" />
          </Tabs>

          <Box style={{ flex: 1 }}>
            {" "}
            {/* Distribuye uniformemente */}
            {activeTab === "1" && (
              <Box
                className="container"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: 2,
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ marginBottom: 2 }}
                ></Typography>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={handleEmailChange}
                  inputRef={emailRef}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={password}
                  onChange={handlePasswordChange}
                  inputRef={passwordRef}
                  sx={{ marginBottom: 2 }}
                />
                <Button
                  variant="contained"
                  onClick={handleLoginClick}
                  fullWidth
                  sx={{ marginTop: 8 }}
                >
                  Login
                </Button>{" "}
                {/* Agregar margen superior al botón */}
              </Box>
            )}
            {activeTab === "2" && (
              <Box
                className="container"
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ marginBottom: 2 }}
                ></Typography>
                <UserForm type={"create"} />
              </Box>
            )}
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={isAlertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert onClose={handleAlertClose} severity="error">
          {alertMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default Login;
