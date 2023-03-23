import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import instanceAxios from '../services';
export const DadosUser = createContext({});
import { AxiosResponse } from "axios"
interface IReactNode {
    children: ReactNode;
}

function ContextDadosUser({ children }: IReactNode) {

    const login = async (data: { "email": string, "password"?: string }) => {
        console.log(data)
        try {
            await instanceAxios.get(`/user/found/${data.email}`).then((res: AxiosResponse) => console.log(res))
        } catch (error) {
            console.log(error)
        }
    }


    const registration = async (data: { "name": string; "email": string, "password"?: string, "phone": string }) => {
        console.log(data, "registration")
    }

    return (
        <DadosUser.Provider
            value={{ login, registration }} >
            {children}
        </DadosUser.Provider>
    );
}

export default ContextDadosUser;

export const ContexteDadosUserFunction = () => useContext(DadosUser);
