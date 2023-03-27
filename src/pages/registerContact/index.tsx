import './style.css'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContexteDadosUserFunction } from '../../context';
import { validatedRegisterCostumer } from './schema';
import { IRegisterClientAndContact } from '../../context';
import { Navbar } from '../../components/Navbar';

const FormRegisterContact = () => {
    const { registerContact } = ContexteDadosUserFunction()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validatedRegisterCostumer),
    });

    const onSubmitFunction = (data: IRegisterClientAndContact) => {
        registerContact(data)
        reset();
    };

    return (
        <>
            <Navbar />
            <div id='formCadastro'>
                <form onSubmit={handleSubmit(onSubmitFunction)}>
                    <label htmlFor="">Name:</label>
                    <input type="text" placeholder='Digite seu name'   {...register("name")} />
                    <span> <>{errors.name?.message}</></span>

                    <label htmlFor="">Email:</label>
                    <input type="text" placeholder='Digite sua email'  {...register("email")} />
                    <span> <>{errors.email?.message}</></span>

                    <label htmlFor="">Phone:</label>
                    <input type="text" placeholder='Digite seu phone'  {...register("phone")} />
                    <span> <>{errors.phone?.message}</></span>

                    <button type="submit">register contact</button>
                </form>
            </div>
        </>
    )
}

export { FormRegisterContact }