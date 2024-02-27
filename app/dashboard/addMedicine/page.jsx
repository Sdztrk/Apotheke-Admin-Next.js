"use client"

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import {createProduct} from "@/app/GlobalRedux/Features/productSlice"
import { useDispatch } from 'react-redux';


const initialValues = {
  name: '',
  brand: '',
  manufacturer: '',
  pzn: '',
  image: '',
  distributionForm: '',
  packageSize: '',
  illness: '',
  manufacturerCountry: '',
  type: '',
  discount: false,
  activeIngredient: '',
  dosage: '',
  sideEffects: '',
  pregnancyNotification: '',
  price: '',
  expirationDate: '',
  applicationMethod: '',
  description: ''
};

const fieldNames = [
  'Name', 'Marke', 'Hersteller', 'PZN', 'Bild', 'Verteilungsform', 'Packungsgröße',
  'Krankheit', 'Herstellungsland', 'Typ', 'Rabatt', 'Wirkstoff', 'Dosierung',
  'Nebenwirkungen', 'Schwangerschaftshinweis', 'Preis', 'Verfallsdatum', 'Anwendungsmethode',
  'Beschreibung'
];


const addMedicine = () => {
  const dispatch = useDispatch()
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createProduct(values))
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems:"center" }}>
      <form
        style={{ maxWidth: "900px", marginBottom:"150px" , display:"flex", flexDirection:"column", minWidth:"900px"}}
        onSubmit={handleSubmit}
      >
        {fieldNames.map((fieldName) => (
          <TextField
            key={fieldName}
            label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
            name={fieldName}
            value={values[fieldName]}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
        ))}
        <Button sx={{marginTop:"50px", width:"250px"}} type="submit" variant="contained" color="primary">Senden</Button>
      </form>
    </Box>
  );
};


export default addMedicine;