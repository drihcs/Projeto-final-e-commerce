// src/components/Header/Header.jsx
import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import headerLogo from '../../assets/logo-header.svg'
import styles from './Header.module.css'
import CartModal from '../CartModal/CartModal'
import { useCarrinho } from '../../contexts/CarrinhoContext'
import { useAuth } from '../../contexts/AuthContext'
import { HashLink } from 'react-router-hash-link';

export default function Header() {
  const [showCart, setShowCart] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const { itens, limparCarrinho } = useCarrinho()
  const { user } = useAuth()

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      navigate(`/busca?query=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const esconderSearchBar = location.pathname === '/produtos';

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link to="/">
            <img src={headerLogo} alt="Logo Digital Store" />
          </Link>
        </div>

        {/* Barra de pesquisa */}
        {!esconderSearchBar && (
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
        )}

        {/* Ações */}
        <div className={styles.headerActions}>
          <Link to="/cadastro" className={styles.linkText}>Cadastre-se</Link>

          {user ? (
            <span className={styles.userGreeting}>Olá, {user.nome}</span>
          ) : (
            <Link to="/login" className={styles.btnPrimary}>Entrar</Link>
          )}

          {/* Botão do carrinho */}
          <button
            className={styles.cart}
            onClick={() => setShowCart(!showCart)}
            aria-label={showCart ? 'Fechar carrinho' : 'Abrir carrinho'}
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            <div className={styles.cartCount}>{itens.length}</div>
          </button>

          {/* Menu hambúrguer */}
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
            <HashLink to="/#categorias" onClick={() => setMobileMenuOpen(false)}>Categorias</HashLink>           
          </li>
          <li>
            <Link to="/pedidos" onClick={() => setMobileMenuOpen(false)}>Meus Pedidos</Link>
          </li>
        </ul>
      </nav>

      {/* Modal do carrinho */}
      {showCart && (
        <CartModal
          cartItems={itens}
          onClose={() => setShowCart(false)}
          onClear={limparCarrinho}
        />
      )}
    </header>
  )
}
