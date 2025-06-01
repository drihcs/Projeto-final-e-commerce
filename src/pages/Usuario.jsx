import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import './Usuario.css'

function Usuario() {
  const { usuario, logout } = useAuth()

  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair?')) {
      logout()
    }
  }

  if (!usuario) {
    return <p className="usuario-mensagem-erro">Usuário não encontrado.</p>
  }

  const { nome, email, cpf, celular, endereco } = usuario

  return (
    <div className="usuario-container">
      <aside className="usuario-aside">
        <h2>Minha Conta</h2>
        <ul>
          <li>Meus Dados</li>
          <li>Endereço</li>
          <li>Pedidos</li>
          <li onClick={handleLogout} className="logout">Sair</li>
        </ul>
      </aside>

      <main className="usuario-main">
        <section className="usuario-card">
          <h3>Meus Dados</h3>
          <p><strong>Nome:</strong> {nome}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>CPF:</strong> {cpf}</p>
          <p><strong>Celular:</strong> {celular}</p>
        </section>

        <section className="usuario-card">
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
