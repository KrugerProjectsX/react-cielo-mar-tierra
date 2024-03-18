import { Box, Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { doc, updateDoc, getDoc, collection, addDoc } from "firebase/firestore";
import{db} from '../firebase'

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
    const id = JSON.parse(localStorage.getItem('user_logged'));
    const refCreate = collection(db, "users");
    
    let ref = null;
    if (id) {
        ref = doc(db, "users", id);
    }
    const today = new Date();
    const minBirthDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split('T')[0];
    const maxBirthDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate()).toISOString().split('T')[0];
    let nameButton = 'Create';
    if (type === 'update') {
        nameButton = 'Update'
    }

    const getUserData = async () => {
        const dataUser = await getDoc(ref);
        const responseUser = { ...dataUser.data() };
        setUser(responseUser);
        setUserLoaded(true);
    }
    const processData = async () => {
        if (type === 'view' || type === 'update') {
            await getUserData();
        } else {
            setUserLoaded(true);
        }
    }
    useEffect(() => {
        processData();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        let userSend = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            birthDate: birthDateRef.current.value,
        }
        if (type === 'create') {
            userSend = { ...userSend, password: passwordRef.current.value }
            await addDoc(refCreate, userSend);

        }

        if (type === 'update') {
            await updateDoc(ref, userSend);
        }
    }

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
                    <TextField disabled={type === 'view'} label="First Name" inputRef={firstNameRef} defaultValue={user.firstName} variant='outlined' className="mb-4 w-full" sx={{ marginBottom: '8px' }} />
                    <TextField disabled={type === 'view'} label="Last Name" inputRef={lastNameRef} defaultValue={user.lastName} variant='outlined' className="mb-4 w-full" sx={{ marginBottom: '8px' }} />
                    <TextField disabled={type === 'view'} type='email' label='Email' inputRef={emailRef} defaultValue={user.email} variant='outlined' className="mb-4 w-full" sx={{ marginBottom: '8px' }} />
                    {type === 'create' && <TextField type={'password'} label='Password' inputRef={passwordRef} variant='outlined' className="mb-4 w-full" sx={{ marginBottom: '8px' }} />}
                    <TextField disabled={type === 'view'} label='Birth Date' type='date' inputRef={birthDateRef} inputProps={{ min: maxBirthDate, max: minBirthDate }} defaultValue={currentDate} variant='outlined' className="mb-4 w-full" sx={{ marginBottom: '8px' }} />
                    {type !== 'view' && <Button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">{nameButton}</Button>}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </Box>
    );
}
