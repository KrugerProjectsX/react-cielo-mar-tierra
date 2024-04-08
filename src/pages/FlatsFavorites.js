import React, { useEffect, useState } from "react";
import FlatsTable from "../components/FlatsTable";
import Typography from '@mui/material/Typography';
import EmptyFavoritesImage from '../images/empty_favorites.png';
import { Card } from "@mui/material";

const bgStyle = {
    backgroundColor: '#f0f3f4', // Color de fondo elegante
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '80px',
};

const headingStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
};

const textStyle = {
    marginBottom: '20px',
    fontSize: '1.2rem',
    color: '#555',
};

const imageStyle = {
    maxWidth: '60%',
    height: 'auto',
    borderRadius: '10px',
};

const cardStyle = {
    width: '90%', // Ancho de la tarjeta
    marginBottom: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra para profundidad
};

export default function FlatsFavorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Aquí obtendrías y actualizarías el array de favoritos desde tu base de datos
        // Por demostración, asumimos que los favoritos se obtienen y actualizan en otro lugar
        // y se almacenan en el estado.
        const fetchedFavorites = []; // Ejemplo: obtener favoritos desde la base de datos
        setFavorites(fetchedFavorites);
    }, []);

    return (
        <div style={bgStyle}>
            <Typography variant="h3" component="h1" gutterBottom style={headingStyle}>
                Favorites
            </Typography>
            <FlatsTable type={'favorite-flats'} />
            {favorites.length === 0 && (
                <div style={{ textAlign: 'center' }}>
                    <Typography variant="body1" style={textStyle}>
                        No hay flats favoritos aún. Comienza agregando un flat a tus favoritos.
                    </Typography>
                    <img src={EmptyFavoritesImage} alt="Empty Favorites" style={imageStyle} />
                </div>
            )}
            {/* Agregar tarjeta más ancha */}
            <Card sx={cardStyle}>
                <Typography variant="body1" style={{ textAlign: 'center', padding: '20px' }}>
                    Contenido de la tarjeta de ejemplo
                </Typography>
            </Card>
        </div>
    );
}
