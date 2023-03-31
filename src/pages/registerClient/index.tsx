import './style.css'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validatedCadastro } from "./schema";
import { ContexteDadosUserFunction } from '../../context';
import { Link, useNavigate } from 'react-router-dom';
import { IRegisterClientAndContact } from '../../context';
import { Navbar } from '../../components/Navbar';

const FormRegister = () => {
    const { registrationClient } = ContexteDadosUserFunction()
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validatedCadastro),
    });

    const onSubmitFunction = async (data: IRegisterClientAndContact) => {
        const response = await registrationClient(data)

        if (response.status === 201) {
            navigate("/login")
        }

        reset();
    };

    return (
        <>
            <Navbar />
            <div id='formCadastro'>
                <form onSubmit={handleSubmit(onSubmitFunction)}>
                    <label htmlFor="">Name:</label>
                    <input type="text" placeholder='Enter your name'   {...register("name")} />
                    <span> <>{errors.name?.message}</></span>

                    <label htmlFor="">Email:</label>
                    <input type="text" placeholder='Enter your email'  {...register("email")} />
                    <span> <>{errors.email?.message}</></span>

                    <label htmlFor="">Phone:</label>
                    <input type="text" placeholder='Enter your phone'  {...register("phone")} />
                    <span> <>{errors.phone?.message}</></span>

                    <button type="submit">register</button>

                    <div className='divRouterLoginRegister'>
                        <p>already have an account?</p>
                        <Link to={"/login"} >
                            <div>Logar</div>
                        </Link>
                    </div>
                </form>
            </div>
        </>

    )
}







export { FormRegister }