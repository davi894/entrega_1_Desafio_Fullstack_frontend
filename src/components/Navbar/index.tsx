import './style.css'
import { useNavigate, useLocation } from "react-router-dom"
import { ContexteDadosUserFunction } from "../../context"



const Navbar = () => {
    const location = useLocation();

    const navigate = useNavigate()
    const { deactivateAccount } = ContexteDadosUserFunction()

    return (
        <section>
            <header>

                {
                    (localStorage.getItem("tokenClient") || localStorage.getItem("tokenContact")) && location.pathname !== "/login"
                        ?
                        <button
                            onClick={() => {

                                if (localStorage.getItem("tokenContact")) {
                                    localStorage.removeItem("tokenContact");
                                }

                                if (localStorage.getItem("tokenClient")) {
                                    localStorage.removeItem("tokenClient");
                                }

                                navigate("/login");
                            }}
                        >
                            Logout
                        </button> : null}

                {
                    (localStorage.getItem("tokenClient") || localStorage.getItem("tokenContact")) && location.pathname !== "/login" ?
                        <button onClick={() => {

                            deactivateAccount()

                        }}>
                            Deactivate account
                        </button> : null
                }

                {
                    (localStorage.getItem("tokenClient") || localStorage.getItem("tokenContact")) && location.pathname !== "/login" ?
                        <button onClick={() => {
                            navigate("/update")

                        }}>
                            update account
                        </button> : null
                }


                {
                    localStorage.getItem("tokenClient") && location.pathname !== "/login" ? <button onClick={() => {
                        navigate("/dashboard");
                    }}>
                        List contacts
                    </button> : null
                }
                {
                    localStorage.getItem("tokenClient") && location.pathname !== "/login" ? <button onClick={() => {
                        navigate("/contact");
                    }}>
                        register contact
                    </button> : null
                }

            </header>
        </section >
    )
}

export { Navbar }