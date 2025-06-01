import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Breadcrumb from '../Breadcrumbs/Breadcrumbs' // <-- Importa aqui
import styles from '../Layout/Layout.module.css'

export default function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <Breadcrumb /> {/* Adiciona aqui, entre o Header e o conteúdo */}
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
