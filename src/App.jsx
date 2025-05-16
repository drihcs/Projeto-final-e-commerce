import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import ProdutoDetalhado from './pages/ProdutoDetalhado/ProdutoDetalhado'
import Login from './pages/Login'
import CadastroEmail from './pages/CadastroEmail/CadastroEmail'
import CadastroFormulario from './pages/CadastroFormulario/CadastroFormulario'
import FinalizarCompra from './pages/FinalizarCompra/FinalizarCompra'
import CompraFinalizada from './pages/CompraFinalizada/CompraFinalizada'
import Usuario from './pages/Usuario'
import Pedidos from './pages/Pedidos/Pedidos'
import Carrinho from './pages/FinalizarCompra/FinalizarCompra'

import PrivateRoute from './routes/PrivateRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="produto/:id" element={<ProdutoDetalhado />} />
        <Route path="carrinho" element={<Carrinho />} />

        <Route
          path="usuario"
          element={
            <PrivateRoute>
              <Usuario />
            </PrivateRoute>
          }
        />
        <Route
          path="pedidos"
          element={
            <PrivateRoute>
              <Pedidos />
            </PrivateRoute>
          }
        />
        <Route
          path="finalizar"
          element={
            <PrivateRoute>
              <FinalizarCompra />
            </PrivateRoute>
          }
        />
        <Route
          path="compra-finalizada"
          element={
            <PrivateRoute>
              <CompraFinalizada />
            </PrivateRoute>
          }
        />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<CadastroEmail />} />
      <Route path="/cadastro/formulario" element={<CadastroFormulario />} />
    </Routes>
  )
}

export default App
