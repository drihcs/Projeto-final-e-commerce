import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext' 
import styles from './FormLogin.module.css'

export default function FormLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    setCarregando(true)

    try {
      await login(email, senha)
      alert('Login realizado com sucesso!')
      navigate('/usuario')  // redireciona após login bem sucedido
    } catch (err) {
      // Exibe mensagem clara do erro
      setErro(err.message || 'Erro desconhecido ao entrar')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Login *</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={styles.inputField}
          required
          placeholder="Seu email"
          autoComplete="username"
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Senha *</label>
        <input
          type="password"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          className={styles.inputField}
          required
          placeholder="Sua senha"
          autoComplete="current-password"
        />
      </div>

      <button
        type="submit"
        className={styles.loginButton}
        disabled={carregando}
      >
        {carregando ? 'Entrando...' : 'Entrar'}
      </button>

      {erro && <p className={styles.errorMessage}>{erro}</p>}
    </form>
  )
}