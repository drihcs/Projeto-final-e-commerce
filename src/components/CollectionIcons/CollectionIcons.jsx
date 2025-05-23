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
          <img src="./src/assets/tshirt.svg" alt="t-shirt" />
            <span className={styles.categoryName}>Camisetas</span>
          </Link>
          <Link to="/categoria/calcas" className={styles.iconItem}>
            <img src="./src/assets/pants.svg" alt="pants" />
            <span className={styles.categoryName}>Calças</span>
          </Link>
          <Link to="/categoria/bones" className={styles.iconItem}>
            <img src="./src/assets/cap.svg" alt="cap" />
            <span className={styles.categoryName}>Bonés</span>
          </Link>
          <Link to="/categoria/headphones" className={styles.iconItem}>
          <img src="./src/assets/headphone.svg" alt="headphone" />
            <span className={styles.categoryName}>Headphones</span>
          </Link>
          <Link to="/categoria/tenis" className={styles.iconItem}>
          <img src="./src/assets/sneaker.svg" alt="sneaker" />
            <span className={styles.categoryName}>Tênis</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
