import * as yup from 'yup';


export const validacaoLogin = yup.object().shape({
    email: yup
        .string()
        .required("Preenchimento do email obrigatório"),
    password: yup
        .string()
        .required("Preenchimento da password obrigatório")

})
