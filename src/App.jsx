import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Inicio from './paginas/Inicio'
import NuevoCliente from './paginas/NuevoCliente'
import EditarCliente from './paginas/EditarCliente'
import VerCliente from './paginas/VerCliente'

function App() {


  return (
    <BrowserRouter>
      <Routes>

        <Route path='/clientes' element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path='nuevo' index element={<NuevoCliente />} />
          <Route path='editar/:id' index element={<EditarCliente />} />
          <Route path=':id' index element={<VerCliente />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
