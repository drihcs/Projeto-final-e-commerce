import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CollectionIcons.module.css'

export default function CollectionIcons() {
  return (
    <section className={styles.collectionIcons}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Coleções em destaque</h2>

        <div className={styles.iconGrid}>
          <Link to="/categoria/camisetas" className={styles.iconItem}>
            <i className="ph ph-t-shirt"></i>
            <span className={styles.categoryName}>Camisetas</span>
          </Link>
          <Link to="/categoria/calcas" className={styles.iconItem}>
            <i className="ph ph-pants"></i>
            <span className={styles.categoryName}>Calças</span>
          </Link>
          <Link to="/categoria/bones" className={styles.iconItem}>
            <i className="ph ph-baseball-cap"></i>
            <span className={styles.categoryName}>Bonés</span>
          </Link>
          <Link to="/categoria/headphones" className={styles.iconItem}>
            <i className="ph ph-headphones"></i>
            <span className={styles.categoryName}>Headphones</span>
          </Link>
          <Link to="/categoria/tenis" className={styles.iconItem}>
            <i className="ph ph-sneaker-move"></i>
            <span className={styles.categoryName}>Tênis</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
