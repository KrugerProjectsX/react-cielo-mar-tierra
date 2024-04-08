import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import FlatForm from "../components/FlatForm";
import Typography from "@mui/material/Typography";
import Messages from "../components/Messages";

const bgStyle = {
  backgroundColor: "#f0f3f4",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px 0",
};

const headingStyle = {
  fontSize: "2.5rem",
  fontWeight: "bold",
  marginBottom: "20px",
  color: "#333",
};

const Flat = () => {
  const { id } = useParams();

  return (
    <div style={bgStyle}>
      <Header />
      <Typography variant="h3" component="h1" gutterBottom style={headingStyle}>
        View Flat
      </Typography>
      <div style={{ maxWidth: "600px", width: "100%", padding: "0 20px" }}>
        <FlatForm type="view" id={id} />
        <Messages flatId={id} />
      </div>
    </div>
  );
};

export default Flat;
