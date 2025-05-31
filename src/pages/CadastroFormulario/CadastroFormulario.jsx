import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './CadastroFormulario.module.css';

function CadastroFormulario() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2 className={styles.title}>Criar Conta</h2>
        <form className={styles.form}>
          <fieldset className={styles.fieldset}>
            <legend>Informações Pessoais</legend>
            <input type="text" placeholder="Insira seu nome" required />
            <input type="text" placeholder="Insira seu CPF" required />
            <input type="email" placeholder="Insira seu email" required />
            <input type="text" placeholder="Insira seu celular" required />
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend>Informações de Entrega</legend>
            <input type="text" placeholder="Insira seu endereço" required />
            <input type="text" placeholder="Insira seu bairro" required />
            <input type="text" placeholder="Insira sua cidade" required />
            <input type="text" placeholder="Insira seu CEP" required />
            <input type="text" placeholder="Insira complemento" />
          </fieldset>

          <label className={styles.checkbox}>
            <input type="checkbox" />
            Quero receber por email ofertas e novidades das lojas da Digital Store.
          </label>

          <button type="submit" className={styles.button}>Criar Conta</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default CadastroFormulario;
