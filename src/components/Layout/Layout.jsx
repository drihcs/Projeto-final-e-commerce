import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Breadcrumb from '../Breadcrumbs/Breadcrumbs'i
import styles from '../Layout/Layout.module.css'

export default function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <Breadcrumb /> {/* adiciona aqui */}
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
