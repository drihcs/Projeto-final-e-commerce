// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react'

const AuthContext = createContext()
AuthContext.displayName = 'AuthContext' // ajuda em DevTools

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('usuario')
    if (dadosSalvos) setUsuario(JSON.parse(dadosSalvos))
    setCarregando(false)
  }, [])

  const login = (email, senha) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'cliente@exemplo.com' && senha === '123456') {
          const usuarioMock = {
            nome: 'João Cliente',
            email,
            cpf: '123.456.789-00',
            celular: '(85) 99999-9999',
            endereco: {
              rua: 'Rua das Flores',
              numero: '123',
              bairro: 'Centro',
              cidade: 'Fortaleza',
              cep: '60000-000'
            }
          }
          setUsuario(usuarioMock)
          localStorage.setItem('usuario', JSON.stringify(usuarioMock))
          resolve(usuarioMock)
        } else {
          reject('Credenciais inválidas')
        }
      }, 1000)
    })
  }

  const logout = () => {
    setUsuario(null)
    localStorage.removeItem('usuario')
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout, carregando }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
