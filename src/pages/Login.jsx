import React from 'react';
import { Link } from "react-router-dom";
import FormLogin from '../components/FormLogin/FormLogin';
import Footer from '../components/Footer/Footer';
import styles from './Login.module.css';
import headerLogo from '../assets/logo-header.svg'

export default function Login() {
  const tenisImageUrl1 = "/pexels-melvin-buezo-2529148 1 (1).png";
  const tenisImageUrl2 = "/pexels-melvin-buezo-2529148 2 (1).png";

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link to="/">
            <img src={headerLogo} alt="Logo Digital Store" />
          </Link>
        </div>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.loginSection}>
          <div className={styles.loginFormContainer}>
            <h2>Acesse sua conta</h2>
            <p className={styles.registerPrompt}>
              Novo cliente? Então <a href="/cadastro">registre-se aqui</a>.
            </p>
            <FormLogin />
            <a href="/esqueci-senha" className={styles.forgotPasswordLink}>
              Esqueci minha senha
            </a>
            <div className={styles.socialLogin}>
              <p>Ou faça login com:</p>
              <div className={styles.socialIcons}>
                <button className={styles.socialButton} aria-label="Login com Google">G</button>
                <button className={styles.socialButton} aria-label="Login com Facebook">F</button>
              </div>
            </div>
          </div>
        </section>

        {/* Seção da Imagem */}
        <section className={styles.imageSection}>
          <div className={styles.shoeDisplayContainer}> {/*container para as imagens */}
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
  );
}