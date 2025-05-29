import { Link } from 'react-router-dom'
import styles from "../SpecialOffer/SpecialOffer.module.css"

export default function SpecialOffer() {
  return (
    <section className={styles.specialOffer__section}>
      <div className={styles.specialOffer__container}>
        <div className={styles.specialOffer__circle}>
          <img src="/Ellipse.png" alt="" />
        </div>

        <div className={styles.specialOffer__imageWrapper}>
          <img src="/Laye.png" alt="Air Jordan edição de colecionador" className={styles.specialOffer__image} />
        </div>

        <div className={styles.specialOffer__content}>
          <div className={styles.specialOffer__card}>
            <span className={styles.specialOffer__badge}>Oferta especial</span>
            <h2 className={styles.specialOffer__title}>Air Jordan edição de colecionador</h2>
            <p className={styles.specialOffer__description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea.
            </p>
            <Link to="/produto/:id" className={styles.specialOffer__button}>
              Ver Oferta
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
