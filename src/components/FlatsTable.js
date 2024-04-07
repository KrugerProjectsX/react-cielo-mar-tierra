import * as React from 'react';
import { useEffect, useState } from "react";
import { getDocs, query, where, collection,doc,getDoc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import {Button} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import FilterBar from './FlatFilter';
import { Box, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

// @Params: type: "my-flats" | "all-flats" | "favorite-flats"
export default function FlatsTable({ type , user }) {
;
   
    

    const ref = collection(db, "flat"); 
    const refFav = collection(db, "favorites");

    const userId = JSON.parse(localStorage.getItem('user_logged'));
    const [flats, setFlats] = useState([]);
    const [flag, setFlag ] = useState(false);

    const getData = async () => {




        
        if (type === 'my-flats') {
            const search = query(ref, where("user", "==", userId));
            const data = await getDocs(search);
            const rows = data.docs.map((item) => {
                
                return { ...item.data(), id: item.id }
            });

            setFlats(rows);
        }
        if (type === 'all-flats') {
            const data = await getDocs(ref);
            const allFlats = [];
            for(const item of data.docs){
                const search = query(refFav, where("userId", "==",userId ), where('flatId','==',item.id));
                const dataFav = await getDocs(search);
                const flatData = item.data();
                let favorite =false;
                if(dataFav.docs.length > 0){
                    favorite = dataFav.docs[0].id;
                }
                const flatsWithFav = {...item.data(), id: item.id, dateAvailable: flatData.dateAvailable, favorite: favorite};
                allFlats.push(flatsWithFav)
            }
            setFlats(allFlats);
        }

        if (type === 'favorite-flats') {   
            const search = query(refFav, where("userId", "==",userId ) );
            const data = await getDocs(search);
            const allFlats = [];
            for (const item of data.docs){
                const refFlat = doc(db, "flat", item.data().flatId);
                const dataFlat = await getDoc(refFlat);
                const flatData = item.data();
                allFlats.push({...dataFlat.data(), id: dataFlat.id, favorite: item.id});
            }

            setFlats(allFlats);
        }
    }
    const addFavorite = async (id) => {
        //TODO:  verificar si ya existe esta relacion entre el flat id y userId
        const data = {userId: userId, flatId:id}
        await addDoc(refFav, data);
        setFlag(!flag);
    }

    const removeFavorite = async (id) => {
        const refRemoveFav = doc(db,"favorites",id)
        await deleteDoc(refRemoveFav);
        setFlag(!flag);
    }

    const deleteFlat = async (id) => {
        try {
            await deleteDoc(doc(db, "flat", id));
            setFlag(!flag); // Forzar la recarga de datos después de la eliminación
        } catch (error) {
            console.error("Error al eliminar el flat:", error);
        }
    };

    useEffect(() => {
        getData();
    }, [flag]);

     return ( 
        <>
        {type === 'all-flats' && <FilterBar flats={flats} setFlats={setFlats} />}
        <Box display="flex" justifyContent="center" flexWrap="wrap">
          {flats.map((row, index) => (
            <Box key={index} m={4} maxWidth="360px">
              <Box
                bgcolor="white"
                boxShadow={3}
                borderRadius={4}
                overflow="hidden"
              >
                <img
                  src={row.imgFlat}
                  alt="flat"
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
                <Box p={2}>
                  <Typography variant="h6" gutterBottom>{row.city}</Typography>
                  <Typography variant="body1">Precio: ${row.rentPrice}</Typography>
                </Box>
                <Box p={2} borderTop={1} borderColor="grey.200">
                  <Typography variant="body2">Area Size: {row.areaSize}</Typography>
                  <Typography variant="body2">Disponible: {row.dateAvailable}</Typography>
                </Box>
                <Box p={2} borderTop={1} borderColor="grey.200">
                  <Typography variant="body2">AC: {row.hasAC ? 'Yes' : 'No'}</Typography>
                  <Box>
                    <Button href={`/flat/${row.id}`} variant="text">
                      <VisibilityIcon style={{ color: 'black' }} />
                    </Button>
                    {type === 'my-flats' && (
                      <Button href={`/flat/edit/${row.id}`} variant="text">
                        <ModeEditIcon style={{ color: 'black' }} />
                      </Button>
                    )}
                    {!row.favorite && (
                      <Button onClick={() => addFavorite(row.id)} variant="text">
                        <FavoriteBorderIcon style={{ color: 'black' }} />
                      </Button>
                    )}
                    {row.favorite && (
                      <Button onClick={() => removeFavorite(row.favorite)} variant="text">
                        <FavoriteIcon sx={{ color: 'red' }} />
                      </Button>
                    )}
                    {user && (user.role === 'admin' || user.role === 'landlord') && (
                      <Button onClick={() => deleteFlat(row.id)} variant="text">
                        <DeleteIcon style={{ color: 'black' }} />
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </>
    );
}