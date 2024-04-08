import React from "react";
import FlatsTable from "../components/FlatsTable";
import Typography from '@mui/material/Typography';

const bgStyle = {
  backgroundColor: "#f0f3f4", // Elegant plain color
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px 0', // Add padding for better spacing
};

const headingStyle = {
  fontSize: "2.5rem",
  fontWeight: "bold",
  marginBottom: "20px",
  color: "#333", // Adjust text color to match the background
};

export default function Flats() {
    return (
        <div style={bgStyle}>
            <Typography variant="h3" component="h1" gutterBottom style={headingStyle}>
              Flats
            </Typography>
            <FlatsTable type={'all-flats'} />
        </div>
    );
}
