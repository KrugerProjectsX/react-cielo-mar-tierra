import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuTransitions from "./MenuTransitions";
import {getUserLogged} from "../services/users";
import { Link } from 'react-router-dom';

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
            <AppBar position="static">
                <Toolbar className={'bg-white'}>
                    <div className={'flex items-center m-4'}>
                        <img className="pointer-events-none my-auto w-24 lg:w-40 md:w-32"  alt="My SVG"/>

                    </div>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    </Typography>
                    <div className={'flex items-center justify-center mr-2'}>
                        {user && user.role === 'admin' && (<Link to="/dashboard" className="text-secondary"><Button>Home</Button></Link>)}
                        {user && user.role === 'admin' && (<Link to="/my-flats" className="text-secondary"><Button>My Flats</Button></Link>)}
                        {user && user.role === 'admin' && (<Link to="/my-favorites-flats" className="text-secondary"><Button>Favourites</Button></Link>)}
                        {user && user.role === 'admin' && (<Link to="/users" className="text-secondary"><Button>Users</Button></Link>)}
                    </div>
                    <MenuTransitions user={user} setUser={setUser}/>
                </Toolbar>
            </AppBar>
        </div>
    );
}
