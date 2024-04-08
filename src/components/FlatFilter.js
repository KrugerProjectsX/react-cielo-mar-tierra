import React, { useState, useEffect } from "react";
import { TextField, Button, styled } from "@mui/material";

const BlackButton = styled(Button)({
  backgroundColor: "black",
  color: "white",
  '&:hover': {
    backgroundColor: "#333", // Darken the color on hover
  },
});

const FilterBar = ({ flats, setFlats }) => {
  const [filterValues, setFilterValues] = useState({
    city: "",
    price: "",
    area: ""
  });

  const [appliedFilters, setAppliedFilters] = useState({
    city: "",
    price: "",
    area: ""
  });

  const [searchClicked, setSearchClicked] = useState(false); // Estado para rastrear si se hizo clic en el botón de búsqueda

  useEffect(() => {
    // Apply filtering when appliedFilters change
    filterFlats();
  }, [appliedFilters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    // Update filterValues state
    setFilterValues({
      ...filterValues,
      [name]: value
    });
  };

  const handleSearch = () => {
    // Apply the filters
    setAppliedFilters({ ...filterValues });
    setSearchClicked(true); // Establecer el estado de búsqueda como verdadero
  };

  const handleClearFilters = () => {
    // Clear all filter values
    setFilterValues({
      city: "",
      price: "",
      area: ""
    });
    // Clear applied filters
    setAppliedFilters({
      city: "",
      price: "",
      area: ""
    });
    setSearchClicked(false); // Restablecer el estado de búsqueda como falso
    // Refresh the page
    window.location.reload();
  };

  const filterFlats = () => {
    // Filter the flats array based on appliedFilters
    const filteredFlats = flats.filter((flat) => {
      if (appliedFilters.city && !flat.city.toLowerCase().includes(appliedFilters.city.toLowerCase())) {
        return false;
      }
      if (appliedFilters.price && flat.rentPrice > parseFloat(appliedFilters.price)) {
        return false;
      }
      if (appliedFilters.area && flat.areaSize > parseFloat(appliedFilters.area)) {
        return false;
      }
      return true;
    });
    // Update the flats state with filtered flats
    setFlats(filteredFlats);
  };

  return (
    <div className="flex justify-center space-x-4 mb-4">
      <TextField
        name="city"
        label="City"
        value={filterValues.city}
        onChange={handleFilterChange}
        variant="outlined"
        size="small"
        disabled={searchClicked} // Deshabilitar el campo de texto si se hizo clic en el botón de búsqueda
      />
      <TextField
        name="price"
        label="Price"
        value={filterValues.price}
        onChange={handleFilterChange}
        variant="outlined"
        size="small"
        type="number"
        InputProps={{ inputProps: { min: 0 } }}
        disabled={searchClicked} // Deshabilitar el campo de texto si se hizo clic en el botón de búsqueda
      />
      <TextField
        name="area"
        label="Area"
        value={filterValues.area}
        onChange={handleFilterChange}
        variant="outlined"
        size="small"
        type="number"
        InputProps={{ inputProps: { min: 0 } }}
        disabled={searchClicked} // Deshabilitar el campo de texto si se hizo clic en el botón de búsqueda
      />
      <BlackButton variant="contained" onClick={handleSearch} disabled={searchClicked}>Search</BlackButton>
      <BlackButton variant="contained" onClick={handleClearFilters}>Clear</BlackButton>
    </div>
  );
};

export default FilterBar;
