import React from 'react';
import { employees } from '../data/mockData';
import './UserProfile.css';

function UserProfile() {
  // Busca o usuário Hanni Pham dos dados mockados
  const user = employees.find(emp => emp.id === 0) || employees[0];

  // Determina a URL da foto: se é URL HTTP/HTTPS usa direto, se é caminho Windows converte, se é emoji mostra emoji
  const getPhotoUrl = () => {
    if (user.foto.startsWith('http://') || user.foto.startsWith('https://')) {
      return user.foto; // URL direta
    } else if (user.foto.startsWith('C:')) {
      return `file:///${user.foto.replace(/\\/g, '/')}`; // Caminho Windows
    } else if (user.foto.startsWith('👩') || user.foto.startsWith('👨')) {
      return null; // Emoji
    } else {
      return `/img/${user.foto.split('\\').pop()}`; // Caminho relativo
    }
  };

  const photoUrl = getPhotoUrl();

  return (
    <div className="user-profile-page">
      <h1 className="page-title">Meu Perfil</h1>
      
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar-large">
            {photoUrl ? (
              <img src={photoUrl} alt={user.nome} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
            ) : (
              <span style={{ fontSize: '50px' }}>{user.foto}</span>
            )}
          </div>
          <div className="profile-info">
            <h2 className="user-name">{user.nome}</h2>
            <p className="user-position">{user.cargo}</p>
            <p className="user-department">{user.departamento}</p>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-section">
            <h3 className="section-title">Informações Pessoais</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Email</label>
                <p>{user.email}</p>
              </div>
              <div className="detail-item">
                <label>Telefone</label>
                <p>{user.telefone}</p>
              </div>
              <div className="detail-item">
                <label>Data de Admissão</label>
                <p>{new Date(user.dataContratacao + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
              </div>
              <div className="detail-item">
                <label>Departamento</label>
                <p>{user.departamento}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

