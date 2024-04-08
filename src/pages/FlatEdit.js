import React from "react";
import { useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
import FlatForm from "../components/FlatForm";

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '80px', // Added top padding
};

const headingStyle = {
  fontSize: "2.5rem",
  fontWeight: "bold",
  marginBottom: "20px",
  color: "#333",
  textAlign: 'center',
};

const FlatEdit = () => {
  let { id }  = useParams();
  id = id || null; // If id is undefined, set it to null

  return (
    <div style={containerStyle}>
      <Typography variant="h3" component="h1" gutterBottom style={headingStyle}>
        FlatEdit
      </Typography>
      <FlatForm type="update" id={id} />
    </div>
  );
};

export default FlatEdit;
