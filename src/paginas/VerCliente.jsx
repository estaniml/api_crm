import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Spinner from "../components/Spinner"

const VerCliente = () => {

    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(true)

    const { id } = useParams();

    useEffect(() => {
        
        const obtenerClienteAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`;
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();

                setCliente(resultado)
            } catch (error) {
                console.log(error)
            }
            setCargando(!cargando)
        }
        obtenerClienteAPI();

    }, [])

    const { nombre, empresa, email, telefono, notas } = cliente;

  return (

    cargando ? <Spinner /> : 
        Object.keys(cliente).length === 0 ? 
        <p>No hay resultados</p> : (

        <div>
                <h1 className='font-black text-4xl text-blue-900'>Ver cliente: {nombre}</h1>
                <p className='mt-3'>Informacion del cliente</p>

                { nombre && (
                <p className="text-gray-700 text-4xl mt-10">
                    <span className='text-gray-800 uppercase font-bold'>Cliente: </span>
                    {nombre}
                </p>
                )}

                { email && (
                <p className="text-gray-600 text-2xl mt-2">
                    <span className='text-gray-800 uppercase font-bold'>Email: </span>
                    {email}
                </p>
                )}
                
                { telefono && (
                <p className="text-gray-600 text-2xl mt-2">
                    <span className='text-gray-800 uppercase font-bold'>Telefono: </span>
                    {telefono}
                </p>
                )}

                { empresa && (
                <p className="text-gray-600 text-2xl mt-2">
                    <span className='text-gray-800 uppercase font-bold'>Empresa: </span>
                    {empresa}
                </p>
                )}

                { notas && (
                <p className="text-gray-600 text-2xl mt-2">
                    <span className='text-gray-800 uppercase font-bold'>Notas: </span>
                    {notas}
                </p>
                )}
        </div>
    ))
}

export default VerCliente