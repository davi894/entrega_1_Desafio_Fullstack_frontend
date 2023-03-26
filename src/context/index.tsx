import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import instanceAxios from '../services';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate()

    const activateAccount = async (email: string) => {
        await instanceAxios.patch("/user/is_activate", { "email": email })

    }

    const login = async (data: ILogin) => {

        const userEmail = await instanceAxios.get(`/user/found/${data.email}`)

        activateAccount(userEmail.data.email)

        if (userEmail.data.is_client) {
            localStorage.clear()
            await instanceAxios.post(`/login/client`, data)
                .then((res) => {
                    setToken(res.data.token.split(" ")[1])
                    localStorage.setItem("tokenClient", res.data.token.split(" ")[1])
                    navigate("/dashboard")
                })
        } else {
            localStorage.clear()
            await instanceAxios.post(`/login/contact`, data)
                .then((res) => {
                    setToken(res.data.token.split(" ")[1])
                    localStorage.setItem("tokenContact", res.data.token.split(" ")[1])
                    navigate("/update")
                })
        }
    }

    const registrationClient = async (data: IRegisterClientAndContact) => {

        const register = await instanceAxios.post("/register", data)

        return register
    }

    const registerContact = async (data: IRegisterClientAndContact) => {
        if (localStorage.getItem("tokenClient")) {

            instanceAxios.defaults.headers.authorization = `Bearer ${localStorage.getItem("tokenClient")}`;

            await instanceAxios.post("/register/contacts", data)

        }
    }

    const getContacts = async () => {
        if (localStorage.getItem("tokenClient")) {

            instanceAxios.defaults.headers.authorization = `Bearer ${localStorage.getItem("tokenClient")}`;

            const response = await instanceAxios.get("/list/contacts")
            setlistContact(response.data)
        }

    }

    const deactivateAccount = async () => {

        if (localStorage.getItem("tokenClient")) {
            instanceAxios.defaults.headers.authorization = `Bearer ${localStorage.getItem("tokenClient")}`;

            await instanceAxios.delete("/user")
            localStorage.clear()
            navigate("/login")

        }

        if (localStorage.getItem("tokenContact")) {
            instanceAxios.defaults.headers.authorization = `Bearer ${localStorage.getItem("tokenContact")}`;

            await instanceAxios.delete("/user")
            localStorage.clear()
            navigate("/login")

        }

    }


    useEffect(() => {
        getContacts();
    }, [token]);

    return (
        <DadosUser.Provider
            value={{ login, registrationClient, registerContact, listContact, deactivateAccount, activateAccount }} >
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