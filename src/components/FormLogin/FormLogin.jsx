import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import styles from './FormLogin.module.css'

import facebookIcon from '../../assets/facebook.svg'
import shoe1 from '../../assets/pexels-melvin-buezo-2529148 1.png'
import shoe2 from '../../assets/pexels-melvin-buezo-2529148 2.png'

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
      setErro('Email ou senha inválidos')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <main className={styles.mainContainer}>
      <div className={styles.loginCard}>
        <h1 className={styles.loginTitle}>Acesse sua conta</h1>
        <p className={styles.newClientText}>
          Novo cliente? Então registre-se{' '}
          <a href="#" className={styles.registerLink}>
            aqui
          </a>
          .
        </p>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="login" className={styles.inputLabel}>
              Login *
            </label>
            <input
              type="email"
              id="login"
              placeholder="Insira seu login ou email"
              required
              className={styles.inputField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="senha" className={styles.inputLabel}>
              Senha *
            </label>
            <input
              type="password"
              id="senha"
              placeholder="Insira sua senha"
              required
              className={styles.inputField}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <a href="#" className={styles.forgotPassword}>
            Esqueci minha senha
          </a>
          {erro && <p className={styles.errorText}>{erro}</p>}
          <button type="submit" className={styles.loginButton} disabled={carregando}>
            {carregando ? 'Carregando...' : 'Acessar Conta'}
          </button>
        </form>
        <div className={styles.socialLoginContainer}>
          <div className={styles.socialTextContainer}>
            <p className={styles.socialText}>Ou faça login com</p>
          </div>
          <div className={styles.socialIconsContainer}>
            <a href="#" className={styles.googleIcon}>
              {/* Ícone Google SVG */}
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.63636 21.0022H5.45456V11.7295L2.95434 7.36363L0 7.63855V19.3658C0 20.2699 0.732281 21.0022 1.63636 21.0022Z"
                  fill="#0085F7"
                />
                <path
                  d="M18.5447 21.0022H22.3629C23.267 21.0022 23.9992 20.2699 23.9992 19.3658V7.63855L21.0492 7.36363L18.5447 11.7295V21.0022H18.5447Z"
                  fill="#00A94B"
                />
                <path
                  d="M18.5453 4.63856L16.3025 8.91839L18.5453 11.7295L23.9999 7.63856V5.45676C23.9999 3.43448 21.6912 2.27948 20.0726 3.49312L18.5453 4.63856Z"
                  fill="#FFBC00"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.45407 11.7295L3.31689 7.21496L5.45407 4.63857L11.9995 9.54765L18.5449 4.63857V11.7295L11.9995 16.6386L5.45407 11.7295Z"
                  fill="#FF4131"
                />
                <path
                  d="M0 5.45676V7.63856L5.45456 11.7295V4.63856L3.92728 3.49312C2.30864 2.27948 0 3.43448 0 5.45676H0Z"
                  fill="#E51C19"
                />
              </svg>
            </a>
            <a href="#" className={styles.facebookIcon}>
              <img
                src={facebookIcon}
                alt="Facebook"
                className={styles.socialIconImage}
              />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <img
          src={shoe1}
          alt="Tênis flutuando"
          className={styles.shoeImage1}
        />
        <img
          src={shoe2}
          alt="Tênis flutuando"
          className={styles.shoeImage2}
        />
      </div>
    </main>
  )
}
