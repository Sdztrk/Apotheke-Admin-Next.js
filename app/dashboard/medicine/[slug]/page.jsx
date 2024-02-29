"use client"

import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, CardMedia, Box } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { updateProduct, deleteProduct } from "@/app/GlobalRedux/Features/productSlice";
import { useDispatch } from 'react-redux';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const MedicinePage = () => {
  const dispatch = useDispatch();

  const medicine = useSelector((state) => state.product.selectedProduct);
  // console.log(medicine)

  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState(medicine);
  const [alertOpen, setAlertOpen] = React.useState(false);

  const handleAlertOpen = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };
  const handleDelete = async () => {
    await dispatch(deleteProduct(medicine._id))
    setAlertOpen(false)
  }

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
  // console.log(medicineArray)

  return (
    <Box sx={{ width: "98vw", display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginBottom: "50px" }}>
      <Box sx={{ position: "fixed", top: "20%", right: "10%" }} >
        <CardMedia
          image={medicine?.image}
          title={medicine?.name}
          sx={{ height: "300px", width: "400px", position: "fix", top: "150px", right: "150px", objectFit: "contain" }}
          component="img"
        />
      </Box>
      <Box sx={{ position: "fixed", top: "30%", right: "35%", display: "flex", flexDirection: "column", gap: "20px" }} >
        <Button variant="outlined" onClick={handleClickOpen}>
          Bearbeiten
        </Button>
        <Button variant="outlined" onClick={handleAlertOpen}>
          Entfernen
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ maxWidth: "700px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">Medikament</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">  Erklärung</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(medicine).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell>
                  <Typography sx={{textTransform:"capitalize"}} variant="body1" fontWeight="bold">{key}</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{textTransform:"capitalize"}} variant="body1">{typeof value === 'object' ? JSON.stringify(value) : value}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
        <Box sx={{textAlign:"center"}} fontWeight="bold">Medikament Bearbeiten</Box> 

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
      <Dialog
        open={alertOpen}
        onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" >
          {"Sicher?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          When Sie dieses Medikament entfernen, wird es auch aus der Datenbank gelöscht!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose}>Zurück</Button>
          <Button onClick={handleDelete } autoFocus>
            Entfernen
          </Button>
        </DialogActions>
      </Dialog>
      <Box></Box>
      <Box></Box>

    </Box>
  );
};

export default MedicinePage;
