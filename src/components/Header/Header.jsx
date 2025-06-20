import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import headerLogo from '../../assets/logo-header.svg';
import styles from './Header.module.css';
import CartModal from '../CartModal/CartModal';
import { useCarrinho } from '../../contexts/CarrinhoContext';
import { useAuth } from '../../contexts/AuthContext';
import { HashLink } from 'react-router-hash-link';

export default function Header() {
  const [showCart, setShowCart] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const { itens, limparCarrinho } = useCarrinho();
  const { usuario, logout } = useAuth();

  const primeiroNome = usuario?.user_metadata?.nome?.split(' ')[0] || '';

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      navigate(`/busca?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

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
          {!usuario && (
            <Link to="/cadastro" className={styles.linkText}>
              Cadastre-se
            </Link>
          )}

          {usuario ? (
            <>
              <span className={styles.userGreeting}>Olá, {primeiroNome}</span>
              <button
                onClick={handleLogout}
                className={styles.btnPrimary}
                title="Sair"
                style={{ marginLeft: '10px', padding: '6px 12px', fontSize: '0.9rem' }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ verticalAlign: 'middle', marginRight: '4px' }}
                >
                  logout
                </span>
                Sair
              </button>
            </>
          ) : (
            <Link to="/login" className={styles.btnPrimary}>
              Entrar
            </Link>
          )}

          {/* Carrinho */}
          <div className={styles.cartWrapper}>
            <button
              className={styles.cart}
              onClick={() => setShowCart(!showCart)}
              aria-label={showCart ? 'Fechar carrinho' : 'Abrir carrinho'}
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              <div className={styles.cartCount}>{itens.length}</div>
            </button>

            {showCart && (
              <CartModal
                cartItems={itens}
                onClose={() => setShowCart(false)}
                onClear={limparCarrinho}
              />
            )}
          </div>

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
      <nav
        className={`${styles.mainNav} ${
          mobileMenuOpen ? styles.mobileOpen : ''
        }`}
      >
        <ul className={styles.navList}>
          <li>
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/produtos" onClick={() => setMobileMenuOpen(false)}>
              Produtos
            </Link>
          </li>
          <li>
            <HashLink to="/#categorias" onClick={() => setMobileMenuOpen(false)}>
              Categorias
            </HashLink>
          </li>
          <li>
            <Link to="/usuario/pedidos" onClick={() => setMobileMenuOpen(false)}>
              Meus Pedidos
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}