import React, { createContext, useState, useEffect, useContext } from 'react'
import { supabase } from '../utils/supabase'

const AuthContext = createContext()
AuthContext.displayName = 'AuthContext'

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    const session = supabase.auth.session()
    if (session) setUsuario(session.user)
    setCarregando(false)

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user ?? null)
    })

    return () => {
      authListener.unsubscribe()
    }
  }, [])

  const login = async (email, senha) => {
    setCarregando(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha })
    setCarregando(false)

    if (error) {
      throw new Error(error.message)
    } else {
      setUsuario(data.user)
      localStorage.setItem('usuario', JSON.stringify(data.user))
      return data.user
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
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
