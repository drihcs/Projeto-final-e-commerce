import FormLogin from "../components/FormLogin/FormLogin"
import Footer from "../components/Footer/Footer"
import styles from "./Login.module.css"

export default function Login() {
  // Nomes dos arquivos como fornecidos
  const tenisImageUrl1 = "/pexels-melvin-buezo-2529148 1 (1).png"
  const tenisImageUrl2 = "/pexels-melvin-buezo-2529148 2 (1).png"

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <div className={styles.logoIcon}></div>
          <h1 className={styles.logoText}>Digital Store</h1>
        </div>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.loginSection}>
          <div className={styles.loginFormContainer}>
            <h2>Acesse sua conta</h2>
            <p className={styles.registerPrompt}>
              Novo cliente? Então <a href="/registro">registre-se aqui</a>.
            </p>
            <FormLogin />
            <a href="/esqueci-senha" className={styles.forgotPasswordLink}>
              Esqueci minha senha
            </a>
            <div className={styles.socialLogin}>
              <p>Ou faça login com</p>
              <div className={styles.socialIcons}>
                <button className={styles.socialButton} aria-label="Login com Gmail">
                  <span>M</span>
                </button>
                <button className={styles.socialButton} aria-label="Login com Facebook">
                  <span>f</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.imageSection}>
          <div className={styles.shoeDisplayContainer}>
            <img
              src={tenisImageUrl2 || "/placeholder.svg"}
              alt="Tênis decorativo 2"
              className={`${styles.shoeImage} ${styles.shoeImageBack}`}
            />
            <img
              src={tenisImageUrl1 || "/placeholder.svg"}
              alt="Tênis decorativo 1"
              className={`${styles.shoeImage} ${styles.shoeImageFront}`}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
