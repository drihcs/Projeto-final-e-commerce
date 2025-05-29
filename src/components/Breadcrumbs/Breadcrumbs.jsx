import React from 'react';
import { useLocation, Link } from 'react-router-dom'; // Importe useLocation e Link
import styles from './Breadcrumbs.module.css';
import { FaChevronRight } from 'react-icons/fa';

function Breadcrumbs() {
  const location = useLocation(); // Hook para pegar a localização atual
  const pathnames = location.pathname.split('/').filter(x => x); // Divide a URL e remove vazios

  // Função para "humanizar" o texto do breadcrumb (opcional, mas útil)
  const formatBreadcrumbText = (text) => {
    // Ex: "nike-revolution-6" para "Nike Revolution 6"
    return text
      .replace(/-/g, ' ') // Substitui hífens por espaços
      .split(' ') // Divide em palavras
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza a primeira letra de cada palavra
      .join(' '); // Junta as palavras novamente
  };

  return (
    <nav className={styles.breadcrumbs}>
      <ul>
        <li>
          <Link to="/">Home</Link> {/* Sempre comece com Home */}
          {pathnames.length > 0 && <FaChevronRight className={styles.separator} />}
        </li>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const breadcrumbText = formatBreadcrumbText(value); // Formata o texto

          return (
            <li key={to}>
              {last ? (
                <span className={styles.activeLink}>{breadcrumbText}</span> // Último item não é um link
              ) : (
                <Link to={to}>{breadcrumbText}</Link> // Itens intermediários são links
              )}
              {!last && <FaChevronRight className={styles.separator} />}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Breadcrumbs;