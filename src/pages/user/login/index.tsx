import './style.css'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { validacaoLogin } from './schema';
import { yupResolver } from "@hookform/resolvers/yup";
import { ContexteDadosUserFunction } from '../../../context';


const FormLogin = () => {

    const { login } = ContexteDadosUserFunction()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validacaoLogin),
    });

    const onSubmitFunction = async (data) => {
        login(data)
    };

    return (
        <>
            <div className='formLogin'>
                <form onSubmit={handleSubmit(onSubmitFunction)}>
                    <label htmlFor="">Email:</label>
                    <input type="text" placeholder='Digite seu email'  {...register("email")} />
                    <span><> {errors.email?.message}</></span>

                    <label htmlFor="">Password:</label>
                    <input type="text" placeholder='Digite sua password'  {...register("password")} />
                    <span> <>{errors.password?.message}</></span>

                    <button type="submit">entrar</button>

                    <div className="divRouterLoginRegister">
                        <p>ainda não possui conta?</p>
                        <Link to={"/cadastro"} >
                            <div>Cadastre-se</div>
                        </Link>
                    </div>
                </form>

            </div>
        </>
    )
}


export { FormLogin }