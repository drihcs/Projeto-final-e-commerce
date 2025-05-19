import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import CartModal from '../CartModal/CartModal'

export default function Header() {
  // Estado para mostrar/ocultar modal do carrinho
  const [showCart, setShowCart] = useState(false)

  // Estado dos itens no carrinho (exemplo estático)
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

  // Limpar o carrinho
  const clearCart = () => {
    setCartItems([])
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link to="/">
            {/* SVG omitido para brevidade */}
            <h1>
              <span className={styles.highlight}>Digital</span> Store
            </h1>
          </Link>
        </div>

        {/* Search */}
        <div className={styles.searchBar}>
          <input placeholder="Pesquisar produto..." type="text" />
          <Link to="/busca">
            <button className={styles.searchButton}>
              <span className="material-symbols-outlined">search</span>
            </button>
          </Link>
        </div>

        {/* Ações: Cadastro / Entrar / Carrinho */}
        <div className={styles.headerActions}>
          <Link to="/cadastro" className={styles.linkText}>
            Cadastre-se
          </Link>
          <Link to="/login" className={styles.btnPrimary}>
            Entrar
          </Link>

          {/* Botão para abrir/fechar o modal do carrinho */}
          <button
            className={styles.cart}
            onClick={() => setShowCart(!showCart)}
            aria-label={showCart ? 'Fechar carrinho' : 'Abrir carrinho'}
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            <div className={styles.cartCount}>{cartItems.length}</div>
          </button>
        </div>
      </div>

      {/* Navegação principal */}
      <nav className={styles.mainNav}>
        <ul className={styles.navList}>
          <li className={styles.active}>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/produtos">Produtos</Link>
          </li>
          <li>
            <Link to="/categorias">Categorias</Link>
          </li>
          <li>
            <Link to="/pedidos">Meus Pedidos</Link>
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
