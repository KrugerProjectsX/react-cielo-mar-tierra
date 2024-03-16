import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "bootstrap/dist/css/bootstrap.min.css";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import UserForm from "../components/UserForm";

const Login = ({ isOpen = true, handleClose = false, handleLogin = false }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [marginBottom, setMarginBottom] = useState(2);

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

  const [activeTab, setActiveTab] = useState("1");
  const cambiarTab = (numeroTab) => {
    if (activeTab !== numeroTab) {
      setActiveTab(numeroTab);
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClose} 
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box className="Login"
        sx={{
          maxWidth: 300,
          width: '100%',
          backgroundColor: 'white',
          border: '2px solid #000',
          padding: '24px',
        }}
      >
        <Nav tabs>
          <NavItem>
            <NavLink
              className={`baseTab ${activeTab === "1" && "activeTab"}`}
              onClick={() => cambiarTab("1")}
            >
              Login
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={`baseTab ${activeTab === "2" && "activeTab"}`}
              onClick={() => cambiarTab("2")}
            >
              Register
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <div className="container">
              <Typography variant="h6" component="div" mb={2}></Typography>
              <TextField label="Email" variant="outlined" fullWidth value={email} onChange={handleEmailChange} mb={2} sx={{ marginBottom }}/>
              <TextField label="Password" type="password" variant="outlined" fullWidth value={password} onChange={handlePasswordChange} mb={2} sx={{ marginBottom }}/>
              <Button variant="contained" onClick={handleLoginClick} fullWidth>Login</Button>
            </div>
          </TabPane>

          <TabPane tabId="2">
            <div className="container">
              <Typography variant="h6" component="div" mb={2}></Typography>
              <UserForm type={'create'}/>
             
            </div>
          </TabPane>
        </TabContent>
      </Box>
    </Modal>
  );
};

export default Login;
