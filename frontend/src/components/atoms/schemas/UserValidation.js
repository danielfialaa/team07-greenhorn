import * as Yup from 'yup';

export const UserValidation = Yup.object().shape({
  firstName: Yup.string()
                .matches(/[a-zA-Z]+$/, 'Not valid first name')
                .required('First name is required'),
  lastName:  Yup.string()
                .matches(/[a-zA-Z]+$/, 'Not valid last name')
                .required('Last name is required'),
  telephone: Yup.string()
                .matches(/^[0-9]*$/, 'Telephone number must contain digits only')
                .required('Telephone number is required'),
});
