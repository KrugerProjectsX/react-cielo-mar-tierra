import React from "react";

import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../firebase";
import { Box, Switch } from "@mui/material";

const db = getFirestore(app);
const storage = getStorage(app);

function Form() {
  let urlImDesc;

  const guardarInfo = async (e) => {
    e.preventDefault();
    const city = e.target.city.value;
    const streetName = e.target.streetName.value;
    const streetNumber = e.target.streetNumber.value;
    const areaSize = e.target.areaSize.value;
    const hasAC = e.target.hasAC.value;
    const yearBuilt = e.target.yearBuilt.value;
    const rentPrice = e.target.rentPrice.value;
    const dateAvailable = e.target.dateAvailable.value;

    const newFlats = {
      city: city,
      streetName: streetName,
      streetNumber: streetNumber,
      areaSize: areaSize,
      hasAC: hasAC,
      yearBuilt: yearBuilt,
      rentPrice: rentPrice,
      dateAvailable: dateAvailable,
      imagen: urlImDesc,
    };
    //funcion de guardado
    try {
      await addDoc(collection(db, "flat"), {
        ...newFlats,
      });
    } catch (error) {
      console.log(error);
    }

    e.target.city.value = "";
    e.target.streetName.value = "";
    e.target.streetNumber.value = "";
    e.target.areaSize.value = "";
    e.target.hasAC.value = "";
    e.target.yearBuilt.value = "";
    e.target.rentPrice.value = "";
    e.target.dateAvailable.value = "";
    e.target.file.value = "";
  };

  const fileHandler = async (e) => {
    //detectar el archivo
    const archivoI = e.target.files[0];
    //cargar esto al storage
    const refArchivo = ref(storage, `documentos/${archivoI.name}`);
    await uploadBytes(refArchivo, archivoI);
    //obtener la url de la imagen
    urlImDesc = await getDownloadURL(refArchivo);
  };

  //funcion de gurardado
  return (
    <div className=" card card-body">
      <h3 className="text-center">Agregar Flats</h3>
      <form onSubmit={guardarInfo}>
        <label>City</label>
        <div className="form-group">
          <input
            type="text"
            placeholder="City"
            id="city"
            className="form-control mt-1"
            required
          ></input>
        </div>
        <label>Street name</label>
        <div className="form-group">
          <input
            type="text"
            placeholder="Street Name"
            id="streetName"
            className="form-control mt-1"
            required
          ></input>
        </div>
        <label>Street number</label>
        <div className="form-group">
          <input
            type="number"
            placeholder="Street Number"
            id="streetNumber"
            className="form-control mt-1"
            required
          ></input>
        </div>
        <label>Area Size</label>
        <div className="form-group">
          <input
            type="number"
            placeholder="Area Size"
            id="areaSize"
            className="form-control mt-1"
            required
          ></input>
        </div>

        <Box className="flex items-center mb-4">
          <label>Has AC</label>
          <Switch id="hasAC" color="primary" />
        </Box>

        <label>Year built</label>
        <div className="form-group">
          <input
            type="number"
            placeholder="Year built"
            id="yearBuilt"
            className="form-control mt-1"
            required
          ></input>
        </div>
        <label>Rent Price</label>
        <div className="form-group">
          <input
            type="number"
            placeholder="Rent Price"
            id="rentPrice"
            className="form-control mt-1"
            required
          ></input>
        </div>
        <label>Date available</label>
        <div className="form-group">
          <input
            type="date"
            placeholder="Date available"
            id="dateAvailable"
            className="form-control mt-1"
            required
          ></input>
        </div>
        <label>Agregar imagen</label>
        <div className="form-group">
          <input
            type="file"
            id="file"
            placeholder="agregar imagen"
            className="form-control"
            onChange={fileHandler}
          />
        </div>

        <button className="btn btn-primary" mt-3 from-control>
          Add Flat
        </button>
      </form>
    </div>
  );
}

export default Form;
