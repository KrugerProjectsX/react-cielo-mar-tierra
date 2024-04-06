import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from "react";
import { getDocs, query, where, collection,doc,getDoc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import {Button} from "@mui/material";

// @Params: type: "my-flats" | "all-flats" | "favorite-flats"
export default function FlatsTable({ type }) {
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
                const flatData = item.data();
                return { ...item.data(), dateAvailable: flatData.dateAvailable,id: item.id }
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
                const formattedDateAvailable = flatData.dateAvailable ? new Date(flatData.dateAvailable.seconds * 1000).toLocaleDateString() : '';
                allFlats.push({...dataFlat.data(), id: dataFlat.id, dateAvailable: formattedDateAvailable, favorite: item.id});
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

    useEffect(() => {
        getData();
    }, [flag]);

     return ( 
        <>
        <br />
       
      <TableContainer>
        
      <Table className="min-w-full divide-y divide-gray-200" aria-label="simple table">
          <TableHead className="bg-gray-50">
               <TableRow>
                    
                  <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</TableCell>
                  <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" align="right">Area size</TableCell>
                  <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" align="right">Rent price</TableCell>
                  <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" align="right">Has AC</TableCell>
                  <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" align="right">Date available</TableCell>
                  {(type === 'all-flats'|| type=== 'favorite-flats') && <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" align="right"></TableCell>}
                  <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" align="right"></TableCell>
              </TableRow>
          </TableHead>
          <TableBody className="bg-white divide-y divide-gray-200">
              {flats.map((row) => (
                  <TableRow key={row.id}>
                      <TableCell className="px-6 py-4 whitespace-nowrap">{row.city}</TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap" >{row.areaSize}</TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap" >{row.rentPrice}</TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap" >{row.hasAc ? 'Yes' : 'No'}</TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap" >{row.dateAvailable}</TableCell>
                      {(type === 'all-flats'|| type=== 'favorite-flats') && <TableCell className="px-6 py-4 whitespace-nowrap" >
                                {!row.favorite && <Button onClick={()=>addFavorite(row.id)}>Add Favorite</Button>}
                                {row.favorite && <Button onClick={()=>removeFavorite(row.favorite)}>Remove Favorite</Button>}
                            </TableCell> }
                            <TableCell className="px-6 py-4 whitespace-nowrap">
                                <Button href={`/flat/${row.id}`} >View</Button>
                                {type === 'my-flats' && <Button href={`/flat/edit/${row.id}`} >Edit</Button>}
                            </TableCell>
                  </TableRow>
              ))}
          </TableBody>
      </Table>
  </TableContainer>

  </>

 );
 
}