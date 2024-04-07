import {useEffect, useRef, useState} from "react";
import {addDoc, collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import {db} from "../firebase";
import {Box, Button, TextField,Typography} from "@mui/material";

export default function Messages({flatId}) {
    const ref = doc(db, "flat", flatId);
    const refMessages = collection(db, "messages");

    const [flat, setFlat] = useState({});
    //type = view | type = create
    const [type, setType] = useState('create');
    const [messages, setMessages] = useState([]);
    const messageInput= useRef('');
    
    const getMessages = async () => {
        const search = query(refMessages, where("flatId", "==", flatId));
        const dataMessages = await getDocs(search);
        const rows = dataMessages.docs.map((item) => {
            return { ...item.data(), id: item.id }
        });   
        setMessages(rows);
    }
    
    const getFlat = async () => {
        const userId = JSON.parse(localStorage.getItem('user_logged'));
        const dataFlat = await getDoc(ref);
        const responseFlat = { ...dataFlat.data() };
        if (responseFlat.user === userId){
            setType('view')
            await getMessages();
            
        }else{
            setType('create')
            
        }
        setFlat(responseFlat)
    }
    
    useEffect(
        () => {
            getFlat();
        }, []
    )
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const message = messageInput.current.value;
        const data = {
            message: message,
            flatId: flatId,
            userId: JSON.parse(localStorage.getItem('user_logged'))
            
        }
        await addDoc(refMessages, data);

    }
    return (
      <Box
      marginTop='20px'
      marginX='auto'
      p={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bgcolor="rgba(255, 255, 255, 0.5)"
      maxWidth="400px" // Cambiado a 400px
      borderRadius='20px'
     
    >
      <Typography variant="h3" gutterBottom>
        Messages
      </Typography>
      {type === 'create' && (
        <Box
        
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={2} // Cambiado a 2
          borderRadius={4}
          bgcolor="rgba(255, 255, 255, 1)"
          boxShadow={4}
          width="fit-content"
          margin="auto"
        >
          <TextField
            type="text"
            label="Message"
            inputRef={messageInput}
            multiline
            rows={2}
            variant="outlined"
            sx={{
              width: '18rem', // Reducido el ancho a 18rem
              height: '4rem', // Reducido el alto a 4rem
            }}
            style={{ color: 'black' }}
          />
          <Button className="mt-4" type="submit" variant="contained" sx={{backgroundColor:'black'}}>
            Send
          </Button>
        </Box>
      )}
      {type === 'view' && messages.map((item) => (
        <Box
          className="w-48 h-9 flex"
          key={item.id}
          border={1}
          p={2} // Cambiado a 2
          m={4}
          borderRadius={4}
          bgcolor="rgba(255, 255, 255, 1)"
          width="fit-content"
          margin="auto"
        >
          <Typography className="w-2/5 h-9" variant="body1" align="center">
            {item.message}
          </Typography>
        </Box>
      ))}
    </Box>
    
      );
}