import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import ProdutoDetalhado from './pages/ProdutoDetalhado/ProdutoDetalhado'
import ProductListDesign from './pages/ProductListDesign/ProductListDesign'
import Login from './pages/Login'
import CadastroEmail from './pages/CadastroEmail/CadastroEmail'
import CadastroFormulario from './pages/CadastroFormulario/CadastroFormulario'
import FinalizarCompra from './pages/FinalizarCompra/FinalizarCompra'
import CompraFinalizada from './pages/CompraFinalizada/CompraFinalizada'
import Usuario from './pages/Usuario'
import Pedidos from './pages/Pedidos/Pedidos'
import PrivateRoute from './routes/PrivateRoute'
import { Navigate } from 'react-router-dom'

import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/produtos" element={<ProductListDesign />} />
        <Route path="produto/:slug" element={<ProdutoDetalhado />} />
        <Route path="busca" element={<ProductListDesign />} />
        <Route path="/carrinho" element={<Navigate to="/finalizar-compra" replace />} />

        <Route
          path="finalizar-compra"
          element={
            <PrivateRoute>
              <FinalizarCompra />
            </PrivateRoute>
          }
        />

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
          path="compra-finalizada"
          element={
            <PrivateRoute>
              <CompraFinalizada />
            </PrivateRoute>
          }
        />

        {/* Página 404 dentro das rotas do Layout */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Rotas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<CadastroEmail />} />
      <Route path="/cadastro/formulario" element={<CadastroFormulario />} />

      {/* 👇 Página 404 fora do layout principal */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App