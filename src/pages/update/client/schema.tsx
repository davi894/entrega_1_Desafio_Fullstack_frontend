import * as yup from 'yup';


export const validatedUpdate = yup.object().shape({
    name: yup.string(),
    email: yup.string(),
    phone: yup.string()

})