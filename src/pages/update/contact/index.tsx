import './style.css'
import { useForm } from "react-hook-form";
import { ContexteDadosUserFunction } from '../../../context';
import { IRegisterClientAndContact } from '../../../context';
import { Navbar } from '../../../components/Navbar';
import instanceAxios from '../../../services';
import { ValidatedUpdatedContact } from './schema';
import { yupResolver } from '@hookform/resolvers/yup';

ValidatedUpdatedContact
const UpdateContact = () => {
    const { updateAccountContact, userData, listContact, setListContact } = ContexteDadosUserFunction()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(ValidatedUpdatedContact),
    });

    const onSubmitFunction = async (data) => {

        if (localStorage.getItem("tokenClient")) {
            instanceAxios.defaults.headers.authorization = `Bearer ${localStorage.getItem("tokenClient")}`;
            const response = await instanceAxios.get(`/list/contact/${data.id}`)
        
            const email = response.data.email;
            const phone = response.data.phone;
            const name = response.data.name;

            const userUpdatecontact = {
                "email": data.email === "" ? email : data.email,
                "name": data.name === "" ? name : data.name,
                "phone": data.phone === "" ? phone : data.phone,
            }

            updateAccountContact(userUpdatecontact, data.id)

            reset();
        }
    };

    return (
        <>
            <Navbar />
            <div id='formCadastro'>
                <form onSubmit={handleSubmit(onSubmitFunction)} >
                    <select id='id'  {...register("id")} >
                        {listContact.map((e) => {
                            return <option key={e.id} value={e.id} > {e.email}</option>
                        })}
                    </select >
                    <label htmlFor="">Name:</label>
                    <input id='name' type="text" placeholder='Enter your name'  {...register("name")} />

                    <label htmlFor="">Email:</label>
                    <input id='email' type="text" placeholder='Enter your email'  {...register("email")} />

                    <label htmlFor="">Phone:</label>
                    <input id='phone' type="text" placeholder='Enter your phone'  {...register("phone")} />

                    <button type='submit' >update contact</button >
                </form>
            </div >
        </>
    )
}

export { UpdateContact }