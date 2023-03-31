import * as yup from 'yup';


export const ValidatedUpdatedContact = yup.object().shape({
    id: yup.string(),
    name: yup.string(),
    email: yup.string(),
    phone: yup.string()

})