import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCarrinho } from '../../contexts/CarrinhoContext'
import QuantityControl from '../../components/QuantityControl/QuantityControl'
import styles from './Carrinho.module.css'

const formatarPreco = (valor) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)

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

  // Funções para manipular quantidade via QuantityControl
  const handleQuantidadeChange = (itemId, novaQuantidade) => {
    if (novaQuantidade >= 1) {
      alterarQuantidade(itemId, novaQuantidade)
    }
  }

  const handleRemoverItem = (itemId) => {
    if (window.confirm('Tem certeza que deseja remover este item?')) {
      removerItem(itemId)
    }
  }

  const handleLimparCarrinho = () => {
    if (window.confirm('Tem certeza que deseja limpar todo o carrinho?')) {
      limparCarrinho()
    }
  }

  return (
    <div className={styles.container}>
      <section className={styles.cartSection}>
        <h2 className={styles.sectionTitle}>MEU CARRINHO</h2>
        {itens.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <>
            {itens.map((item) => (
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
              </div>
            ))}

            {/* Botão limpar carrinho - discreto */}
            <div className={styles.clearCart}>
              <button onClick={limparCarrinho}>Limpar carrinho</button>
            </div>
          </>
        )}
      </section>

      {itens.length > 0 && (
        <section className={styles.summary}>
          <h2 className={styles.sectionTitle}>RESUMO</h2>

          <div className={styles.summaryContent}>
            <div className={styles.summaryRow}>
              <span>Subtotal:</span>
              <span>{formatarPreco(subtotal)}</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Frete:</span>
              <span>R$ 0,00</span>
            </div>

            <hr className={styles.divider} />

            <div className={styles.totalRow}>
              <span>Total</span>
              <span className={styles.totalPrice}>{formatarPreco(subtotal)}</span>
            </div>

            <p className={styles.installments}>
              ou 10x de {formatarPreco(subtotal / 10)} sem juros
            </p>
          </div>

          <div className={styles.buttons}>
            <button
              className={styles.continueButton}
              onClick={() => navigate('/finalizar-compra')}
            >
              Continuar
            </button>
          </div>
        </section>
      )}
    </div>
  )
}

export default Carrinho