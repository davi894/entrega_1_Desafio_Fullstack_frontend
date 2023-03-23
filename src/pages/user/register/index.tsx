import './index.css'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validacaoCadastro } from "./schema";
import { ContexteDadosUserFunction } from '../../../context';
import { Link } from 'react-router-dom';


const FormRegister = () => {
    const { registration } = ContexteDadosUserFunction()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validacaoCadastro),
    });

    const onSubmitFunction = (data) => {
        registration(data)
        reset();
    };

    return (
        <div id='formCadastro'>
            <form onSubmit={handleSubmit(onSubmitFunction)}>
                <label htmlFor="">name:</label>
                <input type="text" placeholder='Digite seu name'   {...register("name")} />
                <span> <>{errors.name?.message}</></span>

                <label htmlFor="">email:</label>
                <input type="text" placeholder='Digite sua email'  {...register("email")} />
                <span> <>{errors.email?.message}</></span>

                <label htmlFor="">password:</label>
                <input type="text" placeholder='Digite seu password'  {...register("password")} />
                <span><> {errors.password?.message}</></span>

                <label htmlFor="">phone:</label>
                <input type="text" placeholder='Digite seu phone'  {...register("phone")} />
                <span> <>{errors.phone?.message}</></span>

                <button type="submit">cadastrar</button>

                <div className='divRouterLoginRegister'>
                    <p>já  possui conta?</p>
                    <Link to={"/login"} >
                        <div>Logar</div>
                    </Link>
                </div>
            </form>
        </div>
    )
}







export { FormRegister }