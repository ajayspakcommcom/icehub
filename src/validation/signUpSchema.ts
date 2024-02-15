import * as Yup from 'yup';

const signUpSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    profession: Yup.string().required('Profession is required'),
    experienceYears: Yup.number().min(0, 'Experience years cannot be negative').required('Experience years is required'),
    bio: Yup.string().required('Bio is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    location: Yup.string().required('Location is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required')
});

export default signUpSchema;
