import React, { useEffect, useState } from 'react'
import './Pedidos.module.css'

function Pedidos() {
  const [pedidos, setPedidos] = useState([])

  useEffect(() => {
    const dados = localStorage.getItem('pedidos')
    if (dados) {
      setPedidos(JSON.parse(dados))
    }
  }, [])

  const formatarStatus = (status) => {
    switch (status) {
      case 'finalizado':
        return '✅ Finalizado'
      case 'transito':
        return '🚚 Em Trânsito'
      case 'cancelado':
        return '❌ Cancelado'
      default:
        return status
    }
  }

  return (
    <div className="pedidos-container">
      <h2>Meus Pedidos</h2>

      {pedidos.length === 0 ? (
        <p>Você ainda não fez nenhum pedido.</p>
      ) : (
        <div className="pedidos-lista">
          {pedidos.map((pedido, index) => (
            <div key={index} className="pedido-card">
              <div className="pedido-header">
                <span><strong>Data:</strong> {pedido.data}</span>
                <span className={`status ${pedido.status}`}>{formatarStatus(pedido.status)}</span>
              </div>

              <ul className="pedido-itens">
                {pedido.itens.map((item, i) => (
                  <li key={i}>
                    {item.nome} — Qtd: {item.qtd} — R$ {item.preco.toFixed(2)}
                  </li>
                ))}
              </ul>

              <div className="pedido-total">
                <strong>Total:</strong> R$ {pedido.total.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Pedidos
