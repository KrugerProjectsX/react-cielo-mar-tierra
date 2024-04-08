// Footer.js
import React from 'react';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <Typography variant="body2" style={{ color: '#fff' }}>
        &copy; {new Date().getFullYear()} FlatFinder. All rights reserved.
      </Typography>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#000',
  padding: '10px 0',
  textAlign: 'center',
  position: 'fixed',
  bottom: 0,
  width: '100%',
};

export default Footer;
