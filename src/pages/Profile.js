import UserForm from "../components/UserForm";
import {useParams} from "react-router-dom";
import Typography from '@mui/material/Typography'
const bgStyle = {
    backgroundColor: '#f0f3f4',
    backgroundSize: 'cover', // Ajusta el tamaño de la imagen para cubrir todo el contenedor
    backgroundPosition: 'center',
    position: 'sticky',
    width: '100%',
    height: '100%',
    
  };

export default function Profile() {
    let { userId }  = useParams();
    return (
        <div >
            <div style={bgStyle}>
            <div  className="justify-center flex mt-10 ">
                <Typography  variant="h3" component="h1" gutterBottom  style={{  fontSize: "2.5rem", fontWeight: "bold", marginBottom: "20px" }}>
Profile
</Typography>
</div>
            <UserForm type={'view'} id={userId}/>
            </div>
        </div>
    );
}