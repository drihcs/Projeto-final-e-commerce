import React from 'react'
import CardProduto from './CardProduto'
import { produtos } from '../../services/produtos'
import styles from './ProductGrid.module.css'

export default function ProductGrid() {
  return (
    <section className={styles.grid}>
      <h2>Destaques da Coleção</h2>
      <div className={styles.lista}>
        {produtos.map(produto => (
          <CardProduto key={produto.id} produto={produto} />
        ))}
      </div>
    </section>
  )
}
