import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Login from '../pages/Login';
import { PRIMARY_COLOR, LINK_COLOR, ACCENT_COLOR } from './Colors';

const navbarBackgroundColor = PRIMARY_COLOR;
const linkColor = LINK_COLOR;
const iconColor = ACCENT_COLOR;

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false); 

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLoginClick = () => {
    setLoginModalOpen(true); 
    handleCloseNavMenu(); 
  };

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false); 
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: navbarBackgroundColor }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: iconColor }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: linkColor,
                textDecoration: 'none',
              }}
            >
              FlatFinder
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon sx={{ color: linkColor }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem component={Link} to="/allflats" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" sx={{ color: linkColor }}>
                    AllFlats
                  </Typography>
                </MenuItem>
                <MenuItem component={Link} to="/favorites" onClick={handleCloseNavMenu}>
                  
                  <Typography textAlign="center" sx={{ color: linkColor }}>
                    Favorites
                  </Typography>
                </MenuItem>
                <MenuItem component={Link} to="/myflats" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" sx={{ color: linkColor }}>
                    My Flats
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                component={Link}
                to="/all-flats"
                sx={{ my: 2, color: linkColor, display: 'block' }}
              >
                All Flats
              </Button>
              <Button
                component={Link}
                to="/favorites"
                sx={{ my: 2, color: linkColor, display: 'block' }}
              >
                Favorites
              </Button>
              <Button
                component={Link}
                to="/my-flats"
                sx={{ my: 2, color: linkColor, display: 'block' }}
              >
                My Flats
              </Button>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              {userLoggedIn ? (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User Avatar" src="/static/images/avatar.jpg" />
                  </IconButton>
                </Tooltip>
              ) : (
                <Button onClick={handleLoginClick} sx={{ color: linkColor }}>
                  Login
                </Button>
              )}
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" sx={{ color: linkColor }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* Modal de inicio de sesión */}
      <Login isOpen={loginModalOpen} handleClose={handleCloseLoginModal} />
    </>
  );
}

export default Navbar;