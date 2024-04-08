import React from 'react';
import { Dropdown, Menu, MenuButton as BaseMenuButton, MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base';
import { styled } from '@mui/system';
import { CssTransition } from '@mui/base/Transitions';
import { PopupContext } from '@mui/base/Unstable_Popup';
import { useNavigate } from "react-router-dom";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PropTypes from 'prop-types';

// Estilos de color
const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#99CCF3',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E6',
    700: '#0059B3',
    800: '#004C99',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

// Lista de estilos para el menú
const Listbox = styled('ul')(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    min-width: 200px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
    z-index: 1;

    .closed & {
        opacity: 0;
        transform: scale(0.95, 0.8);
        transition: opacity 200ms ease-in, transform 200ms ease-in;
    }
    
    .open & {
        opacity: 1;
        transform: scale(1, 1);
        transition: opacity 100ms ease-out, transform 100ms cubic-bezier(0.43, 0.29, 0.37, 1.48);
    }

    .placement-top & {
        transform-origin: bottom;
    }

    .placement-bottom & {
        transform-origin: top;
    }
  `,
);

// Componente de lista animada
const AnimatedListbox = React.forwardRef(function AnimatedListbox(props, ref) {
    const { ownerState, ...other } = props;
    const popupContext = React.useContext(PopupContext);

    if (popupContext == null) {
        throw new Error(
            'The `AnimatedListbox` component cannot be rendered outside a `Popup` component',
        );
    }

    const verticalPlacement = popupContext.placement.split('-')[0];

    return (
        <CssTransition
            className={`placement-${verticalPlacement}`}
            enterClassName="open"
            exitClassName="closed"
        >
            <Listbox {...other} ref={ref}/>
        </CssTransition>
    );
});

// Propiedades del componente AnimatedListbox
AnimatedListbox.propTypes = {
    ownerState: PropTypes.object.isRequired,
};

// Estilo del ítem del menú
const MenuItem = styled(BaseMenuItem)(
    ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 8px;
    cursor: default;
    user-select: none;

    &:last-of-type {
        border-bottom: none;
    }

    &.${menuItemClasses.focusVisible} {
        outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
        background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }

    &.${menuItemClasses.disabled} {
        color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    }

    &:hover:not(.${menuItemClasses.disabled}) {
        background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[50]};
        color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
    }
  `,
);

// Estilo del botón del menú
const MenuButton = styled(BaseMenuButton)(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:hover {
        background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
        border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }

    &:active {
        background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
    }

    &:focus-visible {
        box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
        outline: none;
    }
  `,
);

// Componente principal MenuTransitions
export default function MenuTransitions({ user, setUser }) {
    const navigate = useNavigate();

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem('user_logged'); // Elimina la información del usuario del almacenamiento local
        setUser(''); // Establece el estado del usuario a vacío
        navigate('/', { replace: true }); // Redirige a la página de inicio de sesión
    };

    // Función para manejar el clic en los elementos del menú
    const createHandleMenuClick = (menuItem) => {
        return () => {
            if (menuItem === 'Log out') {
                logout();
            }

            if (menuItem === 'Profile') {
                navigate('/profile');
            }

            if (menuItem === 'Account') {
                navigate('/profile/edit');
            }

        };
    };

    return (
        <Dropdown>
            {/* Botón del menú */}
            <MenuButton>
                <div id="dropdownAvatarNameButton" data-dropdown-toggle="dropdownAvatarName" className="flex items-center text-sm pe-1 font-medium rounded-full md:me-0 text-gray-900">
                    {user && user.imgPerson && (
                        <img src={user.imgPerson} alt="person" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
                    )}
                    <span id="nameUserLog"></span>
                    {user && (
                        <span>{user.firstName} {user.lastName}</span>
                    )}
                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </div>
            </MenuButton>
            {/* Menú desplegable */}
            <Menu slots={{ listbox: AnimatedListbox }}>
                {/* Ítems del menú */}
                <MenuItem onClick={createHandleMenuClick('Profile')}><ManageAccountsIcon/> My Profile</MenuItem>
                <MenuItem onClick={createHandleMenuClick('Account')}><SettingsIcon/> Account Settings</MenuItem>
                <MenuItem onClick={createHandleMenuClick('Log out')}><ExitToAppIcon/> Log out</MenuItem>
            </Menu>
        </Dropdown>
    );
}

// Propiedades del componente MenuTransitions
MenuTransitions.propTypes = {
    user: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
};
