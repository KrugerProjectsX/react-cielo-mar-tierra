import React, { useEffect, useState, useRef } from "react";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app, db } from "../firebase";
import { Box, Switch } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

function FlatForm({ type, id }) {
  let urlImDesc;
  let pathImg;
  const [flatLoaded, setFlatLoaded] = useState(false);
  const currentDate = new Date().toJSON().slice(0, 10);
  const [flat, setFlat] = useState({
    city: '',
    areaSize: 0,
    dateAvailable: currentDate,
    hasAC: false,
    rentPrice: 0,
    streetName: '',
    streetNumber: 0,
    yearBuilt: 0,
  });

  const navigate = useNavigate();
  const cityRef = useRef('');
  const streetNameRef = useRef('');
  const streetNumberRef = useRef(0);
  const areaSizeRef = useRef(0);
  const hasACRef = useRef(false);
  const yearBuiltRef = useRef(0);
  const rentPriceRef = useRef(0);
  const dateAvailableRef = useRef('');

  const [alertMessage, setAlertMessage] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const userCollection = collection(db, 'flat');
  const storage = getStorage(app);

  let refFlat = null;
  if (id && type !== 'create') {
    refFlat = doc(db, "flat", id);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasAC = hasACRef.current.checked ? "Yes" : "No";
    if (
      areaSizeRef.current.value.trim() === "" ||
      cityRef.current.value.trim() === "" ||
      dateAvailableRef.current.value.trim() === "" ||
      rentPriceRef.current.value.trim() === "" ||
      streetNameRef.current.value.trim() === "" ||
      streetNumberRef.current.value.trim() === "" ||
      yearBuiltRef.current.value.trim() === ""
    ) {
      setAlertMessage("Por favor, complete todos los campos");
      setIsAlertOpen(true);
      return;
    }

    if (pathImg === undefined || pathImg === "") {
      // Si no hay una imagen seleccionada, usar una URL de imagen predeterminada
      urlImDesc =
        "https://firebasestorage.googleapis.com/v0/b/flat-project-1ac7a.appspot.com/o/documentos%2Fperson.png?alt=media&token=6db5d670-b6de-479e-b9ea-a60ed3ce2497";
    } else {
      urlImDesc = pathImg;
    }

    let flatSend = {
      areaSize: areaSizeRef.current.value,
      city: cityRef.current.value,
      dateAvailable: dateAvailableRef.current.value,
      hasAC: hasAC,
      rentPrice: rentPriceRef.current.value,
      streetName: streetNameRef.current.value,
      streetNumber: streetNumberRef.current.value,
      yearBuilt: yearBuiltRef.current.value,
      user: JSON.parse(localStorage.getItem('user_logged')),
      imgFlat: urlImDesc
    };

    if (type === "create") {
      flatSend = { ...flatSend };
      await addDoc(userCollection, flatSend);
      setAlertMessage("Flat creado");
      setIsAlertOpen(true);
      // Limpiar campos después de crear
      areaSizeRef.current.value = "";
      cityRef.current.value = "";
      dateAvailableRef.current.value = "";
      hasACRef.current.value = "";
      rentPriceRef.current.value = "";
      streetNameRef.current.value = "";
      streetNumberRef.current.value = "";
      yearBuiltRef.current.value = "";
      navigate('/flats', { replace: false });
    }
  }

  const getFlatData = async () => {
    const dataFlat = await getDoc(refFlat);
    const responseFlat = { ...dataFlat.data() };
    setFlat(responseFlat);
    setFlatLoaded(true);
  }
  const processData = async () => {
    if (type === 'update' || type === 'view') {
      await getFlatData();
    } else {
      setFlatLoaded(true)
    }
  }

  useEffect(() => {
    processData();
  }, []);

  const fileHandler = async (e) => {
    //detectar el archivo
    const archivoI = e.target.files[0];
    //cargar esto al storage
    const refArchivo = ref(storage, `documentos/${archivoI.name}`);
    await uploadBytes(refArchivo, archivoI);
    //obtener la url de la imagen
    urlImDesc = await getDownloadURL(refArchivo);
  }

  return (
    <>
      <form class="max-w-md mx-auto my-4" onSubmit={handleSubmit}>

        {flatLoaded ? <>

          {type !== "create" && (
            <div class="max-w-md w-full lg:max-w-full lg:flex">
              <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ backgroundImage: `url(${flat.imgFlat})` }} title="Woman holding a mug"></div>
              <div class="border border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <p class="text-sm text-gray-600 flex items-center">
                  <svg class="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                  </svg>
                  Flat
                </p>
                <div class="text-gray-900 font-bold text-xl mb-2">Details</div>
                <p class="text-gray-700 text-base"><strong>City:</strong> {flat.city} <br /> <strong>Street name:</strong> {flat.streetName} <br /> <strong>Street number:</strong> {flat.streetNumber} <br /><strong>Area size:</strong> {flat.areaSize} <br /><strong>Date available:</strong> {flat.dateAvailable} <br /><strong>Has AC:</strong> {flat.hasAC}</p>
                <div class="flex items-center">
                  <img class="w-10 h-10 rounded-full mr-4" src={flat.imgFlat} alt="Avatar of Jonathan Reinink"></img>
                  <div class="text-sm">
                    <p class="text-gray-900 leading-none"><strong>Price:</strong>{flat.rentPrice}</p>
                    <p class="text-gray-600"><strong>Year Built:</strong>{flat.yearBuilt}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {type === 'create' && (
            <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label for="city" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                <input disabled={type === 'view'} type="text" id="city" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ref={cityRef} defaultValue={flat.city} variant="outlined" placeholder="City" required />
              </div>
              <div>
                <label for="streetName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Street name</label>
                <input disabled={type === 'view'} type="text" id="streetName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ref={streetNameRef} defaultValue={flat.streetName} variant="outlined" placeholder="Street name" required />
              </div>
              <div>
                <label for="streetNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Street number</label>
                <input disabled={type === 'view'} type="number" id="streetNumber" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ref={streetNumberRef} defaultValue={flat.streetNumber} variant="outlined" placeholder="Street number" required />
              </div>
              <div>
                <label for="areaSize" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Area Size</label>
                <input disabled={type === 'view'} type="number" id="areaSize" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ref={areaSizeRef} defaultValue={flat.areaSize} placeholder="Area Size" required />
              </div>
              <div>
                <Box className="flex items-center mb-4">
                  <label>Has AC</label>
                  <Switch disabled={type === 'view'} defaultValue={flat.hasAc} id="hasAC" ref={hasACRef} color="primary" />
                </Box>
              </div>
              <div>
                <label for="yearBuilt" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year built</label>
                <input disabled={type === 'view'} type="number" id="yearBuilt" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ref={yearBuiltRef} inputProps={{ min: 1900, max: 2050 }} defaultValue={flat.yearBuilt} placeholder="Year Built" required />
              </div>
              <div>
                <label for="rentPrice" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rent Price</label>
                <input disabled={type === 'view'} type="number" id="rentPrice" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ref={rentPriceRef} placeholder="Rent Price" defaultValue={flat.rentPrice} required />
              </div>
              <div>
                <label for="dateAvailable" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Available</label>
                <input disabled={type === 'view'} type="date" id="dateAvailable" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ref={dateAvailableRef} defaultValue={flat.dateAvailable} required />
              </div>
              <div>
                <label for="file" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo</label>
                <input disabled={type === 'view'} type="file" id="file"  placeholder="Add photo" className="form-control" onChange={fileHandler} />
              </div>
              <div>
            </div>
            <div className="flex justify-center mt-4"  >
                {type === 'create' && <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-7.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Flat</button>}
            </div>
          </div>
          
          )}
        </> : <p>Loading...</p>
        }
      </form>

    </>
  );
}

export default FlatForm;
