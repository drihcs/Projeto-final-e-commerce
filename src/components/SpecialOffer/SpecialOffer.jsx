import styles from "../SpecialOffer/SpecialOffer.module.css"

export default function SpecialOffer() {
  return (
    <section className={styles.specialOfferSection}>
      <div className={styles.specialOfferContainer}>
        {/* Círculo gradiente decorativo */}
        <div className={styles.decorativeCircle}>
          <img src="/Ellipse.png" alt="" />
        </div>

        {/* Imagem do produto */}
        <div className={styles.productImageSection}>
          <img src="/Laye.png" alt="Air Jordan edição de colecionador" className={styles.productImg} />
        </div>

        {/* Conteúdo da oferta */}
        <div className={styles.offerContentSection}>
          <div className={styles.offerCard}>
            <span className={styles.specialBadge}>Oferta especial</span>
            <h2 className={styles.specialTitle}>Air Jordan edição de colecionador</h2>
            <p className={styles.specialDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea.
            </p>
            <a className={styles.specialButton} href="/oferta">
              Ver Oferta
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
