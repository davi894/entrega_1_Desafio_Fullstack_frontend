import './style.css'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { validatedLogin } from './schema';
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
        resolver: yupResolver(validatedLogin),
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
                    <input type="text" placeholder='Enter your email'  {...register("email")} />
                    <span><> {errors.email?.message}</></span>

                    <button type="submit" >login</button>

                    <div className="divRouterLoginRegister">
                        <p>don't have an account yet?</p>
                        <Link to={"/register"} >
                            <div>Sign up</div>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}


export { FormLogin }