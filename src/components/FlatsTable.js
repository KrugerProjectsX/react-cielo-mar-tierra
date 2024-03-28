import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from "react";
import { getDocs, query, where, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useRef } from 'react';
import DeleteButton from "../components/DeleteButton";
import ModalFlat from './ModalFlat';

// @Params: type: "my-flats" | "all-flats" | "favorite-flats"
export default function FlatsTable({ type }) {
    const ref = collection(db, "flat"); 
    const userId = JSON.parse(localStorage.getItem('user_logged'));
    
    console.log(userId);
    const [flats, setFlats] = useState([]);

    const getData = async () => {
        if (type === 'my-flats') {
          
           console.log(useRef);
            const search = query(ref, where("user", "==", userId));
            const data = await getDocs(search);
            const rows = data.docs.map((item) => {
                return { ...item.data(), id: item.id }
            });

            setFlats(rows);
        }
        if (type === 'all-flats') {
        const data = await getDocs(ref);
        const rows = data.docs.map((item) => {
            const flatData = item.data();
            const formattedDateAvailable = new Date(flatData.dateAvailable.seconds * 1000).toLocaleDateString();
            return { ...flatData, id: item.id, dateAvailable: formattedDateAvailable };
        });

        setFlats(rows);
    
    }
            
        
        
    }

    useEffect(() => {
        getData();
    }, []);

    return ( 
        <TableContainer>
            <Table className="min-w-full divide-y divide-gray-200" aria-label="simple table">
                <TableHead className="bg-gray-50">
                    <TableRow>
                        <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</TableCell>
                        <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" align="right">Area size</TableCell>
                        <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" align="right">Rent price</TableCell>
                        <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" align="right">Has AC</TableCell>
                        <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" align="right">Date available</TableCell>
                        <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" align="right">Options</TableCell>
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
                            <TableCell className="px-6 py-4 whitespace-nowrap" >{<ModalFlat id={row.id} setFlag={setFlats}></ModalFlat>}</TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap" ><DeleteButton id={row.id} setFlag={setFlats}></DeleteButton> </TableCell>
                                                         
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}