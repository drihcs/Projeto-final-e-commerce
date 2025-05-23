import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CollectionIcons.module.css'

export default function CollectionIcons() {
  return (
    <section className="collectionIcons">
      <div className="container">
        <h2 className="section-title">Coleções em destaque</h2>

        <div className="iconGrid">
          <Link to="/categoria/camisetas" className="iconItem">
            <span className="material-symbols-outlined">tshirt</span>
            <span className="category-name">Camisetas</span>
          </Link>

          <Link to="/categoria/calcas" className="iconItem">
            <span className="material-symbols-outlined">checkroom</span>
            <span className="category-name">Calças</span>
          </Link>

          <Link to="/categoria/bones" className="iconItem">
            <span className="material-symbols-outlined">sports_baseball</span>
            <span className="category-name">Bonés</span>
          </Link>

          <Link to="/categoria/headphones" className="iconItem">
            <span className="material-symbols-outlined">headphones</span>
            <span className="category-name">Headphones</span>
          </Link>

          <Link to="/categoria/tenis" className="iconItem">
            <span className="material-symbols-outlined">sneaker</span>
            <span className="category-name">Tênis</span>
          </Link>
        </div>
      </div>
    </section>
  )
}