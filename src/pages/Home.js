import Header from "../components/Header";
import checkUserLogged from "../services/actions";
import FlatsTable from "../components/FlatsTable";
import backgroundpages from '../images/backgroundpages.avif'
import Typography from '@mui/material/Typography'

const bgStyle = {
    backgroundImage: `url(${backgroundpages})`,
    backgroundSize: 'cover', // Ajusta el tamaño de la imagen para cubrir todo el contenedor
    backgroundPosition: 'center',
    position: 'sticky',
    width: '100%',
    height: '100%',
    
  };
export default function Home() {
    checkUserLogged();
    return (

        
        <div style={bgStyle}>
           
            <Header/>
            <div className="justify-center flex mt-10 ">
                <Typography  variant="h3" component="h1" gutterBottom  style={{  fontSize: "2.5rem", fontWeight: "bold", marginBottom: "20px" }}>
  All Flats
</Typography></div>
            <FlatsTable type={'all-flats'}/>
        </div>
    );
}