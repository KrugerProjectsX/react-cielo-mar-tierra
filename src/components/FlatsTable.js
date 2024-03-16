import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { collection, query, getDocs, where } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../firebase";

// @Params type: 'my-flats' | 'all-flats' | 'favorite-flats'
export default function FlatsTable ({type}) {
    const ref = collection (db, "flats");
    const userId = JSON.parse(localStorage.getItem('user_logged'));

    async function getData() {
        if (type === 'my-flats') {
          const search = query(ref, where("user", "==", userId))
          const data = await getDocs(search)
          console.log(data);
          const rows = data.docs.map((item) =>{
            return {...item.data(), id: item.id}

          }
                
          
        );
        }

        const getData = async () =>{
            if (type === 'all-flats') {
    
            }
        
            if (type === 'favorite-flats') {
        
            }

            if (type === 'my-flats'){
            }

        }
    
       
      }

return (
    <>
    </>

)


} 