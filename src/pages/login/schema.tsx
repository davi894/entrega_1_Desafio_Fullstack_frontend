import * as yup from 'yup';


export const validatedLogin = yup.object().shape({
    email: yup
        .string()
        .required("Preenchimento do email obrigatório"),
})
