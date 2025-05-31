import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CardProduto.module.css'

export default function CardProduto({ produto }) {
  return (
    <div className={styles.card}>
      <div className={styles.imagemContainer}>
        {produto.discount && (
          <div className={styles.desconto}>{produto.discount}</div>
        )}
        <img
          src={produto.image} 
          alt={produto.name}
          className={styles.imagem}
        />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.categoria}>{produto.category || 'Categoria'}</div>
        <h3 className={styles.nome}>{produto.name}</h3>
        <div className={styles.precos}>
          {produto.original_price ? (
            <span className={styles.precoOriginal}>
              ${Number(produto.original_price).toFixed(2)}
            </span>
          ) : null}
          <span className={styles.precoAtual}>
            ${Number(produto.price || 0).toFixed(2)}
          </span>
        </div>
      </div>
      <Link to={`/produto/${produto.id}`} className={styles.botao}>
        Ver detalhes
      </Link>
    </div>
  )
}