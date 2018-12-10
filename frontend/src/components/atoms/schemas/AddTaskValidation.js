import * as Yup from 'yup';

export const AddTaskValidation = Yup.object().shape({
  name: Yup.string().required('Task name is required'),
});
