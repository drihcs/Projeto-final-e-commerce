import React from 'react'
import styles from './CollectionCards.module.css'

const colecoes = [
  {
    id: 'supreme',
    titulo: 'Novo drop Supreme',
    imagem: '/assets/collection-1.png',
    desconto: '30% OFF'
  },
  {
    id: 'adidas',
    titulo: 'Coleção Adidas',
    imagem: '/assets/collection-2.png',
    desconto: '30% OFF'
  },
  {
    id: 'beats',
    titulo: 'Novo Beats Bass',
    imagem: '/assets/collection-3.png',
    desconto: '30% OFF'
  }
]

export default function CollectionCards() {
  return (
    <section className={styles.colecoes}>
      <div className="container">
        <h2 className="section-title">Coleções em destaque</h2>
        <div className={styles.collectionsGrid}>
          {colecoes.map(colecao => (
            <div
              key={colecao.id}
              className={styles.collectionCard}
            >
              <div className={styles.textBlock}>
                <span className={styles.discountTag}>{colecao.desconto}</span>
                <h3>{colecao.titulo}</h3>
                <a className={styles.buyButton} href={`/colecao/${colecao.id}`}>Comprar</a>
              </div>
              <img className={styles.productImage} src={colecao.imagem} alt={colecao.titulo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
