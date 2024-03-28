import { Box, Button, TextField, Grid, Typography, Snackbar, SnackbarContent } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { doc, updateDoc, getDoc, collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';

export default function UserForm({ type }) {

    const currentDate = new Date().toJSON().slice(0, 10);

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: currentDate
    });
    const [userLoaded, setUserLoaded] = useState(false);
    const firstNameRef = useRef('');
    const lastNameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const birthDateRef = useRef('');
    const [alertMessage, setAlertMessage] = useState("");
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const id = JSON.parse(localStorage.getItem('user_logged'));
    const refCreate = collection(db, "users");

    let ref = null;
    if (id) {
        ref = doc(db, "user", id);
    }
    const today = new Date();
    const minBirthDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split('T')[0];
    const maxBirthDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate()).toISOString().split('T')[0];
    let nameButton = 'Create';
    if (type === 'update') {
        nameButton = 'Update';
    }

    const getUserData = async () => {
        const dataUser = await getDoc(ref);
        const responseUser = { ...dataUser.data() };
        setUser(responseUser);
        setUserLoaded(true);
    };
    const processData = async () => {
        if (type === 'view' || type === 'update') {
            await getUserData();
        } else {
            setUserLoaded(true);
        }
    };
    useEffect(() => {
        processData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let userSend = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            birthDate: birthDateRef.current.value,
        };
        if (type === 'create') {
            userSend = { ...userSend, password: passwordRef.current.value };
            await addDoc(refCreate, userSend);
            setAlertMessage("Usuario creado");
            setIsAlertOpen(true);
            // Limpiar campos después de crear
            firstNameRef.current.value = '';
            lastNameRef.current.value = '';
            emailRef.current.value = '';
            birthDateRef.current.value = '';
            if (passwordRef.current) {
                passwordRef.current.value = '';
            }

        }

        if (type === 'update') {
            await updateDoc(ref, userSend);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-4 border rounded"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // Centra horizontalmente
            }}
        >
            {userLoaded ? (
                <>
                    <Grid container spacing={2} sx={{ maxWidth: '100%', overflow: 'auto' }}>
                        <Grid item xs={12} sm={6}>
                            <TextField disabled={type === 'view'} label="First Name" inputRef={firstNameRef} defaultValue={user.firstName} variant="outlined" className="w-full" sx={{ marginBottom: '2px' }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField disabled={type === 'view'} label="Last Name" inputRef={lastNameRef} defaultValue={user.lastName} variant="outlined" className="w-full" sx={{ marginBottom: '2px' }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField disabled={type === 'view'} type='email' label='Email' inputRef={emailRef} defaultValue={user.email} variant='outlined' className="w-full" sx={{ marginBottom: '2px' }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {type === 'create' && <TextField type={'password'} label='Password' inputRef={passwordRef} variant='outlined' className="w-full" sx={{ marginBottom: '2px' }} />}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField disabled={type === 'view'} label='Birth Date' type='date' inputRef={birthDateRef} inputProps={{ min: maxBirthDate, max: minBirthDate }} defaultValue={currentDate} variant='outlined' className="w-full" sx={{ marginBottom: '8px' }} />
                        </Grid>

                        {type !== 'view' && <Button type='submit' variant="contained" fullWidth>{nameButton}</Button>}
                    </Grid>

                    
                    <Snackbar open={isAlertOpen} autoHideDuration={6000} onClose={() => setIsAlertOpen(false)}>
                        <SnackbarContent message={<Typography variant="body1" sx={{ color: 'red' }}>{alertMessage}</Typography>} />
                    </Snackbar>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </Box>
    );
}
