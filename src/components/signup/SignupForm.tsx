
import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import User from '@/models/User';
import { createUser } from '@/services/user';
import signUpSchema from '@/validation/signUpSchema';

const Index: React.FC = () => {

    const [error, setError] = React.useState<any>();

    const initialValues: User = {
        email: '',
        password: '',
        profession: '',
        experienceYears: 0,
        bio: '',
        phoneNumber: '',
        location: '',
        state: '',
        city: '',
        type: 'CREATE'
    };

    const handleSubmit = async (user: User) => {

        try {
            const userResponse = await createUser(user);
            console.log('User created successfully:', userResponse);
            formik.resetForm();
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
        <Container maxWidth="xs">
            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <Typography variant="h5" align="center" gutterBottom>Signup</Typography>

                {error && <p>{error}</p>}

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
                />

                <TextField
                    type="text"
                    label="Profession"
                    name="profession"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formik.values.profession}
                    onChange={formik.handleChange}
                    error={formik.touched.profession && Boolean(formik.errors.profession)}
                    helperText={formik.touched.profession && formik.errors.profession}
                />

                <TextField
                    type="number"
                    label="Experience Years"
                    name="experienceYears"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formik.values.experienceYears}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.experienceYears &&
                        Boolean(formik.errors.experienceYears)
                    }
                    helperText={
                        formik.touched.experienceYears &&
                        formik.errors.experienceYears
                    }
                />

                <TextField
                    type="text"
                    label="Bio"
                    name="bio"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formik.values.bio}
                    onChange={formik.handleChange}
                    error={formik.touched.bio && Boolean(formik.errors.bio)}
                    helperText={formik.touched.bio && formik.errors.bio}
                />

                <TextField
                    type="tel"
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

                <TextField
                    type="text"
                    label="Location"
                    name="location"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    error={formik.touched.location && Boolean(formik.errors.location)}
                    helperText={formik.touched.location && formik.errors.location}
                />

                <TextField
                    type="text"
                    label="State"
                    name="state"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    error={formik.touched.state && Boolean(formik.errors.state)}
                    helperText={formik.touched.state && formik.errors.state}
                />

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

                <Link href="/login" className='signup'>Login</Link>

                <Box display="flex" justifyContent="space-between">
                    <Button type="reset" variant="contained" color="inherit" style={{ width: '48%' }}>
                        Reset
                    </Button>
                    <Button type="submit" variant="contained" color="primary" style={{ width: '48%' }}>
                        Signup
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default React.memo(Index);
