import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { employees } from '../data/mockData';
import './EmployeeProfile.css';

function EmployeeProfile() {
  const { id } = useParams();
  const employee = employees.find(emp => emp.id === parseInt(id));

  if (!employee) {
    return <div>Funcionário não encontrado</div>;
  }

  return (
    <div className="employee-profile">
      <h1 className="page-title">Perfil do funcionário</h1>
      <p className="page-subtitle">Visualizar e gerenciar informações dos funcionários</p>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar-large">{employee.foto}</div>
          <div className="profile-info">
            <h2 className="employee-name">{employee.nome}</h2>
            <p className="employee-position">{employee.cargo}</p>
            <p className="employee-dates">
              Iniciou: {new Date(employee.dataContratacao + 'T00:00:00').toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })} | Status: {employee.status}
            </p>
          </div>
          <Link to={`/funcionarios/cadastro?edit=${employee.id}`} className="edit-profile-btn">
            Editar perfil
          </Link>
        </div>
      </div>

      <div className="info-section">
        <h3 className="section-title">Informações de contato</h3>
        <div className="contact-info">
          <div className="info-item">
            <label>Email</label>
            <p>{employee.email}</p>
          </div>
          <div className="info-item">
            <label>Telefone</label>
            <p>{employee.telefone}</p>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h3 className="section-title">Departamento</h3>
        <p className="department-name">{employee.departamento}</p>
      </div>

      <div className="info-section">
        <h3 className="section-title">Ações</h3>
        <div className="actions-buttons">
          <button className="action-btn">Controle de férias</button>
          <button className="action-btn">Ver histórico salarial</button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProfile;

