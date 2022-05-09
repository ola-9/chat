import * as yup from 'yup';

const getSchema = (data) => yup.object({
  name: yup
    .string()
    .required()
    .min(3)
    .max(20)
    .notOneOf(data),
});

export default getSchema;
