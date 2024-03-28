import { Button,Grid } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteDoc, doc } from "firebase/firestore";
import {db} from "../firebase";

const DeleteButton = ({id, setFlag}) => {
    const ref = doc(db,"users",id )

    const remove = async ()=>{
        await deleteDoc(ref);
        setFlag((prev) => !prev);
    }

    return (
        <>
            <Grid item xs={8}>
            <Button  variant="outlined" startIcon={<DeleteIcon />} onClick={remove} >Remove</Button>
            </Grid>
            
        
        </>


    )

}   
export default DeleteButton;