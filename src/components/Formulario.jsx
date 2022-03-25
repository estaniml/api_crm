import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from "./Spinner"

const Formulario = ({cliente, cargando}) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
            .min(3, '* El nombre es muy corto')
            .max(40, '* El nombre es muy largo')
            .required('* El nombre es obligatorio'),
        empresa: Yup.string()
            .required('* El nombre de la empresa es obligatorio'),
        email: Yup.string()
            .email('* Email no valido')
            .required('* El email es obligatorio'),
        telefono: Yup.number()
            .integer('* Numero no valido')
            .positive('* Numero no valido')
            .typeError('* El telefono debe ser numerico')
    })

    const handleSubmit = async (values) => {
        try {
            let respuesta;

            if(cliente.id){
                //Editando cliente
                const url = `http://localhost:4000/clientes/${cliente.id}`;
                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                if(!respuesta.ok){
                    throw new Error(respuesta.statusText)
                }
            
            } else {

                //Nuevo cliente
                const url = 'http://localhost:4000/clientes'

                respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            await respuesta.json()
            navigate('/clientes')

        } catch (error) {
            console.log(error)
        }
            
    }
    

  return (

    cargando ? <Spinner /> : (
        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>

            <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{ cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>

            <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? '',
                    empresa: cliente?.empresa ?? '',
                    email: cliente?.email  ?? '',
                    telefono: cliente?.telefono ?? '',
                    notas: cliente?.notas  ?? ''
                }}
                enableReinitialize={true}
                onSubmit={ async (values, {resetForm}) => {
                    await handleSubmit(values)

                    resetForm()
                }}
                validationSchema={nuevoClienteSchema}
            >
                {({errors, touched}) => {
                    
                    return (
                    <Form className='mt-10'>
                        <div className='mb-4'>
                            <label htmlFor='nombre' className='text-gray-800 font-bold text-sm'>Nombre:</label>
                            <Field
                                id='nombre'
                                type='text'
                                className='mt-2 block w-full bg-gray-100 p-3'
                                placeholder='Nombre del cliente'
                                name='nombre'
                            />

                            {errors.nombre && touched.nombre ? (
                                <Alerta>{errors.nombre}</Alerta>
                            ) : null }

                        </div>

                        <div className='mb-4'>
                            <label htmlFor='empresa' className='text-gray-800 font-bold text-sm'>Empresa:</label>
                            <Field
                                id='empresa'
                                type='text'
                                className='mt-2 block w-full bg-gray-100 p-3'
                                placeholder='Empresa del cliente'
                                name='empresa'
                            />

                            {errors.empresa && touched.empresa ? (
                                <Alerta>{errors.empresa}</Alerta>
                            ) : null }

                        </div>

                        <div className='mb-4'>
                            <label htmlFor='email' className='text-gray-800 font-bold text-sm'>Email:</label>
                            <Field
                                id='email'
                                type='email'
                                className='mt-2 block w-full bg-gray-100 p-3'
                                placeholder='E-mail del cliente'
                                name='email'
                            />

                            {errors.email && touched.email ? (
                                <Alerta>{errors.email}</Alerta>
                            ) : null }

                        </div>

                        <div className='mb-4'>
                            <label htmlFor='telefono' className='text-gray-800 font-bold text-sm'>Telefono:</label>
                            <Field
                                id='telefono'
                                type='tel'
                                className='mt-2 block w-full bg-gray-100 p-3'
                                placeholder='Telefono del cliente'
                                name='telefono'
                            />

                            {errors.telefono && touched.telefono ? (
                                <Alerta>{errors.telefono}</Alerta>
                            ) : null }

                        </div>
                        
                        <div className='mb-4'>
                            <label htmlFor='notas' className='text-gray-800 font-bold text-sm'>Notas:</label>
                            <Field
                                as='textarea'
                                id='notas'
                                type='text'
                                className='mt-2 block w-full bg-gray-100 p-3'
                                placeholder='Notas del cliente'
                                name='notas'
                            />
                        </div>

                        <input 
                            type='submit'
                            value={ cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'} 
                            className='bg-blue-800 w-full text-white px-5 py-2 rounded-md font-bold'
                        />

                    </Form>
                )}}
            </Formik>
        </div>
    )
  )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario