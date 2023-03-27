import './style.css'
import { ContexteDadosUserFunction } from '../../context';
import { Navbar } from '../../components/Navbar';


const InfoUser = () => {
    const { listContact } = ContexteDadosUserFunction()

    let id = Date.now()
    
    return (
        <>
            <Navbar />
            <div className='divUl'>
                <ul className='ListContacts'>
                    {listContact.length > 0 ? (
                        listContact.map((elem) => {
                            return (
                                <>
                                    <li key={id} className="contacts">
                                        <p>name : {elem.name}</p>
                                        <p>email : {elem.email}</p>
                                        <p>phone : {elem.phone}</p>
                                        <p>createdAt : {elem.createdAt}</p>
                                    </li>
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