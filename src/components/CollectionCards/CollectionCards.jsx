import React from 'react'
import styles from './CollectionCards.module.css'

const colecoes = [
  {
    id: 'supreme',
    titulo: 'Novo drop Supreme',
    imagemProduto: '/tshirt-card.png',
    desconto: '30% OFF'
  },
  {
    id: 'adidas',
    titulo: 'Coleção Adidas',
    imagemProduto: '/sneaker-card.png',
    desconto: '30% OFF'
  },
  {
    id: 'beats',
    titulo: 'Novo Beats Bass',
    imagemProduto: '/headphone-card.png',
    desconto: '30% OFF'
  }
]

export default function CollectionCards() {
  return (
    <section>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Coleções em destaque</h2>
        <div className={styles.collectionGrid}>
          {colecoes.map(colecao => (
            <div key={colecao.id} className={styles.collectionCard}>
              <div className={styles.cardBackground}></div>

              {/* Tag de desconto fora do cardContent */}
              <span className={styles.discountTag}>{colecao.desconto}</span>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>
                  {colecao.id === 'supreme' ? (
                    <>
                      Novo drop <br /> Supreme
                    </>
                  ) : (
                    colecao.titulo
                  )}
                </h3>
                <a className={styles.buyButton} href={`/colecao/${colecao.id}`}>
                  Comprar
                </a>
              </div>

              <div className={styles.productImageContainer}>
                <img
                  src={colecao.imagemProduto || "/placeholder.svg"}
                  alt={colecao.titulo}
                  className={styles.productImage}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
