import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Breadcrumb from '../Breadcrumbs/Breadcrumbs'
import styles from '../Layout/Layout.module.css'

export default function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <Breadcrumb />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
