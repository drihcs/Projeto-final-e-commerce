export default function CollectionCards() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Coleções em destaque</h2>
        <div className={styles.collectionGrid}>
          {colecoes.map(colecao => (
            <div key={colecao.id} className={styles.collectionCard}>
              <div className={styles.cardBackground}></div>
              <div className={styles.cardContent}>
                <span className={styles.discountTag}>{colecao.desconto}</span>
                <h3 className={styles.cardTitle}>{colecao.titulo}</h3>
                <a className={styles.buyButton} href={`/colecao/${colecao.id}`}>
                  Comprar
                </a>
              </div>
              <div className={styles.productImageContainer}>
                <img
                  src={colecao.imagemProduto || "/placeholder.svg"}
                  alt={colecao.titulo}
                  className={styles.productImage}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
