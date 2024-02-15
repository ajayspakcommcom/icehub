import * as Yup from 'yup';

const signUpSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
        .required('Confirm Password is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, "Phone number must be only digits")
        .required('Phone number is required'),
    city: Yup.string().required('City is required'),
    hospitalName: Yup.string().required('Hospital name is required'),
    type: Yup.string().notRequired()
});

export default signUpSchema;
