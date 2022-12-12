import * as yup from 'yup';

export const addHotelSchema = yup.object().shape({
  title: yup.string().required('This field is required'),
  content: yup.string().required('This field is required'),
  location: yup.string().required("Please choose hotels' location"),
  price: yup
    .number('Must contain only numbers')
    .required('This field is required'),
  beds: yup.number().required('This field is required'),
  location: yup.string().required('This field is required'),
});
