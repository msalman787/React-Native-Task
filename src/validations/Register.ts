import * as yup from 'yup';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const RegisterInputSchema = yup.object().shape({
  firstName: yup.string().required('First Name is a required field'),
  lastName: yup.string().optional(),
  email: yup
    .string()
    .matches(emailRegex, 'Invalid email format')
    .required('Email is required'),
  password: yup.string().min(8).required('Password is a required field'),
});

export const UpdateProfileInputSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
});
