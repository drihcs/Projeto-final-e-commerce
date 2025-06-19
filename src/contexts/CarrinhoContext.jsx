import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCarrinho } from '../../contexts/CarrinhoContext'
import styles from './Carrinho.module.css'

const Carrinho = () => {
  const {
    itens,
    alterarQuantidade,
    removerItem,
    calcularTotal,
    limparCarrinho
  } = useCarrinho()

  const navigate = useNavigate()

  const subtotal = calcularTotal()

  return (
    <div className={styles.container}>
      <section className={styles.cartSection}>
        <h2 className={styles.sectionTitle}>MEU CARRINHO</h2>

        {itens.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          itens.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.productImage}>
                <div className={styles.productIcon}>👟</div>
              </div>

              <div className={styles.productInfo}>
                <h3 className={styles.productTitle}>{item.nome}</h3>
                <p className={styles.productDetail}>Cor: {item.cor}</p>
                <p className={styles.productDetail}>Tamanho: {item.tamanho}</p>
              </div>

              <div className={styles.quantityControl}>
                <button onClick={() => alterarQuantidade(item.id, item.quantidade - 1)}>-</button>
                <span>{item.quantidade}</span>
                <button onClick={() => alterarQuantidade(item.id, item.quantidade + 1)}>+</button>
              </div>

              <div className={styles.priceColumn}>
                <p>R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</p>
              </div>

              <div className={styles.removeItem}>
                <button onClick={() => removerItem(item.id)}>Remover</button>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Resumo */}
      {itens.length > 0 && (
        <section className={styles.summary}>
          <h2 className={styles.sectionTitle}>RESUMO</h2>

          <div className={styles.summaryContent}>
            <div className={styles.summaryRow}>
              <span>Subtotal:</span>
              <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Frete:</span>
              <span>R$ 0,00</span>
            </div>

            <hr className={styles.divider} />

            <div className={styles.totalRow}>
              <span>Total</span>
              <span className={styles.totalPrice}>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>

            <p className={styles.installments}>
              ou 10x de R$ {(subtotal / 10).toFixed(2).replace('.', ',')} sem juros
            </p>
          </div>

          <div className={styles.buttons}>
            <button
              className={styles.continueButton}
              onClick={() => navigate('/finalizar-compra')}
            >
              Continuar
            </button>
            <button
              className={styles.clearButton}
              onClick={() => limparCarrinho()}
            >
              Limpar Carrinho
            </button>
          </div>
        </section>
      )}
    </div>
  )
}

export default Carrinho