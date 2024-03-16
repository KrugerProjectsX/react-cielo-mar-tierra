import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button, Tabs, Tab } from "@mui/material";
import UserForm from "../components/UserForm";
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const Login = ({ isOpen = true, handleClose = false, handleLogin = false }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [marginBottom, setMarginBottom] = useState(2);
  const [activeTab, setActiveTab] = useState("1");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = () => {
    handleLogin();
    handleClose();
  };

  const cambiarTab = (numeroTab) => {
    if (activeTab !== numeroTab) {
      setActiveTab(numeroTab);
    }
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
              <TextField label="Email" variant="outlined" fullWidth value={email} onChange={handleEmailChange} mb={2} sx={{ marginBottom }}/>
              <TextField label="Password" type="password" variant="outlined" fullWidth value={password} onChange={handlePasswordChange} mb={2} sx={{ marginBottom }}/>
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
    </ThemeProvider>
  );
};

export default Login;
