import React from "react";
import RegisterFlat from "./RegisterFlat";

const containerStyle = {
  backgroundColor: "#f0f3f4", // Elegant plain color
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: '80px', // Padding only at the top
};

const MyFlats = () => {
  return (
    <div style={containerStyle}>
      <RegisterFlat />
    </div>
  );
}

export default MyFlats;
