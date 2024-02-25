"use client"

import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const Loading = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection:"row", justifyContent:"center",alignItems:"center",  width:"100vw", height:"60vh"}}>
      <CircularProgress />
    </Box>
  )
}

export default Loading;