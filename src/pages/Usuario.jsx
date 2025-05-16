import React from 'react'
import { useAuth } from '../contexts/AuthContext'

function Usuario() {
  const { usuario, logout } = useAuth()

  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair?')) {
      logout()
    }
  }

  if (!usuario) {
    return <p>Usuário não encontrado.</p>
  }

  const { nome, email, cpf, celular, endereco } = usuario

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Área do Usuário</h2>
      <p><strong>Nome:</strong> {nome}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>CPF:</strong> {cpf}</p>
      <p><strong>Celular:</strong> {celular}</p>

      <h3>Endereço</h3>
      <p><strong>Rua:</strong> {endereco?.rua}</p>
      <p><strong>Número:</strong> {endereco?.numero}</p>
      <p><strong>Bairro:</strong> {endereco?.bairro}</p>
      <p><strong>Cidade:</strong> {endereco?.cidade}</p>
      <p><strong>CEP:</strong> {endereco?.cep}</p>

      <button
        onClick={handleLogout}
        style={{
          marginTop: '1.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#d9534f',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
        }}
      >
        Sair
      </button>
    </div>
  )
}

export default Usuario
