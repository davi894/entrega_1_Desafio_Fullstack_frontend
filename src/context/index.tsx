import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import instanceAxios from '../services';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
interface IReactNode {
    children: ReactNode;
}

interface ILogin {
    email: string;
}


interface IRegisterClientAndContact {
    name: string;
    email: string;
    phone: string;
}

export const DadosUser = createContext({});

function ContextDadosUser({ children }: IReactNode) {

    const [token, setToken] = useState("")
    const [listContact, setlistContact] = useState([])
    const [userData, setUserData] = useState({})

    const navigate = useNavigate()

    const login = async (data: ILogin) => {

        localStorage.clear()
        await instanceAxios.post(`/login`, data)
            .then((res) => {
                setToken(res.data.token.split(" ")[1])
                localStorage.setItem("tokenClient", res.data.token.split(" ")[1])
                if (res.status === 200) {
                    toast.success('login sucessufly!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                navigate("/dashboard")
            })
    }

    const registrationClient = async (data: IRegisterClientAndContact) => {

        const register = await instanceAxios.post("/register", data)
        if (register.status) {
            toast.success('register client success!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        return register
    }

    const registerContact = async (data: IRegisterClientAndContact) => {
        if (localStorage.getItem("tokenClient")) {

            instanceAxios.defaults.headers.authorization = `Bearer ${localStorage.getItem("tokenClient")}`;

            await instanceAxios.post("/register/contacts", data).then((res) => {
                setlistContact([...listContact, res.data])
                if (res.status === 201) {
                    toast.success('create contact success!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })

        }
    }

    const getContacts = async () => {
        if (localStorage.getItem("tokenClient")) {

            instanceAxios.defaults.headers.authorization = `Bearer ${localStorage.getItem("tokenClient")}`;

            const response = await instanceAxios.get("/list/contacts")
            setlistContact(response.data)
        }

    }

    const deleteAccount = async () => {

        if (localStorage.getItem("tokenClient")) {
            instanceAxios.defaults.headers.authorization = `Bearer ${localStorage.getItem("tokenClient")}`;

            await instanceAxios.delete("/user").then((res) => {
                if (res.status === 204) {
                    toast.success('delet account success!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
            localStorage.clear()
            navigate("/login")

        }
    }

    const updateAccount = async (data: IRegisterClientAndContact) => {

        if (localStorage.getItem("tokenClient")) {
            instanceAxios.defaults.headers.authorization = `Bearer ${localStorage.getItem("tokenClient")}`;

            await instanceAxios.patch("/user", data).then((res) => {
                console.log(data)
                console.log(res.data)
                if (res.status === 200) {
                    toast.success('upgrade success!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })

            setUserData(data)
        }

    }

    const deleteContact = async (idContact: string) => {

        const newListContacts = listContact.map((el) => {
            if (el.id !== idContact) {
                return el
            }
        })

        setlistContact([...newListContacts])

        if (localStorage.getItem("tokenClient")) {
            instanceAxios.defaults.headers.authorization = `Bearer ${localStorage.getItem("tokenClient")}`;
            await instanceAxios.delete(`/contact/:${idContact}`).then((res) => {
                if (res.status === 204) {
                    toast.success('delete contact success!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })

        }

    }

    const updateAccountContact = async (data: IRegisterClientAndContact, idContact: string) => {
        if (localStorage.getItem("tokenClient")) {
            instanceAxios.defaults.headers.authorization = `Bearer ${localStorage.getItem("tokenClient")}`;

            const { email, name, phone } = data

            await instanceAxios.patch(`/contact/${idContact}`, { "email": email, "name": name, "phone": phone }).then((res) => {
                if (res.status === 200) {
                    
                    const updatedList = listContact.map(contact => {
                        if (contact.id === res.data.id) {
                            return { ...contact, ...res.data };
                        }
                        return contact;
                    });

                    setlistContact(updatedList);

                    toast.success('updated contact success!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }

            })
        }

    }

    const getInfoClient = async () => {

        if (localStorage.getItem("tokenClient")) {
            instanceAxios.defaults.headers.authorization = `Bearer ${localStorage.getItem("tokenClient")}`;

            await instanceAxios.get(`/user`).then((res) => {
                const { email, name, phone } = res.data

                setUserData({
                    "email": email,
                    "name": name,
                    "phone": phone,
                })
            })
        }

    }

    useEffect(() => {
        getContacts();
        getInfoClient()
    }, [token]);


    return (
        <DadosUser.Provider
            value={{
                login,
                registrationClient,
                registerContact,
                deleteAccount,
                updateAccount,
                listContact,
                userData,
                setUserData,
                deleteContact,
                updateAccountContact
            }} >
            {children}
        </DadosUser.Provider>
    );
}

export default ContextDadosUser;

export const ContexteDadosUserFunction = () => useContext(DadosUser);


export {
    IReactNode,
    ILogin,
    IRegisterClientAndContact,
}