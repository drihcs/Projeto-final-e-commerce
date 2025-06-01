// src/pages/EmailExpirado/EmailExpirado.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './EmailExpirado.module.css';

export default function EmailExpirado() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2>Link expirado ou inválido</h2>
        <p>O link de confirmação do seu e-mail não é mais válido. Isso pode ter acontecido por tempo expirado ou uso repetido.</p>
        <p>Você pode se cadastrar novamente para receber um novo link.</p>

        <div className={styles.botoes}>
          <Link to="/cadastro" className={styles.botaoRosa}>Refazer Cadastro</Link>
          <Link to="/" className={styles.botaoBranco}>Voltar ao Início</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
