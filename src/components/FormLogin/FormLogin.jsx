"use client"

// src/components/FormLogin/FormLogin.jsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import styles from "./FormLogin.module.css"

export default function FormLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")
  const [carregando, setCarregando] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro("")
    setCarregando(true)

    try {
      await login(email, senha)
      alert("Login realizado com sucesso!")
      navigate("/usuario")
    } catch (err) {
      setErro(err)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Login *
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Insira seu login ou email"
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="senha" className={styles.label}>
          Senha *
        </label>
        <input
          id="senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Insira sua senha"
          className={styles.input}
          required
        />
      </div>

      <button type="submit" disabled={carregando} className={styles.submitButton}>
        {carregando ? "Entrando..." : "Acessar Conta"}
      </button>

      {erro && <div className={styles.errorMessage}>{erro}</div>}
    </form>
  )
}
