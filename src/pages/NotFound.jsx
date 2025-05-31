import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound-wrapper">
      <div className="error-container">
        <div className="error-icon">🔍</div>
        <div className="error-code">404</div>
        <h1 className="error-title">Oops! Página não encontrada</h1>
        <p className="error-message">
          Parece que você tentou acessar uma página que não existe. 
          Talvez ela tenha sido movida, renomeada ou você digitou o endereço incorretamente.
        </p>
        <div>
          <Link to="/" className="btn">Voltar ao Início</Link>
          <Link to="/sobre" className="btn btn-secondary">Sobre Nós</Link>
        </div>
        <div className="navigation-hint">
          <p>💡 Dica: Verifique se o endereço está correto ou use o menu de navegação</p>
        </div>
      </div>
    </div>
  );
}