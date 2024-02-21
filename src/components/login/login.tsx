import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Toast from "@/components/Toast";
import { Box, Button, Grid, TextField, Typography, Card, CardContent } from "@mui/material";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import User from '@/models/User';
import { authUser } from "@/services/auth";
import loginSchema from "@/validation/loginSchema";


import dynamic from 'next/dynamic';
const ErrorMessage = dynamic(() => import('@/components/error-message/error-message'));

interface LoginFormProps {

}

const LoginForm: React.FC<LoginFormProps> = () => {

    const searchParam = useSearchParams();

    const [authData, setAuthData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setError] = useState<any>();

    useEffect(() => {
        console.log("The query is", searchParam.get("error"));
    }, []);

    /**************************ajay************************/
    const initialValues: User = {
        email: 'ajay@spakcomm.com',
        password: '123'
    };


    const handleSubmit = async (user: User) => {

        try {
            const resp: any = await authUser({ email: user.email, password: user.password });
            if (resp.status == 200) {
                //const response = resp.data;
                console.log("The response is ", resp);
                signIn("credentials", {
                    email: user.email,
                    password: user.password,
                    callbackUrl: "/feed",
                    redirect: true,
                });
            } else if (resp.status == 400) {
                setError(resp?.errors);
            }
        } catch (err: any) {
            console.log(err.response.data.error);
            setError(err.response.data.error);

            setTimeout(() => {
                setError(null);
            }, 3000);
        }


    };

    const handleReset = () => {
        formik.setValues(initialValues); // Reset form values to initial state
        formik.setErrors({}); // Clear any form errors
    };

    const formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: handleSubmit,
        onReset: handleReset
    });

    return (
        <>
            <Toast />
            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>

                {errors && <ErrorMessage message={errors} />}
                <TextField
                    type="text"
                    label="Email"
                    name="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    style={{ marginBottom: '16px' }}
                />


                <TextField
                    type="password"
                    label="Password"
                    name="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    style={{ marginBottom: '16px' }}
                />

                <Box display="flex">
                    <Button type="submit" variant="contained" size="large" fullWidth className="ice-btn"> {loading ? "Processing.." : "Sign in"} </Button>
                </Box>



            </form>
        </>
    );
};

export default React.memo(LoginForm);