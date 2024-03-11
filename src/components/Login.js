import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBox = styled(Box)`
  background-color: white;
  border: 2px solid #000;
  box-shadow: 24;
  padding: 24;
  width: 300;
`;

const Login = ({ isOpen, handleClose, handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  return (
    <StyledModal open={isOpen} onClose={handleClose}>
      <StyledBox>
        <Typography variant="h6" component="div" mb={2}>
          Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={handleEmailChange}
          mb={2}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={handlePasswordChange}
          mb={2}
        />
        <Button variant="contained" onClick={handleLoginClick} fullWidth>
          Login
        </Button>
      </StyledBox>
    </StyledModal>
  );
};

export default Login;
