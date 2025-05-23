import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CollectionIcons.module.css'

import tshirt from '../../assets/tshirt.svg'
import pants from '../../assets/pants.svg'
import cap from '../../assets/cap.svg'
import headphone from '../../assets/headphone.svg'
import sneaker from '../../assets/sneaker.svg'

export default function CollectionIcons() {
  return (
    <section className={styles.collectionIcons}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Coleções em destaque</h2>

        <div className={styles.iconGrid}>
          <Link to="/categoria/camisetas" className={styles.iconItem}>
            <div className={styles.iconCircle}>
              <img src={tshirt} alt="Camisetas" />
            </div>
            <span className={styles.categoryName}>Camisetas</span>
          </Link>

          <Link to="/categoria/calcas" className={styles.iconItem}>
            <div className={styles.iconCircle}>
              <img src={pants} alt="Calças" />
            </div>
            <span className={styles.categoryName}>Calças</span>
          </Link>

          <Link to="/categoria/bones" className={styles.iconItem}>
            <div className={styles.iconCircle}>
              <img src={cap} alt="Bonés" />
            </div>
            <span className={styles.categoryName}>Bonés</span>
          </Link>

          <Link to="/categoria/headphones" className={styles.iconItem}>
            <div className={styles.iconCircle}>
              <img src={headphone} alt="Headphones" />
            </div>
            <span className={styles.categoryName}>Headphones</span>
          </Link>

          <Link to="/categoria/tenis" className={styles.iconItem}>
            <div className={styles.iconCircle}>
              <img src={sneaker} alt="Tênis" />
            </div>
            <span className={styles.categoryName}>Tênis</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
