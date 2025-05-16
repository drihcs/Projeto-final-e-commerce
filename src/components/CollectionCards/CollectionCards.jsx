import React from 'react'
import './CollectionCards.module.css'

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
    <section className="colecoes">
      <div className="container">
        <h2 className="section-title">Coleções em destaque</h2>
        <div className="collections-grid">
          {colecoes.map(colecao => (
            <div
              key={colecao.id}
              className="collection-card"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), transparent), url(${colecao.imagem})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <span className="discount-tag">{colecao.desconto}</span>
              <div className="card-content">
                <h3>{colecao.titulo}</h3>
                <a className="button" href={`/colecao/${colecao.id}`}>Comprar</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
