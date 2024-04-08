import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuTransitions from "./MenuTransitions";
import { getUserLogged } from "../services/users";
import { Link } from 'react-router-dom';
import Logo from '../images/Logo.png';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

// Estilo personalizado para los botones
const StyledButton = styled(Button)({
    backgroundColor: '#000',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#333',
    },
});

const Header = ({ headingStyle }) => {
    const [user, setUser] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const processData = async () => {
        await getUserData();
    }

    const getUserData = async () => {
        const responseUser = await getUserLogged();
        setUser(responseUser);
    }

    useEffect(() => {
        processData();
    }, [])

    return (
        <AppBar position="fixed" className={'bg-black'}> {/* Utiliza position="fixed" para fijar el header en la parte superior de la pantalla */}
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={toggleMobileMenu}
                    sx={{ mr: 2, display: { lg: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Link to="/dashboard" style={{ flexGrow: 1, textDecoration: 'none' }}>
                    <img src={Logo} alt="Logo" style={{ height: '10vh', marginRight: '2vh' }} />
                </Link>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, ...headingStyle }}>
                </Typography>
                <div style={{ display: { xs: 'none', lg: 'flex', alignItems: 'center', marginRight: '20px' } }}>
                    {user && (
                        <>
                            {user.role === 'landlord' || user.role === 'admin' ? (
                                <Link to="/my-flats" style={{ textDecoration: 'none', color: '#fff', marginRight: '10px', display: { xs: 'none', lg: 'inline' } }}>
                                    <StyledButton>My Flats</StyledButton>
                                </Link>
                            ) : null}
                            {(user.role === 'admin' || user.role === 'renter' || user.role === 'landlord') ? (
                                <Link to="/my-favorites-flats" style={{ textDecoration: 'none', color: '#fff', marginRight: '10px', display: { xs: 'none', lg: 'inline' } }}>
                                    <StyledButton>Favorites</StyledButton>
                                </Link>
                            ) : null}
                            {user.role === 'admin' ? (
                                <Link to="/users" style={{ textDecoration: 'none', color: '#fff', marginRight: '10px', display: { xs: 'none', lg: 'inline' } }}>
                                    <StyledButton>Users</StyledButton>
                                </Link>
                            ) : null}
                        </>
                    )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <MenuTransitions user={user} setUser={setUser} />
                </div>
            </Toolbar>
            {isMobileMenuOpen && (
                <div style={{ backgroundColor: '#333', padding: '10px 0', textAlign: 'center' }}>
                    <Link to="/dashboard" style={{ textDecoration: 'none', color: '#fff', display: 'block', marginBottom: '10px' }}>
                        <StyledButton fullWidth>Dashboard</StyledButton>
                    </Link>
                    {user && (user.role === 'landlord' || user.role === 'admin') && (
                        <Link to="/my-flats" style={{ textDecoration: 'none', color: '#fff', display: 'block', marginBottom: '10px' }}>
                            <StyledButton fullWidth>My Flats</StyledButton>
                        </Link>
                    )}
                    {user && (user.role === 'admin' || user.role === 'renter' || user.role === 'landlord') && (
                        <Link to="/my-favorites-flats" style={{ textDecoration: 'none', color: '#fff', display: 'block', marginBottom: '10px' }}>
                            <StyledButton fullWidth>Favorites</StyledButton>
                        </Link>
                    )}
                    {user && user.role === 'admin' && (
                        <Link to="/users" style={{ textDecoration: 'none', color: '#fff', display: 'block', marginBottom: '10px' }}>
                            <StyledButton fullWidth>Users</StyledButton>
                        </Link>
                    )}
                </div>
            )}
        </AppBar>
    );
}

export default Header;
