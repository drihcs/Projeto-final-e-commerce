import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CardProduto.module.css'

export default function CardProduto({ produto }) {
  return (
    <div className={styles.card}>
      <img src={produto.imagem} alt={produto.nome} className={styles.imagem} />
      <h3>{produto.nome}</h3>
      <p>R$ {produto.preco.toFixed(2)}</p>
      <Link to={`/produto/${produto.id}`} className={styles.botao}>
        Ver detalhes
      </Link>
    </div>
  )
}