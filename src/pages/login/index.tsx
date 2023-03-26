import './style.css'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { validacaoLogin } from './schema';
import { yupResolver } from "@hookform/resolvers/yup";
import { ContexteDadosUserFunction } from '../../context';
import { ILogin } from '../../context';
import { Navbar } from '../../components/Navbar';

const FormLogin = () => {

    const { login } = ContexteDadosUserFunction()

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validacaoLogin),
    });

    const onSubmitFunction = (data: ILogin) => {

        login(data)

        // reset()
    };

    return (
        <>
            <Navbar />
            <div className='formLogin'>
                <form onSubmit={handleSubmit(onSubmitFunction)}>
                    <label htmlFor="">Email:</label>
                    <input type="text" placeholder='Digite seu email'  {...register("email")} />
                    <span><> {errors.email?.message}</></span>

                    <button type="submit">entrar</button>

                    <div className="divRouterLoginRegister">
                        <p>ainda não possui conta?</p>
                        <Link to={"/register"} >
                            <div>Cadastre-se</div>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}


export { FormLogin }