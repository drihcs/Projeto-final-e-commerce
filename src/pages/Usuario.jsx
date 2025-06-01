import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import styles from './Usuario.module.css'

function Usuario() {
  const { usuario, logout } = useAuth()

  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair?')) {
      logout()
    }
  }

  if (!usuario) {
    return <p className={styles.aviso}>Usuário não encontrado.</p>
  }

  const { nome, email, cpf, celular, endereco } = usuario

  return (
    <div className={styles.usuarioContainer}>
      <aside className={styles.usuarioAside}>
        <h2 className={styles.usuarioTitulo}>Minha Conta</h2>
        <nav>
          <ul className={styles.usuarioMenu}>
            <li><a href="#">Dados Pessoais</a></li>
            <li><a href="#">Endereço</a></li>
            <li><a href="#">Pedidos</a></li>
            <li><button onClick={handleLogout} className={styles.botaoSair}>Sair</button></li>
          </ul>
        </nav>
      </aside>

      <main className={styles.usuarioMain}>
        <section className={styles.usuarioCard}>
          <h3>Dados Pessoais</h3>
          <p><strong>Nome:</strong> {nome}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>CPF:</strong> {cpf}</p>
          <p><strong>Celular:</strong> {celular}</p>
        </section>

        <section className={styles.usuarioCard}>
          <h3>Endereço</h3>
          <p><strong>Rua:</strong> {endereco?.rua}</p>
          <p><strong>Número:</strong> {endereco?.numero}</p>
          <p><strong>Bairro:</strong> {endereco?.bairro}</p>
          <p><strong>Cidade:</strong> {endereco?.cidade}</p>
          <p><strong>CEP:</strong> {endereco?.cep}</p>
        </section>
      </main>
    </div>
  )
}

export default Usuario
