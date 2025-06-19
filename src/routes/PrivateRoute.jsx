import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoute({ children }) {
  const { usuario, carregando } = useAuth()
  const location = useLocation()

  if (carregando) return <p>Carregando...</p>

  return usuario ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}