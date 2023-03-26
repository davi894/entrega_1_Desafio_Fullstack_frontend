import { useNavigate } from "react-router-dom"
import { ContexteDadosUserFunction } from "../../context"


const Navbar = () => {

    const navigate = useNavigate()
    const { deactivateAccount } = ContexteDadosUserFunction()

    return (
        <section>
            <header>

                {
                    localStorage.getItem("tokenClient") || localStorage.getItem("tokenContact")
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
                    localStorage.getItem("tokenClient") || localStorage.getItem("tokenContact") ?
                        <button onClick={() => {
                            if (localStorage.getItem("tokenContact") || localStorage.getItem("tokenClient")) {
                                deactivateAccount()
                            }

                        }}>
                            Deactivate account
                        </button> : null
                }


                {
                    localStorage.getItem("tokenClient") ? <button onClick={() => {
                        navigate("/dashboard");
                    }}>
                        List contacts
                    </button> : null
                }

            </header>
        </section >
    )
}

export { Navbar }