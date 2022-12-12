import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email('Enter valid email').required('Email is required'),
  password: yup
    .string()
    .typeError('Must contain letters')
    .required('Password is required'),
});
