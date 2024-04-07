import React, { useEffect } from "react";
import { TextField } from "@mui/material";

const FilterBar = ({ flats, setFlats }) => {
  useEffect(() => {
    setFlats(flats); // Actualizar los resultados al cargar el componente
  }, [flats, setFlats]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    // Filtrar la lista de apartamentos basada en el valor actual del campo de entrada
    const filteredFlats = flats.filter((flat) => {
      if (name === "city") {
        // Si el valor de la ciudad está vacío, mostrar todos los apartamentos
        if (value.trim() === "") return true;
        // Filtrar los apartamentos por ciudad
        return flat.city.toLowerCase().includes(value.toLowerCase());
      } else if (name === "price") {
        // Convertir el valor del precio a un número
        const price = parseFloat(value);
        // Filtrar los apartamentos con precio menor o igual al valor proporcionado
        return flat.rentPrice <= price;
      } else if (name === "area") {
        // Convertir el valor del área a un número
        const area = parseFloat(value);
        // Filtrar los apartamentos con área menor o igual al valor proporcionado
        return flat.areaSize <= area;
      }
      return true;
    });

    // Actualizar la lista de apartamentos filtrada
    setFlats(filteredFlats);
  };

  return (
    <div className="flex justify-center space-x-4 mb-4">
      <TextField
        name="city"
        label="City"
        onChange={handleFilterChange}
        variant="outlined"
        size="small"
      />
      <TextField
        name="price"
        label="Price"
        onChange={handleFilterChange}
        variant="outlined"
        size="small"
        type="number" // Establecer el tipo de entrada como número para el filtro de precio
        InputProps={{ inputProps: { min: 0 } }} // Establecer el valor mínimo como 0 para el filtro de precio
      />
      <TextField
        name="area"
        label="Area"
        onChange={handleFilterChange}
        variant="outlined"
        size="small"
        type="number" // Establecer el tipo de entrada como número para el filtro de área
        InputProps={{ inputProps: { min: 0 } }} // Establecer el valor mínimo como 0 para el filtro de área
      />
    </div>
  );
};

export default FilterBar;
