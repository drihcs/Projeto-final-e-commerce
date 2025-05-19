import React from 'react'
import '../ProductListDesign/ProductListDesign.css'

export default function Busca() {
  const produtos = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    nome: 'Tênis K-Swiss V8 - Masculino',
    precoOriginal: 200,
    precoComDesconto: 100,
    imagem: './public/k-swiss-v8.png',
    desconto: '30% OFF',
  }))

  return (
    <div className="pagina-busca">
      {/* Barra lateral de filtros */}
      <aside className="filtros">
        <h3>Filtrar por</h3>

        <div className="filtro">
          <strong>Marca</strong>
          <label><input type="checkbox" defaultChecked /> Adidas</label>
          <label><input type="checkbox" /> Calçados</label>
          <label><input type="checkbox" defaultChecked /> K-Swiss</label>
          <label><input type="checkbox" defaultChecked /> Nike</label>
          <label><input type="checkbox" /> Puma</label>
        </div>

        <div className="filtro">
          <strong>Categoria</strong>
          <label><input type="checkbox" /> Esporte e lazer</label>
          <label><input type="checkbox" /> Casual</label>
          <label><input type="checkbox" /> Utilitária</label>
          <label><input type="checkbox" /> Corrida</label>
        </div>

        <div className="filtro">
          <strong>Gênero</strong>
          <label><input type="checkbox" defaultChecked /> Masculino</label>
          <label><input type="checkbox" defaultChecked /> Feminino</label>
          <label><input type="checkbox" /> Unissex</label>
        </div>

        <div className="filtro filtro-estado">
          <strong>Estado</strong>
          <label><input type="radio" name="estado" defaultChecked /> Novo</label>
          <label><input type="radio" name="estado" /> Usado</label>
        </div>
      </aside>

      {/* Grade de produtos */}
      <section className="produtos">
        <div className="top-bar">
          <p>Resultados para “Tênis” – {produtos.length} produtos</p>
          <select>
            <option>Ordenar por: mais relevantes</option>
            <option>Menor preço</option>
            <option>Maior preço</option>
          </select>
        </div>

        <div className="grade-produtos">
          {produtos.map(produto => (
            <div className="produto" key={produto.id}>
              <span className="desconto">{produto.desconto}</span>
              <img src={produto.imagem} alt={`Imagem do ${produto.nome}`} />
              <h4>{produto.nome}</h4>
              <p>
                <del>${produto.precoOriginal}</del> <strong>${produto.precoComDesconto}</strong>
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
