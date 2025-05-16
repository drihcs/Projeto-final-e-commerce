// src/pages/FinalizarCompra.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useCarrinho } from '../../contexts/CarrinhoContext'
import './FinalizarCompra.css'

function FinalizarCompra() {
  const { usuario } = useAuth()
  const { carrinho, limparCarrinho } = useCarrinho()
  const navigate = useNavigate()
  const [carregando, setCarregando] = useState(false)

  const total = carrinho.reduce((acc, item) => acc + item.preco * item.qtd, 0)

  const handleConfirmar = () => {
    setCarregando(true)
    setTimeout(() => {
      // simula o envio do pedido
      limparCarrinho()
      navigate('/compra-finalizada')
    }, 1500)
  }

  if (!usuario) return null // fallback de segurança

  return (
    <div className="finalizar-container">
      <h2>Finalizar Compra</h2>

      <section className="dados-entrega">
        <h3>Dados do Cliente</h3>
        <p><strong>Nome:</strong> {usuario.nome}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>CPF:</strong> {usuario.cpf || '000.000.000-00'}</p>
        <p><strong>Celular:</strong> {usuario.celular || '(00) 00000-0000'}</p>
        <p><strong>Endereço:</strong> {usuario.endereco?.rua || 'Rua Exemplo, 123 - Bairro - Cidade - CEP 00000-000'}</p>
      </section>

      <section className="resumo-compra">
        <h3>Itens do Carrinho</h3>
        <ul>
          {carrinho.map(item => (
            <li key={item.id}>
              {item.nome} - {item.qtd} x R${item.preco.toFixed(2)}
            </li>
          ))}
        </ul>
        <p><strong>Total:</strong> R${total.toFixed(2)}</p>
      </section>

      <button onClick={handleConfirmar} disabled={carregando}>
        {carregando ? 'Enviando pedido...' : 'Confirmar Pedido'}
      </button>
    </div>
  )
}

export default FinalizarCompra
