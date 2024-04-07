import React, {useEffect, useReducer, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuTransitions from "./MenuTransitions";
import {getUserLogged} from "../services/users";
import { Link } from 'react-router-dom';
import Logo from '../images/Logo.png'

export default function Header() {
    const [user, setUser] = useState(null);

    const processData = async () => {
        await getUserData();
    }

    const getUserData = async () => {
        const responseUser = await getUserLogged();
        console.log(responseUser);
        setUser(responseUser);
    }
    useEffect(() => {
        processData();
    }, [])
    
    return (
        <div>
            <AppBar position="static" className={'flex h-20'}>
                <Toolbar className={'bg-black'}>
                    <div className={'flex items-center m-2'}>
                        <img className="pointer-events-none mt-2.5 h-16 w-auto lg:h-24 md:h-20" src= {Logo} alt="Logo"/>

                    </div>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    </Typography>
                    <div className={'flex items-center justify-center mr-2'}>
                    {user && (user.role === 'landlord' || user.role === 'admin' || user.role === 'renter') &&(<Link to="/dashboard" className="text-secondary "><Button className={'text-white'}>Home</Button></Link>)}
                        {user && (user.role === 'landlord' || user.role === 'admin' ) && (<Link to="/my-flats" className="text-secondary"><Button className={'text-white'}> My Flats</Button></Link>)}
                        {user && (user.role === 'admin'|| user.role === 'renter' || user.role === 'landlord' ) && (<Link to="/my-favorites-flats" className="text-secondary"><Button className={'text-white'}>Favorites</Button></Link>)}
                        {user && user.role === 'admin' && (<Link to="/users" className="text-secondary"><Button className={'text-white'}>Users</Button></Link>)}
                    </div>
                    <MenuTransitions user={user} setUser={setUser}/>
                </Toolbar>
            </AppBar>
        </div>
    );
}
