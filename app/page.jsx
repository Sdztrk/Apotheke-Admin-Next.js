"use client"

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Stack,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Image from 'next/image';
import notebook from "../public/notebook.png"
import { login } from "@/app/GlobalRedux/Features/authSlice"
import { useRouter } from "next/navigation";


const initialValues = { email: "", password: "" };
const validationSchema = yup.object().shape({
  email: yup.string().email("Email Invalid").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(12)
    .matches(/\d/, "Password must contain at least 1 number")
    .matches(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .matches(
      /[!, ?, @, #, $, %, ^, &, *, (, ), -, _, +, =]/,
      "Password must contain at least 1 special character"
    )
    .required("Password is required"),
});

const page = () => {

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  // const [isAdmin, setIsAdmin] = useState(false); // State to track admin status

  const [refreshed, setRefreshed] = useState(false);

  useEffect(() => {
    // Check if the page is refreshed for the first time
    if (!refreshed) {
      setRefreshed(true); // Set the refreshed state to true
      return;
    }

    // If the page is refreshed after the first time, perform other actions here
    console.log('Page refreshed');
  }, [dispatch, login]);

  const handleLoginSubmit = async (values, actions) => {
    actions.setSubmitting(false);
    const isAdmin = await dispatch(login(values));
    console.log(isAdmin)

    if (!isAdmin) {
      // Don't route to the dashboard if user is not an admin
      return;
    }

    router.push("/dashboard");
  };


  return (
    <>
      <Box sx={{ width: "100%", height: "100.5vh", color: "#F5F5F5" }}>
        <Typography variant="h2" color="#1976D2" align="center" component="h1">
          Apotheke Admin Page
        </Typography>
        <Grid container p={5} alignItems="center" justifyContent="center">
          <Grid item md={6} xl={8} display={{ xs: "none", sm: "block" }}>
            <Image
              alt="notebook image"
              src={notebook}
              style={{ maxHeight: "auto" }}
              loading="lazy"
            />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <Card sx={{ maxWidth: "100%", padding: "2rem" }}>
              <CardContent>
                <Typography variant="h3" align="center" mb={3} color="#1976D2">
                  Admin Login
                </Typography>
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleLoginSubmit}
                  validationSchema={validationSchema}
                >
                  {({ values, errors, touched, handleChange }) => (
                    <Form noValidate>
                      <Field
                        as={TextField}
                        type="email"
                        variant="outlined"
                        label="Email"
                        name="email"
                        fullWidth
                        margin="dense"
                        error={Boolean(errors.email) && Boolean(touched.email)}
                        helperText={Boolean(touched.email) ? errors.email : ""}
                      />

                      <Field
                        as={TextField}
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        label="Password"
                        name="password"
                        fullWidth
                        margin="dense"
                        error={
                          Boolean(errors.password) && Boolean(touched.password)
                        }
                        helperText={
                          Boolean(touched.password) ? errors.password : ""
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end" sx={{ pr: 2 }}>
                              <IconButton
                                edge="end"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <VisibilityIcon />
                                ) : (
                                  <VisibilityOffIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Stack justifyContent="center" alignItems="center" mt={2}>
                        <Button variant="contained" type="submit" size="large">
                          {" "}
                          Login
                        </Button>
                      </Stack>
                    </Form>
                  )}
                </Formik>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default page;