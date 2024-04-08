import React from "react";
import FlatForm from "../components/FlatForm";
import FlatsTable from "../components/FlatsTable";
import { Box} from "@mui/material";

const containerStyle = {
  marginTop: '20px', // Add some top margin
};

export default function RegisterFlat() {
    return (
        <div style={containerStyle}>
            <FlatForm type="create" id={null} />
            <Box mt={4}>
                <FlatsTable type="my-flats" />
            </Box>
        </div>
    );
}
