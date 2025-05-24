// src/components/FormLogin.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext' 
import '../FormLogin/FormLogin.module.css'

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
      navigate('/usuario')
    } catch (err) {
      setErro(err)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="loginEmail" className={styles.label}>Login</label>
        <input
          type="email" // Mudado para email, mas pode ser "text" se o login não for sempre email
          id="loginEmail"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Insira seu login ou email"
          required
          aria-describedby={erro ? "loginError" : undefined}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="loginSenha" className={styles.label}>Senha</label>
        <input
          type="password"
          id="loginSenha"
          className={styles.input}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Insira sua senha"
          required
          aria-describedby={erro ? "loginError" : undefined}
        />
      </div>

      {erro && <p id="loginError" className={styles.errorMessage} role="alert">{erro}</p>}

      <button type="submit" className={styles.submitButton} disabled={carregando}>
        {carregando ? 'Acessando...' : 'Acessar Conta'}
      </button>
    </form>
  );
}