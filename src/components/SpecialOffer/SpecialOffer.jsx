import styles from "../SpecialOffer/SpecialOffer.module.css"

export default function SpecialOffer() {
  return (
    <section className={styles.specialOffer}>
      <div className={styles.container}>
        {/* Elemento decorativo - círculo gradiente */}
        <div className={styles.gradientCircle}>
          <img src="/ellipse-gradient.png" alt="" />
        </div>

        {/* Imagem do produto */}
        <div className={styles.productImage}>
          <img src="/Laye.png" alt="Air Jordan edição de colecionador" className={styles.sneakerImage} />
        </div>

        {/* Conteúdo da oferta */}
        <div className={styles.offerContent}>
          <div className={styles.contentWrapper}>
            <span className={styles.offerBadge}>Oferta especial</span>
            <h2 className={styles.offerTitle}>Air Jordan edição de colecionador</h2>
            <p className={styles.offerDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea.
            </p>
            <a className={styles.offerButton} href="/oferta">
              Ver Oferta
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
