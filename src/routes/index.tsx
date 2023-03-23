import { Route, Routes, Navigate, Outlet } from "react-router-dom";

import { FormLogin } from "../pages/user/login";
import { FormRegister } from "../pages/user/register";
import { InfoUser } from "../pages/user/infoCliente";

function ProtecaoRotas() {
    const token = localStorage.getItem("tokken");

    if (token) return <Outlet />;

    return <Navigate to="/login" />;
}


function RoutesMain() {
    return (
        <Routes>
            <Route path="/login" element={<FormLogin />} />
            <Route path="/cadastro" element={<FormRegister />} />
            <Route path="/dashboard" element={<InfoUser />} />
            {/* <Route path="/" element={<ProtecaoRotas />}>
                <Route path="dashboard" element={<InfoUser />} />
            </Route> */}
            <Route
                path="*"
                element={<Navigate to="/login" />}
            />
        </Routes>
    );
}

export default RoutesMain;