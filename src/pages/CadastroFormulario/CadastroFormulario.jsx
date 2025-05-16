import React, { useState } from 'react'
import './CadastroFormulario.css'

function CadastroFormulario() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [criando, setCriando] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!nome || !email || !senha || !confirmarSenha) {
      setMensagem('Preencha todos os campos.')
      return
    }

    if (senha !== confirmarSenha) {
      setMensagem('As senhas não coincidem.')
      return
    }

    setCriando(true)
    setMensagem('')

    // Simula criação de conta
    setTimeout(() => {
      setMensagem('Conta criada com sucesso!')
      setNome('')
      setEmail('')
      setSenha('')
      setConfirmarSenha('')
      setCriando(false)
    }, 1500)
  }

  return (
    <div className="formulario-container">
      <div className="formulario-card">
        <h2>Cadastro de Novo Usuário</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />

          <button type="submit" disabled={criando}>
            {criando ? 'Criando...' : 'Criar Conta'}
          </button>
        </form>

        {mensagem && <p className="mensagem">{mensagem}</p>}
      </div>
    </div>
  )
}

export default CadastroFormulario
