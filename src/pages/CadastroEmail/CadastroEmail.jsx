import React, { useState } from 'react'
import './CadastroEmail.module.css'

function CadastroEmail() {
  const [email, setEmail] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [enviando, setEnviando] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email) {
      setMensagem('Por favor, informe um e-mail válido.')
      return
    }

    setEnviando(true)
    setMensagem('')

    // Simula o envio com um "setTimeout"
    setTimeout(() => {
      setMensagem(`Instruções enviadas para ${email}.`)
      setEmail('')
      setEnviando(false)
    }, 1500)
  }

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <h2>Crie sua conta</h2>
        <p>Informe seu e-mail para receber as instruções de cadastro.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" disabled={enviando}>
            {enviando ? 'Enviando...' : 'Enviar'}
          </button>
        </form>

        {mensagem && <p className="mensagem">{mensagem}</p>}
      </div>
    </div>
  )
}

export default CadastroEmail
