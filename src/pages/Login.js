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
import Logo from '../images/Logo.png';
import Background from '../images/Background.jpg';

const theme = createTheme({
  palette: {
    primary: { main: "#FFFFFF" },
    text: { primary: "#FFFFFF", secondary: "#FFFFFF" },
    background: { default: "#1E1E1E" }, // Dark background color
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
    setEmail(emailValue);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setAlertMessage("Invalid email format");
      setIsAlertOpen(true);
    }
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    if (passwordValue.length < 6) {
      setAlertMessage("Password must be at least 6 characters long");
      setIsAlertOpen(true);
      return;
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\s]).{6,}$/;
    if (!passwordRegex.test(passwordValue)) {
      setAlertMessage(
        "Password must contain at least one letter, one number, and one special character"
      );
      setIsAlertOpen(true);
    }
  };

  const handleLoginClick = async () => {
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    if (!email || !password) {
      setAlertMessage("Please fill in all fields");
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
          handleClose(); // Close modal on successful login
        } else {
          console.log("Incorrect password");
          setAlertMessage("Incorrect email or password");
          setIsAlertOpen(true);
        }
      } else {
        console.log("User not found");
        setAlertMessage("Incorrect email or password");
        setIsAlertOpen(true);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setAlertMessage(
        "An error occurred while logging in. Please try again later."
      );
      setIsAlertOpen(true);
    }
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsAlertOpen(false);
  };

  return (
    <div style={{ 
      backgroundImage: `url(${Background})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundAttachment: 'fixed', 
      width: '100vw', 
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <ThemeProvider theme={theme}>
        <Modal
          open={isOpen}
          onClose={handleClose}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Box
            sx={{
              width: 400,
              height: 500,
              backgroundColor: "#2B2B2B", // Darker background color
              border: "2px solid #000",
              borderRadius: '10px',
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <img className="rounded-full" src={Logo} alt="Logo" style={{ width: '160px', height: 'auto' }} /> {/* Increased logo size */}
            </div>
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              sx={{ marginBottom: '24px' }}
            >
              <Tab label="Login" value="1" />
              <Tab label="Register" value="2" />
            </Tabs>

            <Box style={{ flex: 1 }}>
              {activeTab === "1" && (
                <Box
                  className="container"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: 2,
                  }}
                >
                  <TextField label="Email" variant='outlined' fullWidth value={email} onChange={handleEmailChange} inputRef={emailRef} sx={{ marginBottom: 2 }} />
                  <TextField label="Password" type="password" variant="outlined" fullWidth value={password} onChange={handlePasswordChange} inputRef={passwordRef} sx={{ marginBottom: 2 }} />
                  <Button variant="contained" onClick={handleLoginClick} fullWidth sx={{ marginTop: 4, borderRadius: '20px', backgroundColor: '#000', color: '#FFF' }}>Login</Button> {/* Material-UI Button */}
                </Box>
              )}
              {activeTab === "2" && (
                <Box className="container" sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}></Typography>
                  <UserForm type={"create"} />
                </Box>
              )}
            </Box>
          </Box>
        </Modal>
        <Snackbar open={isAlertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
          <Alert onClose={handleAlertClose} severity="error">{alertMessage}</Alert>
        </Snackbar>
      </ThemeProvider>
    </div>
  );
};

export default Login;
