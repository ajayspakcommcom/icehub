
import React, { useState } from 'react';
import { TextField, Button, Grid, Container, Box, FormControl, Select, MenuItem, FormHelperText, InputLabel } from '@mui/material';
import dynamic from 'next/dynamic';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import User from '@/models/User';
import { createUser } from '@/services/user';
import signUpSchema from '@/validation/signUpSchema';
import { getSpecializations } from '@/libs/common';
const SuccessMessage = dynamic(() => import('@/components/success-message/success-message'));

const Index: React.FC = () => {

    const [error, setError] = React.useState<any>();
    const sepcializations: string[] = getSpecializations();
    const [success, setSuccess] = React.useState<string | null>(null);

    const initialValues: User = {
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        city: '',
        hospitalName: '',
        designation: 'User',
        specialization: '',
        type: 'CREATE'
    };

    const handleSubmit = async (user: User) => {

        try {
            const userResponse = await createUser(user);
            console.log('User created successfully:', userResponse);
            formik.resetForm();
            setSuccess(userResponse.data.message);

            setTimeout(() => {
                setSuccess(null);
            }, 3000);

        } catch (err: any) {
            console.log('Error during user creation:', err.response.data.error);
            if (err.response.data.error) {
                setError(err.response.data.errorDetail);
            }
        }
    };

    const handleReset = () => {
        formik.setValues(initialValues);
        formik.setErrors({});
    };

    const formik = useFormik({
        initialValues,
        validationSchema: signUpSchema,
        onSubmit: handleSubmit,
        onReset: handleReset
    });

    return (
        <>
            <form className='register-form' onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                {error && <p className='error-text'>{error}</p>}



                <Grid container columnSpacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            type="email"
                            label="Email"
                            name="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>
                    <Grid item xs={6}>
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
                            className='odd-input'
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            type="password"
                            label="Confirm Password"
                            name="confirmPassword"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            className='even-input'
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            type="text"
                            label="First Name"
                            name="firstName"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            type="text"
                            label="Last Name"
                            name="lastName"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            type="text"
                            label="Phone Number"
                            name="phoneNumber"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            type="text"
                            label="City"
                            name="city"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            type="text"
                            label="Hospital Name"
                            name="hospitalName"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formik.values.hospitalName}
                            onChange={formik.handleChange}
                            error={formik.touched.hospitalName && Boolean(formik.errors.hospitalName)}
                            helperText={formik.touched.hospitalName && formik.errors.hospitalName}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <InputLabel id="specialization-label"><span className={formik.touched.specialization && formik.errors.specialization ? 'error-label' : ''}>Designation</span></InputLabel>
                            <Select
                                labelId="specialization-label"
                                id="specialization"
                                name="specialization"
                                value={formik.values.specialization}
                                onChange={formik.handleChange}
                                label="Specialization"
                                error={formik.touched.specialization && Boolean(formik.errors.specialization)}>
                                {sepcializations.map(option => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
                            </Select>
                            {formik.touched.specialization && formik.errors.specialization && (<FormHelperText className='error-text'>
                                <span className={formik.touched.specialization && formik.errors.specialization ? 'error-text' : ''}>{formik.errors.specialization}</span>
                            </FormHelperText>)}
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="space-between">
                            <Button type="submit" variant="contained" color="primary" fullWidth className="ice-btn" >
                                Signup
                            </Button>
                        </Box>
                    </Grid>

                    {success && <div className='registration-success'><SuccessMessage message={success} /></div>}


                </Grid>
            </form>

        </>
    );
};

export default React.memo(Index);
