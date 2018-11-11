import * as Yup from 'yup';

export const PasswordValidation = Yup.object().shape({
  password_current: Yup
        .string()
        .required('Password is required'),
  password_new: Yup
        .string()
        .required('Password is required'),
  password: Yup
        .string()
        .oneOf([Yup.ref('password_new'), null], "Passwords don't match")
        .required('Password confirmation is required')
});
