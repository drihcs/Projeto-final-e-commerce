// src/pages/CompraFinalizada.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import './CompraFinalizada.module.css'

function CompraFinalizada() {
  return (
    <div className="compra-finalizada-container">
      <h2>🎉 Compra Realizada com Sucesso!</h2>
      <p>Seu pedido foi recebido e está sendo processado.</p>

      <div className="acoes">
        <Link to="/pedidos" className="botao">
          Ver meus pedidos
        </Link>
        <Link to="/" className="botao secundario">
          Voltar à Home
        </Link>
      </div>
    </div>
  )
}

export default CompraFinalizada
