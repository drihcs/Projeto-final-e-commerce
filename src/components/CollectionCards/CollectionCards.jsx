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
    <section>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Coleções em destaque</h2>
        <div className={styles.collectionGrid}>
          {colecoes.map(colecao => (
            <div
              key={colecao.id}
              className={styles.collectionCard}
              style={{
                backgroundImage: `url(${colecao.imagem})`
              }}
            >
              <div style={{ padding: '20px' }}>
                <span className={styles.discountTag}>{colecao.desconto}</span>
                <h3>{colecao.titulo}</h3>
                <a className={styles.buyButton} href={`/colecao/${colecao.id}`}>Comprar</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
