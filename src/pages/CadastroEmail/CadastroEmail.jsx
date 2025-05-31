import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CadastroEmail.module.css';
import Footer from "../../components/Footer/Footer.jsx";

function CadastroEmail() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // URLs das imagens dos tênis
  const tenisImageUrl1 = "/pexels-melvin-buezo-2529148 1 (1).png";
  const tenisImageUrl2 = "/pexels-melvin-buezo-2529148 2 (1).png";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert('Por favor, informe um e-mail válido.');
      return;
    }

    // ✅ Redireciona passando o e-mail para o formulário
    navigate('/cadastro/formulario', { state: { email } });
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <header className={styles.header}>
          <h1 className={styles.logoText}>Digital Store</h1>
        </header>

        <main className={styles.mainContent}>
          <section className={styles.formSection}>
            <div className={styles.cadastroCard}>
              <h2>Crie sua conta</h2>
              <p className={styles.loginPrompt}>
                Já possui uma conta? <a href="/login">Entre aqui</a>.
              </p>
              <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <label htmlFor="email" className={styles.inputLabel}>Email*</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Insira seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles.inputField}
                  />
                </div>
                <button type="submit" className={styles.submitButton}>
                  Criar Conta
                </button>
              </form>

              <div className={styles.socialLogin}>
                <p>Ou faça login com:</p>
                <div className={styles.socialIcons}>
                  <button className={styles.socialButton} aria-label="Login com Gmail">
                    <img src="https://www.gstatic.com/images/branding/googleg/1x/googleg_standard_color_24dp.png" alt="Google" style={{ width: '20px', height: '20px' }} />
                  </button>
                  <button className={styles.socialButton} aria-label="Login com Facebook">
                    <svg fill="#1877F2" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 310">
                      <path d="M81.703,165.106h33.981V305c0,2.762,2.238,5,5,5h57.616c2.762,0,5-2.238,5-5V165.765h39.087
                        c2.54,0,4.677-1.906,4.967-4.429l5.933-51.502c0.163-1.417-0.286-2.836-1.234-3.899
                        c-0.949-1.062-2.307-1.673-3.732-1.673h-44.986V71.978c0-9.732,5.262-14.667,15.501-14.667
                        c1.473,0,29.42,0,29.42,0c2.762,0,5-2.239,5-5V5.037c0-2.762-2.238-5-5-5h-40.545
                        C187.467,0.023,186.983,0,185.099,0c-11.348,0-32.666,2.363-52.073,16.355
                        c-22.729,16.072-33.043,42.697-33.043,71.523v32.088H81.703c-2.762,0-5,2.238-5,5v50.844
                        C76.703,162.868,78.941,165.106,81.703,165.106z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.imageSection}>
            <div className={styles.shoeDisplayContainer}>
              <img
                src={tenisImageUrl2}
                alt="Tênis decorativo 2"
                className={`${styles.shoeImage} ${styles.shoeImageBack}`}
              />
              <img
                src={tenisImageUrl1}
                alt="Tênis decorativo 1"
                className={`${styles.shoeImage} ${styles.shoeImageFront}`}
              />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default CadastroEmail;
