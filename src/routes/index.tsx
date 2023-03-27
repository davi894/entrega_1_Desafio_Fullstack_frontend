import { Route, Routes, Navigate, Outlet } from "react-router-dom";

import { FormLogin } from "../pages/login";
import { FormRegister } from "../pages/registerClient";
import { InfoUser } from "../pages/infoCliente";
import { FormRegisterContact } from "../pages/registerContact";
import { Update } from "../pages/update";
import { ContexteDadosUserFunction } from "../context";

function ProtecaoRotas() {


    const tokenClient = localStorage.getItem("tokenClient");
    const tokenContact = localStorage.getItem("tokenContact");

    if (tokenClient || tokenContact) return <Outlet />

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
                <Route path="update" element={<Update />} />
            </Route>
            <Route
                path="*"
                element={<Navigate to="login" />}
            />
        </Routes >
    );
}

export default RoutesMain;