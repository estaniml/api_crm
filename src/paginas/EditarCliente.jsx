import Formulario from '../components/Formulario'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const EditarCliente = () => {

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

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Editar cliente</h1>
      <p className='mt-3'>Utiliza este formulario para editar de datos de un cliente</p>

      {cliente?.nombre ? (
        <Formulario 
        cliente={cliente}
        cargando={cargando}
        /> 
      ): <p className='text-red-600 font-bold scroll-mt-10'>Cliente ID no valido</p>}
    </>
    )
}

export default EditarCliente