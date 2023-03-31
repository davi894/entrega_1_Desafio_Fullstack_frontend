import { Route, Routes, Navigate, Outlet } from "react-router-dom";

import { FormLogin } from "../pages/login";
import { FormRegister } from "../pages/registerClient";
import { InfoUser } from "../pages/infoListContacts";
import { FormRegisterContact } from "../pages/registerContact";
import { UpdateClient } from "../pages/update/client";
import { UpdateContact } from "../pages/update/contact";
import { ContexteDadosUserFunction } from "../context";

function ProtecaoRotas() {

    const tokenClient = localStorage.getItem("tokenClient");
  
    if (tokenClient) return <Outlet />

    return <Navigate to="/login" />;;
}


function RoutesMain() {
    return (
        <Routes>
            <Route path="/login" element={<FormLogin />} />
            <Route path="/register" element={<FormRegister />} />
            <Route path="/" element={<ProtecaoRotas />}>
                <Route path="dashboard" element={<InfoUser />} />
                <Route path="contact" element={<FormRegisterContact />} />
                <Route path="update" element={<UpdateClient />} />
                <Route path="update/contact" element={<UpdateContact />} />
            </Route>
            <Route
                path="*"
                element={<Navigate to="login" />}
            />
        </Routes >
    );
}

export default RoutesMain;