import * as React from 'react';
import { useState, useRef } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Modal from '@mui/material/Modal';
import { doc, getDoc, updateDoc } from "firebase/firestore";
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

// Componente ModalUser
function ModalUser({ id, setFlag }) {
    const refDoc = doc(db, "user", id); // Referencia al documento de usuario en Firestore

    // Estados
    const [open, setOpen] = useState(false); // Estado para controlar la apertura y cierre del modal
    const [user, setUser] = useState({ // Estado para almacenar los datos del usuario
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        birthDate: '',
        role: ''
    });
    const firstName = useRef(''); // Referencia al input de primer nombre
    const lastName = useRef(''); // Referencia al input de apellido
    const email = useRef(''); // Referencia al input de email
    const password = useRef(''); // Referencia al input de contraseña
    const birthDate = useRef(''); // Referencia al input de fecha de nacimiento
    const [roleRef, setRoleRef] = useState(user.role); // Estado para almacenar el rol del usuario
    const [alertMessage, setAlertMessage] = useState(""); // Estado para el mensaje de alerta
    const [isAlertOpen, setIsAlertOpen] = useState(false); // Estado para controlar la apertura y cierre de la alerta

    // Función para obtener los datos del usuario
    const getUsers = async () => {
        const response = await getDoc(refDoc); // Obtiene el documento de usuario en Firestore
        setUser(response.data()); // Establece los datos del usuario en el estado
    };

    // Función para abrir el modal
    const handleOpen = async () => {
        await getUsers(); // Obtiene los datos del usuario
        setOpen(true); // Abre el modal
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado del formulario
        await updateDoc(refDoc, { // Actualiza el documento de usuario en Firestore
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            email: email.current.value,
            password: password.current.value,
            birthDate: birthDate.current.value,
            role: roleRef,
        });
        handleClose(); // Cierra el modal
        setFlag((prev) => !prev); // Actualiza el estado de la bandera para recargar la página
        setAlertMessage("Usuario actualizado con éxito"); // Establece el mensaje de alerta
        setIsAlertOpen(true); // Abre la alerta
    };

    // Función para cerrar el modal
    const handleClose = () => setOpen(false);

    // Función para manejar el cambio de rol
    const handleRoleChange = (event) => {
        setRoleRef(event.target.value); // Establece el nuevo valor del rol
    };

    // Función para cerrar la alerta
    const handleAlertClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setIsAlertOpen(false); // Cierra la alerta
    };

    return (
        <div>
            <Button onClick={handleOpen}>Edit</Button> {/* Botón para abrir el modal */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form className='title' onSubmit={handleSubmit}>
                        <h2 className="title">Update user info</h2>
                        {/* Inputs para editar los datos del usuario */}
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
                            {/* Select para seleccionar el rol del usuario */}
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
                        {/* Botón para actualizar los datos del usuario */}
                        <Button variant="contained" type="submit" sx={{ width: "220px" }}>
                            Update
                        </Button>
                    </form>
                </Box>
            </Modal>
            {/* Alerta para mostrar mensajes */}
            <Snackbar open={isAlertOpen} autoHideDuration={2000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="error">{alertMessage}</Alert>
            </Snackbar>
        </div>
    );
}

export default ModalUser; // Exporta el componente ModalUser
