"use client"

import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify";


const url = process.env.REACT_APP_API_BASEURL

const authSlice = createSlice({
    name: 'auth',
    initialState : {
      currentUser: typeof window !== "undefined" ? window.sessionStorage.getItem('name') : null,
      token: typeof window !== "undefined" ? window.sessionStorage.getItem('token') : null,
      email: '',
  },
    reducers: {
        auth(state, action) {
            state.token = action.payload.token;
            state.currentUser = action.payload.name;
            state.email = action.payload.email;
            state.role = action.payload.role;
        },
    },
});

export const { auth } = authSlice.actions;


//login
// login action creator
export const login = (userInfo) => async (dispatch) => { 
  try {
    const res = await axios.post(`${url}/api/v1/auth/login/`, userInfo);
    console.log(res.data);
    if (!res.data) throw new Error('Something went wrong!');

    const { token, name, email, id, role } = res.data;

    dispatch(auth({ token, currentUser: name, email }));
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('role', role);

    toast.success("Erfolgreich angemeldet");
    return true; // Return isAdmin flag if the user is admin
  } catch (error) {
    console.error(error);
    toast.error(error.message);
    return false; // Return isAdmin flag in case of error
  }
};


  //logout
  export const logout = () => async (dispatch) => {
    try {
      const res = await axios.post(`${url}/api/v1/auth/logout/`);
      if (res.status === 200) {
        dispatch(auth({ token: null, currentUser: false, email: '' }));
        sessionStorage.clear();
        toast.success("Erfolgreich abgemeldet");
        // console.log('User successfully logged out!');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

export default authSlice.reducer;
