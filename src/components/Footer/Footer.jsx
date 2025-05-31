import React from 'react'
import { Link } from 'react-router-dom';
import styles from '../Footer/Footer.module.css'
import footerLogo from '../../assets/logo-footer.svg'
import facebookIcon from '../../assets/facebook.svg'
import instagramIcon from '../../assets/instagram.svg'
import twitterIcon from '../../assets/twitter.svg'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerAbout}>
          <Link to="/">
            <img src={footerLogo} alt="Logo" />
          </Link>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore.
          </p>
         <div className={styles.footerSocial}>
          <a href="#" aria-label="Facebook">
            <img src={facebookIcon} alt="Facebook" />
          </a>
          <a href="#" aria-label="Instagram">
            <img src={instagramIcon} alt="Instagram" />
          </a>
          <a href="#" aria-label="Twitter">
            <img src={twitterIcon} alt="Twitter" />
          </a>
        </div>
        </div>

        <div className={styles.footerInfo}>
          <h4>Informação</h4>
          <ul>
            <li><a href="/sobre-digital">Sobre Digital Store</a></li>
            <li><a href="/seguranca">Segurança</a></li>
            <li><a href="/wishlist">Wishlist</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/trabalhe-conosco">Trabalhe conosco</a></li>
            <li><a href="#">Meus Pedidos</a></li>
          </ul>
        </div>

        <div className={styles.footerCategories}>
          <h4>Categorias</h4>
          <ul>
            <li><a href="#">Camisetas</a></li>
            <li><a href="#">Calças</a></li>
            <li><a href="#">Bonés</a></li>
            <li><a href="#">Headphones</a></li>
            <li><a href="#">Tênis</a></li>
          </ul>
        </div>

        <div className={styles.footerContact}>
          <h4>Contato</h4>
          <p>
            Av. Santos Dumont, 1510 - 1 andar - Aldeota, Fortaleza - CE, 60150-161<br /><br />
            (85) 3051-3411
          </p>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© 2025 Digital College</p>
      </div>
    </footer>
  )
}
