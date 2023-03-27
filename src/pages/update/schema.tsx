import * as yup from 'yup';


export const validatedupdate = yup.object().shape({
    name: yup.string(),
    email: yup.string(),
    phone: yup.string()

})