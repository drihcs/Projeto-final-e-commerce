import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.css';
import { FaChevronRight } from 'react-icons/fa';

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Se estiver na Home (URL "/"), não renderiza o breadcrumb
  if (pathnames.length === 0) return null;

  const formatBreadcrumbText = (text) => {
    return text
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <nav className={styles.breadcrumbs}>
      <ul>
        <li>
          <Link to="/">Home</Link>
          {pathnames.length > 0 && <FaChevronRight className={styles.separator} />}
        </li>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const breadcrumbText = formatBreadcrumbText(value);

          return (
            <li key={to}>
              {last ? (
                <span className={styles.activeLink}>{breadcrumbText}</span>
              ) : (
                <Link to={to}>{breadcrumbText}</Link>
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
