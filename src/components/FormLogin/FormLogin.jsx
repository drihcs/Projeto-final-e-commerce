// src/components/FormLogin.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx' 
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
      navigate('/usuario')
    } catch (err) {
      setErro(err)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: 'auto' }}>
      <h2>Login</h2>
      <label>Email:</label>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <br />
      <label>Senha:</label>
      <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required />
      <br />
      <button type="submit" disabled={carregando}>
        {carregando ? 'Entrando...' : 'Entrar'}
      </button>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </form>
  )
}