import React, { useState, useRef } from "react";
import { Modal, Box, Typography, TextField, Button, Tabs, Tab, Snackbar,Alert } from "@mui/material";
import UserForm from "../components/UserForm";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

// Define los colores
const theme = createTheme({
  palette: {
    primary: {
      main: '#27374D', // PRIMARY_COLOR
    },
    text: {
      primary: '#333333', // FONT_COLOR
      secondary: '#777777', // LIGHT_FONT_COLOR
    },
    background: {
      default: '#F5F5F5', // BACKGROUND_COLOR
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
  const usersRef = collection(db, 'users');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = async () => {
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    try {
      const querySnapshot = await getDocs(query(usersRef, where("email", "==", emailValue)));
      if (!querySnapshot.empty) {
        const user = querySnapshot.docs[0].data();
        const userId = querySnapshot.docs[0].id;

        if (user.password === passwordValue) {
          console.log("Login success");
          localStorage.setItem('user_logged', JSON.stringify(userId));
          navigate('/dashboard', { replace: true });
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
      setAlertMessage("Ocurrió un error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.");
      setIsAlertOpen(true);
    }
  };

  const cambiarTab = (numeroTab) => {
    if (activeTab !== numeroTab) {
      setActiveTab(numeroTab);
    }
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsAlertOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal open={isOpen} onClose={handleClose} 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            maxWidth: 400, // Define el ancho máximo para ambos modales
            width: '100%',
            backgroundColor: 'background.default',
            border: '2px solid #000',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column', // Colocar los elementos en una columna
          }}
        >
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label="Login" value="1" />
            <Tab label="Register" value="2" />
          </Tabs>

          {activeTab === '1' && (
            <Box className="container" mb={2} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" component="div" mb={2}></Typography>
              <TextField label="Email" variant="outlined" fullWidth value={email} onChange={handleEmailChange} mb={2} inputRef={emailRef} />
              <TextField label="Password" type="password" variant="outlined" fullWidth value={password} onChange={handlePasswordChange} mb={2} inputRef={passwordRef} />
              <Button variant="contained" onClick={handleLoginClick} fullWidth>Login</Button>
            </Box>
          )}

          {activeTab === '2' && (
            <Box className="container" mb={2} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" component="div" mb={2}></Typography>
              <UserForm type={'create'}/>
            </Box>
          )}
        </Box>
      </Modal>
      <Snackbar open={isAlertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="error">
          {alertMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default Login;
