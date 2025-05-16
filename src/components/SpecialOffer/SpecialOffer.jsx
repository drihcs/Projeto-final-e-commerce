import React from 'react'
import styles from '../SpecialOffer/SpecialOffer.module.css'

export default function SpecialOffer() {
  return (
    <section className={styles.SpecialOffer}>
      <div className={styles['offer-container']}>

        <div className={styles['offer-image']}>
          <img
            alt="Air Jordan edição de colecionador"
            loading="lazy"
            decoding="async"
            src="/Laye.png"
          />
        </div>

        <div className={styles['offer-content']}>
          <span className={styles['offer-badge']}>Oferta especial</span>
          <h2 className={styles['offer-title']}>Air Jordan edição de colecionador</h2>
          <p className={styles['offer-description']}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.
          </p>
          <a className={styles.button} href="/oferta">Ver oferta</a>
        </div>

      </div>
    </section>
  )
}
