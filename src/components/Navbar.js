import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

import { employees } from '../data/mockData';

function Navbar() {
  const location = useLocation();
  // Busca a foto da Hanni dos dados mockados
  const hanniUser = employees.find(emp => emp.id === 0) || employees[0];
  const hanniPhotoUrl = hanniUser.foto.startsWith('http://') || hanniUser.foto.startsWith('https://') 
    ? hanniUser.foto 
    : hanniUser.foto.startsWith('👩') || hanniUser.foto.startsWith('👨')
    ? null
    : `/img/${hanniUser.foto.split('\\').pop()}`;

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="logo-icon">▼</span>
        <span className="logo-text">HR</span>
      </div>
      <div className="navbar-links">
        <Link to="/" className={isActive('/') && location.pathname === '/' ? 'active' : ''}>
          Dashboard
        </Link>
        <Link to="/funcionarios" className={isActive('/funcionarios') ? 'active' : ''}>
          Funcionários
        </Link>
        <Link to="/ferias" className={isActive('/ferias') ? 'active' : ''}>
          Férias
        </Link>
        <Link to="/desempenho" className={isActive('/desempenho') ? 'active' : ''}>
          Desempenho
        </Link>
        <Link to="/relatorios" className={isActive('/relatorios') ? 'active' : ''}>
          Relatórios
        </Link>
      </div>
      <div className="navbar-user">
        <Link to="/perfil" className="user-avatar-link">
          <div className="user-avatar">
            {hanniPhotoUrl ? (
              <img src={hanniPhotoUrl} alt="Hanni Pham" />
            ) : (
              <span style={{ fontSize: '20px' }}>{hanniUser.foto}</span>
            )}
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

