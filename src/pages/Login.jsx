// src/pages/Login.jsx (ou onde seu arquivo Login.jsx estiver)

import React from 'react';
import FormLogin from '../components/FormLogin/FormLogin';
import Footer from '../components/Footer/Footer';
import styles from './Login.module.css';

import { ReactComponent as FacebookIcon } from './src/assets/face.svg';
import { ReactComponent as GmailIcon } from './src/assets/gmail.svg';

// Não precisamos importar as imagens aqui se elas estiverem na pasta /public

export default function Login() {
  // Nomes dos arquivos como fornecidos
  const tenisImageUrl1 = "/pexels-melvin-buezo-2529148 1 (1).png";
  const tenisImageUrl2 = "/pexels-melvin-buezo-2529148 2 (1).png";

  // Se você renomear os arquivos na pasta public para, por exemplo:
  // const tenisImageUrl1 = "/tenis_principal.png";
  // const tenisImageUrl2 = "/tenis_secundario.png";

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.logoText}>Digital Store</h1>
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
              <p>Ou faça login com:</p>
             <div className={styles.socialIcons}>
                <button className={styles.socialButton} aria-label="Login com Google">
                  <GmailIcon className={styles.svgIcon} /> {/* Ícone do Gmail */}
                </button>
                <button className={styles.socialButton} aria-label="Login com Facebook">
                  <FacebookIcon className={styles.svgIcon} /> {/* Ícone do Facebook */}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Seção da Imagem ATUALIZADA */}
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
  );
}