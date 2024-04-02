import * as React from 'react';
import { useState, useRef } from 'react';
import {Box,FormControl,InputLabel,Select,MenuItem, Snackbar,Alert} from '@mui/material';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Modal from '@mui/material/Modal';
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from '../firebase';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #FFFFF',
    borderRadius: '32px',
    boxShadow: 24,
    p: 4,
};

function ModalUser({id, setFlag}) {
    const label = { inputProps: { "aria-label": "Checkbox demo" } };

    const refDoc = doc(db, "user", id);

    const [open, setOpen] = useState(false);

    const [user, setUser] = useState({
        firstName: '',
        lastName:'',
        email:'',
        password:'',
        birthDate:'',
        role:''
    })

    const firstName = useRef('');
    const lastName = useRef('');
    const email = useRef('');
    const password = useRef('');
    const birthDate = useRef('');
    const role = useRef('');
    //const [roleRef, setRole] = useState('');
    const [roleRef, setRoleRef] = useState(user.role); 
    const [alertMessage, setAlertMessage] = useState("");
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const getUsers = async () => {
        const response = await getDoc(refDoc);
        setUser(response.data())
    }

    const handleOpen = async () => {
        await getUsers()
        setOpen(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateDoc(refDoc, {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            email: email.current.value,
            password: password.current.value,
            birthDate: birthDate.current.value,
            role: roleRef,
        })
        handleClose();
        setFlag((prev)=> !prev)
        setAlertMessage("Actualización de usuario con éxito");
        setIsAlertOpen(true);
    }

    const handleClose = () => setOpen(false);

    const handleRoleChange = (event) => {
        setRoleRef(event.target.value);
      };
      const handleAlertClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        setIsAlertOpen(false);
      };
 
    return (
        <div>
            <Button onClick={handleOpen}>Edit</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form className='title' onSubmit={handleSubmit}>
                        <h2 className="title">Update user info</h2>
                        <TextField
                            inputRef={firstName}
                            defaultValue={user.firstName}
                            label="First Name"
                            variant="outlined"
                            type="text"
                            sx={{ marginBottom: "10px" }}
                        />
                        <br />
                        <TextField
                            inputRef={lastName}
                            defaultValue={user.lastName}
                            label="Last Name"
                            variant="outlined"
                            type="text"
                            sx={{ marginBottom: "10px" }}
                        />
                        <br />
                        <TextField
                            inputRef={email}
                            defaultValue={user.email}
                            label="Email"
                            variant="outlined"
                            type="text"
                            sx={{ marginBottom: "10px" }}
                        />
                        <br />
                        <TextField
                            inputRef={password}
                            defaultValue={user.password}
                            label="Password"
                            variant="outlined"
                            type="password"
                            sx={{ marginBottom: "10px" }}
                        />
                        <br />
                        <TextField
                            inputRef={birthDate}
                            defaultValue={user.birthDate}
                            label="Birth Date"
                            variant="outlined"
                            type="date"
                            sx={{ marginBottom: "10px" }}
                        />
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                            <InputLabel id="role">Role</InputLabel>
                            <Select
                                labelId="role-select-label"
                                id="roleRef"
                                value={roleRef}
                                label="Role"
                                onChange={handleRoleChange}
                                >
                                <MenuItem value={''}>Seleccione...</MenuItem>
                                <MenuItem value={'landlord'}>Landlords</MenuItem>
                                <MenuItem value={'renter'}>Renters</MenuItem>
                            </Select>
                            </FormControl>
                        </Box>

                        <Button variant="contained" type="submit" sx={{ width: "220px" }}>
                            Update
                        </Button>
                    </form>
                </Box>
            </Modal>

            <Snackbar open={isAlertOpen} autoHideDuration={2000} onClose={() => setIsAlertOpen(false)}>
                       <Alert onClose={handleAlertClose} severity="error">{alertMessage}</Alert>
            </Snackbar>


        </div>
    );
}

export default ModalUser;