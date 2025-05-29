import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import headerLogo from '../../assets/logo-header.svg'
import styles from './Header.module.css'
import CartModal from '../CartModal/CartModal'

export default function Header() {
  const [showCart, setShowCart] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'Tênis Nike Revolution 6 Next Nature Masculino',
      price: 219.0,
      image: '/img/tenis-nike.jpg',
    },
    {
      id: 2,
      title: 'Tênis Nike Revolution 6 Next Nature Masculino',
      price: 219.0,
      image: '/img/tenis-nike.jpg',
    },
  ])

  const clearCart = () => {
    setCartItems([])
  }

  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      navigate(`/busca?query=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Logo */}
        <div className={styles.logo}>
           <Link to="/">
              <img src={headerLogo} alt="Logo Digital Store" />
           </Link>
        </div>

        {/* Search */}
        <div className={styles.searchBar}>
          <input
            placeholder="Pesquisar produto..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className={styles.searchButton} disabled>
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>

        {/* Ações: Cadastro / Entrar / Carrinho */}
        <div className={styles.headerActions}>
          <Link to="/cadastro" className={styles.linkText}>
            Cadastre-se
          </Link>
          <Link to="/login" className={styles.btnPrimary}>
            Entrar
          </Link>

          <button
            className={styles.cart}
            onClick={() => setShowCart(!showCart)}
            aria-label={showCart ? 'Fechar carrinho' : 'Abrir carrinho'}
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            <div className={styles.cartCount}>{cartItems.length}</div>
          </button>

          {/* Menu hambúrguer para mobile */}
          <button
            className={styles.menuToggle}
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            <span className="material-symbols-outlined">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Navegação principal */}
      <nav className={`${styles.mainNav} ${mobileMenuOpen ? styles.mobileOpen : ''}`}>
        <ul className={styles.navList}>
          <li className={styles.active}>
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/produtos" onClick={() => setMobileMenuOpen(false)}>Produtos</Link>
          </li>
          <li>
            <Link to="/categorias" onClick={() => setMobileMenuOpen(false)}>Categorias</Link>
          </li>
          <li>
            <Link to="/pedidos" onClick={() => setMobileMenuOpen(false)}>Meus Pedidos</Link>
          </li>
        </ul>
      </nav>

      {/* Modal do carrinho */}
      {showCart && (
        <CartModal
          cartItems={cartItems}
          onClose={() => setShowCart(false)}
          onClear={clearCart}
        />
      )}
    </header>
  )
}