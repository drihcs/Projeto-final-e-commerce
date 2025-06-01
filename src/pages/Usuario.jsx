import React from 'react';
import styles from './Usuario.module.css';
import { useAuth } from '../../contexts/AuthContext';

function Usuario() {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h3>Meu Perfil</h3>
        <ul>
          <li className={styles.active}>Minhas Informações</li>
          <li>Meus Pedidos</li>
          <li>Métodos de Pagamento</li>
        </ul>
      </aside>

      <section className={styles.content}>
        <h2 className={styles.sectionTitle}>Minhas Informações</h2>

        <div className={styles.card}>
          <h3>Informações Pessoais</h3>
          <p><strong>Nome:</strong> {user?.nome || '-'}</p>
          <p><strong>CPF:</strong> {user?.cpf || '-'}</p>
          <p><strong>Email:</strong> {user?.email || '-'}</p>
          <p><strong>Celular:</strong> {user?.celular || '-'}</p>
        </div>

        <div className={styles.card}>
          <h3>Informações de Entrega</h3>
          <p><strong>Endereço:</strong> {user?.endereco || '-'}</p>
          <p><strong>Bairro:</strong> {user?.bairro || '-'}</p>
          <p><strong>Cidade:</strong> {user?.cidade || '-'}</p>
          <p><strong>CEP:</strong> {user?.cep || '-'}</p>
        </div>
      </section>
    </div>
  );
}

export default Usuario;
