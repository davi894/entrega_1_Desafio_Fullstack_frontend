import './style.css'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContexteDadosUserFunction } from '../../../context';
import { validatedUpdate } from './schema';
import { IRegisterClientAndContact } from '../../../context';
import { Navbar } from '../../../components/Navbar';


const UpdateClient = () => {
    const { updateAccount, userData } = ContexteDadosUserFunction()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validatedUpdate),
    });

    const onSubmitFunction = (data: IRegisterClientAndContact) => {

        const userUpdate = {
            "email": data.email === "" ? userData.email : data.email,
            "name": data.name === "" ? userData.name : data.name,
            "phone": data.phone === "" ? userData.phone : data.phone,
        }

        updateAccount(userUpdate)

        reset();
    };

    return (
        <>
            <Navbar />
            <div id='formCadastro'>
                <form onSubmit={handleSubmit(onSubmitFunction)} >
                    <label htmlFor="">Name:</label>
                    <input id='name' type="text" placeholder='Enter your name'  {...register("name")} />

                    <label htmlFor="">Email:</label>
                    <input id='email' type="text" placeholder='Enter your email'  {...register("email")} />

                    <label htmlFor="">Phone:</label>
                    <input id='phone' type="text" placeholder='Enter your phone'  {...register("phone")} />

                    <button type='submit' >update</button >
                </form>
            </div>
            <section id='infoUserLogin'>
                <p>EMAIL: {userData.email}</p>
                <p>NAME: {userData.name}</p>
                <p>PHONE: {userData.phone}</p>
            </section>
        </>
    )
}

export { UpdateClient }