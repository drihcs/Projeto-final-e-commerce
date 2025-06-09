import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoute({ children }) {
  const { usuario, carregando } = useAuth()

  if (carregando) return <p>Carregando...</p>

  return usuario ? children : <Navigate to="/login" />
}
