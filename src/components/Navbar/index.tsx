import './style.css'
import { useNavigate, useLocation } from "react-router-dom"
import { ContexteDadosUserFunction } from "../../context"



const Navbar = () => {
    const location = useLocation();

    const navigate = useNavigate()
    const { deleteAccount } = ContexteDadosUserFunction()

    return (
        <section>
            <header>

                {
                    (localStorage.getItem("tokenClient")) && location.pathname !== "/login"
                        ?
                        <button
                            onClick={() => {

                                if (localStorage.getItem("tokenClient")) {
                                    localStorage.removeItem("tokenClient");
                                }

                                navigate("/login");
                            }}
                        >
                            Logout
                        </button> : null}

                {
                    (localStorage.getItem("tokenClient") ) && location.pathname !== "/login" ?
                        <button onClick={() => {

                            deleteAccount()

                        }}>
                            Delete account
                        </button> : null
                }

                {
                    (localStorage.getItem("tokenClient") ) && location.pathname !== "/login" ?
                        <button onClick={() => {
                            navigate("/update")

                        }}>
                            Update account
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
                        Register contact
                    </button> : null
                }
                {
                    localStorage.getItem("tokenClient") && location.pathname !== "/login" ? <button onClick={() => {
                        navigate("/update/contact");
                    }}>
                        Update contact
                    </button> : null
                }

            </header>
        </section >
    )
}

export { Navbar }