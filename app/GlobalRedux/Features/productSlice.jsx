"use client"

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const url = process.env.REACT_APP_API_BASEURL;
// console.log(url)

// Retrieve stored selected product from session storage or set it to null
const storedSelectedProduct = typeof window !== "undefined" ? sessionStorage.getItem("selectedProduct") : null
const initialSelectedProduct = storedSelectedProduct ? JSON.parse(storedSelectedProduct) : null;



const productSlice = createSlice({
    name: 'product',
    initialState: {
      data: [],  // Array to store the product data
      selectedProduct: initialSelectedProduct  // Initially set to the stored selected product or null
    },
    reducers: {
      // Redux Toolkit reducer to set the product data in the state
      setProducts(state, action) {
        state.data = action.payload.data;
      },
      // Redux Toolkit reducer to set the selected product in the state
      setSelectedProduct(state, action) {
        state.selectedProduct = action.payload.product;
      },
    },
  });

export const { setProducts,setSelectedProduct } = productSlice.actions;

export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios.get(`${url}/api/v1/product`);
    const data = res?.data?.data || [];
    dispatch(setProducts({ data }));
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

// Async action to fetch a product by ID from the server using Axios
export const getProductById = (productId) => async (dispatch) => {
    try {
      const res = await axios.get(`${url}/api/v1/product/${productId}`);
      const payload = {
        product: res.data?.data,
      };
      // Store the selected product in session storage
      sessionStorage.setItem("selectedProduct", JSON.stringify(res.data.data))
      dispatch(setSelectedProduct(payload));
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      toast.error('Server error');
    }
  };

  // Async action to create a product
  export const createProduct = (values) => async(dispatch)=> {
    try{
      const token = sessionStorage.getItem("token")
      const headers = {
        Authorization:`Bearer ${token}`,
        "Content-Type":"application/json"
      }
      const res = await axios.post(`${url}/api/v1/product`, values, {headers})
      // console.log(res)
      if (res.status === 201) {
        dispatch(setProducts({data:res.data}))
        toast.success("Medikamente erfolgreich hinzugefügt")
      }
      else{
        console.log("An error entstanden")
      }
    }
    catch(err) {
      console.log(err)
      toast.error("Server Error")
    }
  } 

  // Async action to update a product by ID on the server using Axios
  export const updateProduct = (productId, updatedProductData) => async (dispatch) => {
    try {
      const token = sessionStorage.getItem('token'); // Retrieve the bearer token from sessionStorage
      const headers = { 
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json' // Set the Content-Type header
      }; 
  
      const res = await axios.put(`${url}/api/v1/product/${productId}`, updatedProductData, { headers });
      // console.log(res)
  
      if (res.status === 202) {
        dispatch(getProducts()); // Optional: Produktliste erneut abrufen, um Änderungen zu aktualisieren
        toast.success('Produkt erfolgreich aktualisiert');
      } else {
        console.error('Fehler beim Aktualisieren des Produkts:', res.data.message);
        toast.error('Fehler beim Aktualisieren des Produkts');
      }
      
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Server error');
    }
  };

  // Async action to delete a product by ID on the server using Axios
export const deleteProduct = (productId) => async (dispatch) => {
  try {
    const token = sessionStorage.getItem('token'); // Retrieve the bearer token from sessionStorage
    const headers = { 
      Authorization: `Bearer ${token}`, 
      'Content-Type': 'application/json' // Set the Content-Type header
    }; 

    const res = await axios.delete(`${url}/api/v1/product/${productId}`, { headers });

    if (res.status === 204) {
      // Optionally, refetch the product list to reflect changes
      dispatch(getProducts());
      toast.success('Produkt erfolgreich etntfernt');
    } else {
      console.error('Error deleting product:', res.data.message);
      toast.error('Error bei der Entfernung');
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    toast.error('Server error');
  }
};


export default productSlice.reducer;
