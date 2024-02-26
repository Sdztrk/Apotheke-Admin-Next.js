"use client"

import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@mui/styles';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, Card, CardContent, CardMedia, Box } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import {updateProduct} from "@/app/GlobalRedux/Features/productSlice"
import { useDispatch } from 'react-redux';
import medicineLayout from './layout';


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
  media: {
    height: 300,
  },
});

const MedicinePage = () => {

  const dispatch= useDispatch()
  const classes = useStyles();

  const medicine = useSelector((state) => state.product.selectedProduct)
  // console.log(medicine)

  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState(medicine);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = async () => {
   await dispatch(updateProduct(medicine._id,values))
   setOpen(false);

  }

  return (
    <>
      <Card className={classes.root}>
        <Button variant="outlined" onClick={handleClickOpen}>
        Bearbeiten
        </Button>
        <CardMedia
          className={classes?.media}
          image={medicine?.image}
          title={medicine?.name}
        />
        <CardContent>
          <Typography variant="h5" component="h2">
            {medicine?.name}
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="medicine properties">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">Brand</TableCell>
                  <TableCell>{medicine?.brand}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Manufacturer</TableCell>
                  <TableCell>{medicine?.manufacturer}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">PZN</TableCell>
                  <TableCell>{medicine?.pzn}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Distribution Form</TableCell>
                  <TableCell>{medicine?.distributionForm}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Package Size</TableCell>
                  <TableCell>{medicine?.packageSize}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Illness</TableCell>
                  <TableCell>{medicine?.illness}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Manufacturer Country</TableCell>
                  <TableCell>{medicine?.manufacturerCountry}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Type</TableCell>
                  <TableCell>{medicine?.type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Discount</TableCell>
                  <TableCell>{medicine?.discount ? 'Yes' : 'No'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Active Ingredient</TableCell>
                  <TableCell>{medicine?.activeIngredient}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Dosage</TableCell>
                  <TableCell>{medicine?.dosage}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Side Effects</TableCell>
                  <TableCell>{medicine?.sideEffects}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Pregnancy Notification</TableCell>
                  <TableCell>{medicine?.pregnancyNotification}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Preis</TableCell>
                  <TableCell>€{medicine?.price}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Expiration Date</TableCell>
                  <TableCell>{medicine?.expirationDate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Application Method</TableCell>
                  <TableCell>{medicine?.applicationMethod}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Description</TableCell>
                  <TableCell>{medicine?.description}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <React.Fragment>
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
          <Box sx={{ p: 8 }}>
            <form>
              {Object.keys(values)
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
      </React.Fragment>
    </>
  )
}

export default MedicinePage