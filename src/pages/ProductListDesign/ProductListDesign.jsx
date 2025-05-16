import React, { useEffect } from 'react'
import '..ProductListDesign/ProductListDesign.css'

export default function Busca() {
  useEffect(() => {
    const container = document.getElementById("grade-produtos")

    for (let i = 1; i <= 15; i++) {
      const produto = document.createElement("div")
      produto.className = "produto"

      produto.innerHTML = `
        <span class="desconto">30% OFF</span>
        <img src="https://via.placeholder.com/180x130" alt="Tênis ${i}">
        <h4>Tênis K-Swiss V8 - Masculino</h4>
        <del>$200</del> <strong>$100</strong>
      `

      container.appendChild(produto)
    }
  }, [])

  return (
    <div className="pagina-busca">
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

      <section className="produtos">
        <div className="top-bar">
          <p>Resultados para “Tênis” – 389 produtos</p>
          <select>
            <option>Ordenar por: mais relevantes</option>
            <option>Menor preço</option>
            <option>Maior preço</option>
          </select>
        </div>

        <div className="grade-produtos" id="grade-produtos"></div>
      </section>
    </div>
  )
}
