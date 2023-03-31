import './style.css'
import { ContexteDadosUserFunction } from '../../context';
import { Navbar } from '../../components/Navbar';


const InfoUser = () => {
    const { listContact, deleteContact } = ContexteDadosUserFunction()

    return (
        <>
            <Navbar />
            <div className='divUl'>
                <ul className='ListContacts'>
                    {listContact.length > 0 ? (
                        listContact.map((elem: { "id": string, "name": string, "email": string, "phone": string, "createdAt": string }) => {
                            return (
                                <>
                                    {elem ? < li key={elem.id} className="contacts">
                                        <p>name : {elem.name}</p>
                                        <p>email : {elem.email}</p>
                                        <p>phone : {elem.phone}</p>
                                        <p>createdAt : {elem.createdAt}</p>
                                        <button className='deleteContact' onClick={() => deleteContact(elem.id)}>Delete contact</button>
                                    </li> : null}
                                </>
                            );
                        })
                    ) : (
                        <p>Nenhum contato encontrado.</p>
                    )}
                </ul>
            </div>
        </>
    )
}

export { InfoUser }