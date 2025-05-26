import React, { useState } from 'react'
import  styles from './CadastroEmail.module.css'
import Footer from '../components/Footer/Footer';

const tenisImageUrl1 = "/pexels-melvin-buezo-2529148 1 (1).png";
const tenisImageUrl2 = "/pexels-melvin-buezo-2529148 2 (1).png";



function CadastroEmail() {
  
  const [email, setEmail] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [enviando, setEnviando] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email) {
      setMensagem('Por favor, informe um e-mail válido.')
      return
    }

    setEnviando(true)
    setMensagem('')

    // Simula o envio com um "setTimeout"
    setTimeout(() => {
      setMensagem(`Instruções enviadas para ${email}.`)
      setEmail('')
      setEnviando(false)
    }, 1500)
  }

   return (

    <div className={styles.pageContainer}>
      <header className={styles.header}>
        {/* Usando a mesma estrutura de logo da sua imagem */}
        <h1 className={styles.logoText}><span className={styles.logoIcon}></span> Digital Store</h1>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.formSection}>
          <div className={styles.formCard}>
            <h2>Crie sua conta</h2>
            <p className={styles.subLink}>
              Já possui uma conta? <a href="/login">Entre aqui.</a>
            </p>

            <form onSubmit={handleSubmit}>
              <label htmlFor="email" className={styles.inputLabel}>Email <span className={styles.required}>*</span></label>
              <input
                type="email"
                id="email"
                placeholder="Insira seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.emailInput}
              />
              <button type="submit" disabled={enviando} className={styles.submitButton}>
                {enviando ? 'Criando...' : 'Criar Conta'}
              </button>
            </form>

            <div className={styles.socialLoginDivider}>
              <span className={styles.dividerLine}></span>
              <span className={styles.socialLoginText}>Ou faça login com</span>
              <span className={styles.dividerLine}></span>
            </div>

            <div className={styles.socialIconsContainer}>
              {/* Para usar imagens:
                  <button className={styles.socialButton} aria-label="Login com Meta">
                    <img src={metaIconUrl} alt="Meta" />
                  </button> 
                */}
              <button className={`${styles.socialButton} ${styles.metaButton}`} aria-label="Login com Meta">M</button>
              <button className={`${styles.socialButton} ${styles.googleButton}`} aria-label="Login com Google">G</button>
              <button className={`${styles.socialButton} ${styles.microsoftButton}`} aria-label="Login com Microsoft">M</button>
            </div>
            {mensagem && <p className={`${styles.mensagem} ${!email && enviando === false ? styles.mensagemErro : styles.mensagemSucesso}`}>{mensagem}</p>}
          </div>
        </section>

        <section className={styles.imageSection}>
          <div className={styles.shoeDisplayContainer}> {/* Novo container para as imagens */}
            <img
              src={tenisImageUrl2} // Imagem que ficará mais ao fundo
              alt="Tênis decorativo 2"
              className={`${styles.shoeImage} ${styles.shoeImageBack}`}
            />
            <img
              src={tenisImageUrl1} // Imagem que ficará mais à frente
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


export default CadastroEmail
