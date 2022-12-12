import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .typeError('Name must contain letters')
    .required('Name is required'),
  email: yup.string().email('Enter valid email').required('Email is required'),
  password: yup.string().min(8).required('Password is required'),
});
