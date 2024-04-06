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
import { none, butt, miter, nonzero, strokeLinejoin,rgb  } from 'svg.js';



// @Params: type: "my-flats" | "all-flats" | "favorite-flats"
export default function FlatsTable({ type }) {
    const none = 'none';
   
    

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
                const formattedDateAvailable = flatData.dateAvailable ? new Date(flatData.dateAvailable.seconds * 1000).toLocaleDateString() : '';
                let favorite =false;
                if(dataFav.docs.length > 0){
                    favorite = dataFav.docs[0].id;
                }
                const flatsWithFav = {...item.data(), id: item.id, dateAvailable: formattedDateAvailable, favorite: favorite};
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
        <div className="flex flex-wrap justify-center">
        {flats.map((row, index) => ( 
        <div key={index} className="m-4">
            <div class="profile-card w-[250px] rounded-md shadow-xl overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group h-[460px]">
            <div class="avatar w-full pt-5 flex items-center justify-center flex-col gap-1">
            <div class="avatar w-full pt-5 flex items-center justify-center flex-col gap-1">
            <div class="img_container w-full flex items-center justify-center relative z-40 after:absolute after:h-[6px] after:w-full after:bg-[#58b0e0] after:top-4 after:group-hover:size-[1%] after:delay-300 after:group-hover:delay-0 after:group-hover:transition-all after:group-hover:duration-300 after:transition-all after:duration-300 before:absolute before:h-[6px] before:w-full before:bg-[#58b0e0] before:bottom-4 before:group-hover:size-[1%] before:delay-300 before:group-hover:delay-0 before:group-hover:transition-all before:group-hover:duration-300 before:transition-all before:duration-300">
                <img src={row.imgFlat} alt="Avatar" class="w-64 h-36 object-cover z-40 border-4 border-white rounded-md group-hover:border-8 group-hover:transition-all group-hover:duration-300 transition-all duration-300" id="avatar" />
                <div class="absolute bg-[#BCDAF9] z-10 w-full h-full group-hover:w-0 group-hover:h-0 group-hover:transition-all group-hover:duration-300 transition-all duration-300 delay-700 group-hover:delay-0"></div>
            </div>
        </div>
        </div>
               <div class="headings *:text-center *:leading-4 mt-[-20px]" >
                    <p class="text-sm font-serif font-semibold text-[#434955]">{row.city}</p>
                    <p class="text-sm font-semibold text-[#434955] mt-[-10px]"><strong>Precio: </strong>${row.rentPrice}</p>
                </div>
                <div class="w-full items-center justify-center flex mt-[-40px]">
                    <ul class="flex flex-col items-start gap-1 has-[:last]:border-b-0 *:inline-flex :gap-1 :items-center :justify-center :border-b-[1.5px] *:border-b-stone-700:border-dotted *:text-xs *:font-semibold *:text-[#434955] pb-3">
                        <li>
                            <div>
                                <div style={{ display: 'block' }}>
                                    <p><strong>Area Size: </strong>{row.areaSize}</p>
                                </div>
                                <div style={{ display: 'block' }}>
                                    <p><strong>Date Available: </strong>{row.dateAvailable}</p>
                                </div>
                                <div style={{ display: 'block' }}>
                                    <p><strong>Has AC: </strong>{row.hasAc ? 'Yes' : 'No'}</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="flex justify-center"> 
                                <div style={{ display: 'block' }}>
                                <Button href={`/flat/${row.id}`} >View</Button>
                                {type === 'my-flats' && <Button href={`/flat/edit/${row.id}`} >Edit</Button>} 
                                </div>
                            </div>
                            <div class="flex justify-center">
                                {(type === 'all-flats'|| type=== 'favorite-flats') && <div style={{ display: 'block' }}>
                                    {!row.favorite && <Button onClick={()=>addFavorite(row.id)}>Add Favorite</Button>}
                                    {row.favorite && <Button onClick={()=>removeFavorite(row.favorite)}>Remove Favorite</Button>}
                                </div> }
                            
                            </div>
                        </li>
                      
                    </ul>
                </div>
                <hr class="w-full group-hover:h-5 h-3 bg-[#58b0e0] group-hover:transition-all group-hover:duration-300 transition-all duration-300 mt-[-30px]" />
        </div>
    </div>
         ))}  

</div>

  </>

 );
 
}