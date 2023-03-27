import './style.css'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContexteDadosUserFunction } from '../../context';
import { validatedupdate } from './schema';
import { IRegisterClientAndContact } from '../../context';
import { Navbar } from '../../components/Navbar';


const Update = () => {
    const { updateAccount, userData } = ContexteDadosUserFunction()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validatedupdate),
    });

    const onSubmitFunction = (data: IRegisterClientAndContact) => {
        if (data.name !== '') {
            updateAccount({ ...userData, 'name': data.name })
        } else if (data.email !== '') {
            updateAccount({ ...userData, 'email': data.email })
        } else if (data.phone !== '') {
            updateAccount({ ...userData, 'phone': data.phone })
        }

        reset();
    };

    return (
        <>
            <Navbar />
            <div id='formCadastro'>
                <form onSubmit={handleSubmit(onSubmitFunction)} >
                    <label htmlFor="">Name:</label>
                    <input id='name' type="text" placeholder='Digite seu name'  {...register("name")} />

                    <label htmlFor="">Email:</label>
                    <input id='email' type="text" placeholder='Digite sua email'  {...register("email")} />

                    <label htmlFor="">Phone:</label>
                    <input id='phone' type="text" placeholder='Digite seu phone'  {...register("phone")} />

                    <button type='submit' >update</button >
                </form>
            </div>
        </>
    )
}

export { Update }