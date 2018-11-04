import * as Yup from 'yup';

export const UserValidation = Yup.object().shape({
  firstName: Yup.string().matches(/[a-zA-Z]+$/, 'Not valid first name'),
  lastName:  Yup.string().matches(/[a-zA-Z]+$/, 'Not valid last name'),
  telephone: Yup.string().matches(/^[0-9]*$/, 'Telephone number must contain digits only'),
});
