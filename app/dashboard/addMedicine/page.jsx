"use client"

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { createProduct } from "@/app/GlobalRedux/Features/productSlice";
import { useDispatch } from 'react-redux';

// English to German field name mapping
const fieldNameMapping = {
  name: 'Name',
  brand: 'Marke',
  manufacturer: 'Hersteller',
  pzn: 'PZN',
  image: 'Bild',
  distributionForm: 'Verteilungsform',
  packageSize: 'Packungsgröße',
  illness: 'Krankheit',
  manufacturerCountry: 'Herstellungsland',
  type: 'Typ',
  discount: 'Rabatt',
  activeIngredient: 'Wirkstoff',
  dosage: 'Dosierung',
  sideEffects: 'Nebenwirkungen',
  pregnancyNotification: 'Schwangerschaftshinweis',
  price: 'Preis',
  expirationDate: 'Verfallsdatum',
  applicationMethod: 'Anwendungsmethode',
  description: 'Beschreibung'
};

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
    console.log(values)
  };

  return (
    <>
    <Box sx={{textAlign:"center"}} fontWeight="bold">Medikament Hinzufügen</Box> 
    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
      <form
        style={{ maxWidth: "900px", marginBottom: "150px", display: "flex", flexDirection: "column", minWidth: "900px" }}
        onSubmit={handleSubmit}
      >
        {Object.keys(initialValues).map((fieldName) => (
          <TextField
            key={fieldName}
            label={fieldNameMapping[fieldName]} // Use the mapped German label
            name={fieldName}
            value={values[fieldName]}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
        ))}
        <Button sx={{ marginTop: "50px", width: "250px" }} type="submit" variant="contained" color="primary">Senden</Button>
      </form>
    </Box>
    </>
  );
};

export default addMedicine;
