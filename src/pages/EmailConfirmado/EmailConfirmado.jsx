// src/pages/EmailConfirmado/EmailConfirmado.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './EmailConfirmado.module.css';

export default function EmailConfirmado() {
  return (
    <>
      <div className={styles.container}>
        <h2>E-mail confirmado com sucesso!</h2>
        <p>Agora você pode fazer login com sua conta.</p>
        
        <Link to="/" className={styles.botaoInicio}>
          Voltar ao Início
        </Link>
      </div>
    </>
  );
}
