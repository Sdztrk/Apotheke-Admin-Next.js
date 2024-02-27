"use client"

import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { TablePagination, tablePaginationClasses as classes } from '@mui/base/TablePagination';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts,getProductById } from '../GlobalRedux/Features/productSlice';
import { useRouter } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Root = styled('div')(
  ({ theme }) => `
  table {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 300%; 
    height: 200%; 
  }

  td,
  th {
    border: 1.5px solid ${theme.palette.mode === 'dark' ? grey[700] : '#1976D2'};
    text-align: left;
    padding: 16px; 
  }

  th {
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    height: 64px; 
  }

  tr:hover {
    background-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]}; 
    cursor: pointer;
  }
  
  tbody tr:nth-of-type(even):hover {
    background-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[200]};
  }
  `,
);

const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;

const Page = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.data);
  const router = useRouter();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = useState(true); // State to manage loading

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(getProducts())
      .then(() => setLoading(false)) // Set loading to false when products are fetched
      .catch(() => setLoading(false)); // Handle error case as well
  }, [dispatch]);

  const handleRowClick = async (productId) => {
    await dispatch(getProductById(productId))
    router.push(`/dashboard/medicine/${productId}`);
  };

  return (
    <Root sx={{ maxWidth: '100%', width: 500, marginLeft: '200px' }}>
      {loading ? (
        <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", width:"80vw", height:"50vh"}} >
        <CircularProgress />
        </Box>
      ) : (
        <table style={{marginBottom:"100px"}} aria-label="custom pagination table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Firma</th>
              <th>PZN</th>
              <th>Erkrankung</th>
              <th>Preis</th>
              <th>Foto</th>
            </tr>
          </thead>
          <tbody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => (
                <tr key={product._id} onClick={() => handleRowClick(product._id)}>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.pzn}</td>
                  <td>{product.illness}</td>
                  <td>€{product.price}</td>
                  <td>
                    <img src={product.image} alt={product.name} style={{ objectFit:"cover", width:"75px" }} />
                  </td>
                </tr>
              ))}
            {emptyRows > 0 && (
              <tr style={{ height: 41 * emptyRows }}>
                <td colSpan={6} aria-hidden />
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <CustomTablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={6}
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    'aria-label': 'rows per page',
                  },
                  actions: {
                    showFirstButton: true,
                    showLastButton: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </tr>
          </tfoot>
        </table>
      )}
    </Root>
  );
};

export default Page;
