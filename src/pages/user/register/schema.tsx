import * as yup from 'yup';


export const validacaoCadastro = yup.object().shape({
    name: yup
        .string()
        .required("Preenchimento do name obrigatório"),
    email: yup
        .string()
        .required("Preenchimento da  email  obrigatório"),
    password: yup
        .string()
        .required("Preenchimento do password obrigatório"),
    phone: yup
        .string()
        .required("Preenchimento do phone obrigatório")

})
