import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import instanceAxios from '../services';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface IReactNode {
    children: ReactNode;
}

interface ILogin {
    "email": string
}

interface IRegisterClientAndContact {
    "name": string; "email": string, "phone": string
}

export const DadosUser = createContext({});

function ContextDadosUser({ children }: IReactNode) {
    const [token, setToken] = useState("")
    const [listContact, setlistContact] = useState([])
    const [userData, setUserData] = useState({})

    const navigate = useNavigate()

    const activateAccount = async (email: string) => {
        await instanceAxios.patch("/user/is_activate", { "email": email })

    }

    const login = async (data: ILogin) => {

        const userEmail = await instanceAxios.get(`/user/found/${data.email}`)

        if (!userEmail.data) {
            toast.error('User not found!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        setUserData({
            "name": userEmail.data.name,
            "email": userEmail.data.email,
            "phone": userEmail.data.phone,
        })
        activateAccount(userEmail.data.email)

        if (userEmail.data.is_client) {
            localStorage.clear()
            await instanceAxios.post(`/login/client`, data)
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

        } else {
            localStorage.clear()
            await instanceAxios.post(`/login/contact`, data)
                .then((res) => {
                    setToken(res.data.token.split(" ")[1])
                    localStorage.setItem("tokenContact", res.data.token.split(" ")[1])
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
                    navigate("/update")
                })
        }

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

        if (localStorage.getItem("tokenContact")) {
            instanceAxios.defaults.headers.authorization = `Bearer ${localStorage.getItem("tokenContact")}`;

            await instanceAxios.delete("/user").then((res) => {
                if (res.status === 204) {
                    toast.success('delete acount success!', {
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

    const updateAccount = async (data) => {

        setUserData(data)
        if (localStorage.getItem("tokenClient")) {
            instanceAxios.defaults.headers.authorization = `Bearer ${localStorage.getItem("tokenClient")}`;
            await instanceAxios.patch("/user", data).then((res) => {

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

        }

        if (localStorage.getItem("tokenContact")) {
            instanceAxios.defaults.headers.authorization = `Bearer ${localStorage.getItem("tokenContact")}`;
            await instanceAxios.patch("/user", data).then((res) => {
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
        }

    }

    const deleteContact = async (idContact) => {

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

    useEffect(() => {

        getContacts();

    }, [token, userData]);


    return (
        <DadosUser.Provider
            value={{
                login,
                registrationClient,
                registerContact,
                deleteAccount,
                activateAccount,
                updateAccount,
                listContact,
                userData,
                setUserData,
                deleteContact
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