import { useNavigate } from "react-router-dom"; 

const Cliente = ({cliente, handleDelete}) => {

    const navigate = useNavigate();

    const { id, nombre, email, empresa, telefono, notas } = cliente;

  return (
    <tr className="border-b hover:bg-gray-100">
        <td className='border px-4 py-2'>{nombre}</td>
        <td className='border px-4 py-2'>
            <p><span className="text-gray-800 uppercase font-bold">Email:</span>{email}</p>
            <p><span className="text-gray-800 uppercase font-bold">Telefono:</span>{telefono}</p>
        </td>
        <td className='border px-4 py-2'>{empresa}</td>
        <td className='border px-4 py-2'>

            <button
                type="button"
                className="w-full bg-yellow-500 text-white rounded p-2 mt-2 hover:bg-yellow-600"
                onClick={() => navigate(`/clientes/${id}`)}
            >
                Ver
            </button>            
            
            <button
                type="button"
                className="w-full bg-blue-600 text-white rounded p-2 mt-2 hover:bg-blue-700"
                onClick={() => navigate(`/clientes/editar/${id}`)}
            >
                Editar
            </button>

            <button
                type="button"
                className="w-full bg-red-600 text-white rounded p-2 mt-2 hover:bg-red-700"
                onClick={() => handleDelete(id)}
            >
                Eliminar
            </button>


        </td>
  </tr>
  )
}

export default Cliente