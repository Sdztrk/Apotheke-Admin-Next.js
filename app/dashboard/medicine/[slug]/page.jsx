"use client"

import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Table, TableBody, TableCell, TableContainer, TableRow, Typography, CardMedia, Box, Paper, TableHead } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { updateProduct } from "@/app/GlobalRedux/Features/productSlice";
import { useDispatch } from 'react-redux';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: 20,
    marginBottom: 20,
  },
});

const MedicinePage = () => {
  const dispatch = useDispatch();

  const medicine = useSelector((state) => state.product.selectedProduct);
  console.log(medicine)

  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState(medicine);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    await dispatch(updateProduct(medicine._id, values));
    setOpen(false);
  };

  const medicineArray = medicine ? Object.keys(values) : [];
  //  console.log(medicineArray)

  return (
    <Box sx={{ width: "98vw", display: "flex", flexDirection: "row-reverse", justifyContent: "space-around", marginLeft:"100px" }}>
      <CardMedia
        image={medicine?.image}
        title={medicine?.name}
        sx={{ height: "300px", width: "400px", position: "fix", top: "150px", right: "150px", objectFit: "contain" }}
        component="img"
      />
      <Box>
        <Button variant="outlined" onClick={handleClickOpen}>
          Bearbeiten
        </Button>
        <Button variant="outlined">
          Entfernen
        </Button>
      </Box>
      {/* <TableContainer sx={{ maxWidth: "600px" }}>
        <Table aria-label="customized table">
          <TableBody>
            {Object.entries(medicine).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                  {key}
                </TableCell>
                <TableCell>{value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}



      <table style={{maxWidth:"500px"}}>
        <caption>Medicine Information</caption>
        <thead>
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {medicine ? Object.entries(medicine).map(([property, value]) => (
            <tr key={property}>
              <td>{property}</td>
              <td>{value}</td>
            </tr>
          )) : ""
        }
        </tbody>
      </table>

      {/* <TableBody sx={{maxWidth:"800px"}}>
        {Object.entries(medicine).map(([key, value]) => (
          <TableRow key={key}>
            <TableCell component="th" scope="row">
              {key}
            </TableCell>
            <TableCell >{value}</TableCell>
          </TableRow>
        ))}
      </TableBody> */}

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Medikamente
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSave}>
              Speichern
            </Button>
          </Toolbar>
        </AppBar>
        {/* Add Form */}
        <Box sx={{ px: 64, py: 8 }}>
          <form>
            {medicineArray
              .filter((key) => key !== '__v' && key !== '_id')
              .map((key) => (
                <TextField
                  key={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={values[key]}
                  fullWidth
                  sx={{ my: 2 }} // Add margin top and bottom
                  onChange={(e) => setValues({ ...values, [key]: e.target.value })}
                />
              ))}
          </form>
        </Box>
      </Dialog>
    </Box>
  );
};

export default MedicinePage;
