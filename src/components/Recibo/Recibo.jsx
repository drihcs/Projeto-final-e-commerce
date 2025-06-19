import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './CompraFinalizada.module.css'
import { useAuth } from '../../contexts/AuthContext'
import Recibo from './Recibo'

const CompraFinalizada = () => {
  const { usuario } = useAuth()
  const endereco = usuario?.endereco || {}
  const location = useLocation()
  const pedido = location.state?.pedido

  if (!pedido) {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <p>Nenhum pedido encontrado.</p>
          <Link to="/" className={styles.homeButton}>Voltar para Home</Link>
        </main>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.infoCard}>
          <Recibo usuario={usuario} endereco={endereco} pedido={pedido} />

          <div className={styles.actionButtons}>
            <button className={styles.printButton} onClick={() => window.print()}>
              Imprimir Recibo
            </button>
            <Link to="/" className={styles.homeButton}>
              Voltar para Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CompraFinalizada