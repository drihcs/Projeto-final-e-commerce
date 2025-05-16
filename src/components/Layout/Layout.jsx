import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import styles from '../Layout/Layout.module.css'

export default function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <Outlet /> {/* Aqui será renderizada a página atual */}
      </main>
      <Footer />
    </div>
  )
}