import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import styles from './CartIcon.module.css'

export default function CartIcon() {
  const [modalAberto, setModalAberto] = useState(false)
  const clickTimeout = useRef(null)
  const navigate = useNavigate()
  const { carrinho, removerItem } = useCart()

  function handleClickIcone() {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current)
      clickTimeout.current = null
      navigate('/finalizar')
    } else {
      clickTimeout.current = setTimeout(() => {
        setModalAberto((aberto) => !aberto) 
        clickTimeout.current = null
      }, 250) 
    }
  }

  return (
    <div className={styles.cartContainer}>
      <button
        aria-label="Carrinho de compras"
        className={styles.cartButton}
        onClick={handleClickIcone}
      >
        🛒
        {carrinho.length > 0 && (
          <span className={styles.badge}>{carrinho.length}</span>
        )}
      </button>

      {modalAberto && (
        <div className={styles.modal}>
          <h3>Itens no carrinho</h3>
          {carrinho.length === 0 ? (
            <p>Seu carrinho está vazio.</p>
          ) : (
            <ul className={styles.listaProdutos}>
              {carrinho.map((item) => (
                <li key={item.id} className={styles.item}>
                  <img
                    src={item.imagem}
                    alt={item.nome}
                    className={styles.imagemProduto}
                  />
                  <div>
                    <p>{item.nome}</p>
                    <p>Tamanho: {item.tamanho}</p>
                    <p>Cor: {item.cor}</p>
                    <p>Qtd: {item.quantidade}</p>
                    <p>R$ {(item.preco * item.quantidade).toFixed(2)}</p>
                    <button
                      className={styles.btnRemover}
                      onClick={() => removerItem(item.id)}
                    >
                      Remover
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <button
            className={styles.btnFechar}
            onClick={() => setModalAberto(false)}
          >
            Fechar
          </button>
        </div>
      )}
    </div>
  )
}
