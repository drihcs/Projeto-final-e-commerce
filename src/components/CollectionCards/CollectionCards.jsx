import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CardProduto.module.css'

export default function CardProduto({ produto }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <span className={styles.discountTag}>30% OFF</span>
        <img src="/public/k-swiss-v8.png" alt={produto.nome} className={styles.imagem} />
      </div>
      <div className={styles.productInfo}>
        <span className={styles.categoria}>Tênis</span>
        <h3 className={styles.nome}>{produto.nome}</h3>
        <div className={styles.precos}>
          <span className={styles.precoOriginal}>$200</span>
          <span className={styles.precoAtual}>$100</span>
        </div>
      </div>
      <Link to={`/produto/${produto.id}`} className={styles.botao}>
        Ver detalhes
      </Link>
    </div>
  )
}