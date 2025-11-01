import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { employees } from '../data/mockData';
import './EmployeeRegister.css';

function EmployeeRegister() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const isEdit = !!editId;
  
  const existingEmployee = editId ? employees.find(emp => emp.id === parseInt(editId)) : null;

  const [formData, setFormData] = useState({
    nome: existingEmployee?.nome || '',
    cargo: existingEmployee?.cargo || '',
    departamento: existingEmployee?.departamento || '',
    dataContratacao: existingEmployee?.dataContratacao || '',
    status: existingEmployee?.status || 'Ativo'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusToggle = (status) => {
    setFormData(prev => ({
      ...prev,
      status
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você salvaria os dados
    console.log('Salvando:', formData);
    navigate('/funcionarios');
  };

  const handleCancel = () => {
    navigate('/funcionarios');
  };

  return (
    <div className="register-page">
      <div className="register-header">
        <Link to="/funcionarios" className="go-to-list-btn">
          Ir para a lista
        </Link>
      </div>
      <h1 className="page-title">Cadastro</h1>

      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="nome">Nome completo</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cargo">Cargo</label>
          <input
            type="text"
            id="cargo"
            name="cargo"
            value={formData.cargo}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="departamento">Departamento</label>
          <input
            type="text"
            id="departamento"
            name="departamento"
            value={formData.departamento}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dataContratacao">Data de contratação</label>
          <input
            type="date"
            id="dataContratacao"
            name="dataContratacao"
            value={formData.dataContratacao}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="status-buttons">
          <button
            type="button"
            onClick={() => handleStatusToggle('Ativo')}
            className={`status-btn ${formData.status === 'Ativo' ? 'active' : ''}`}
          >
            Ativar
          </button>
          <button
            type="button"
            onClick={() => handleStatusToggle('Inativo')}
            className={`status-btn ${formData.status === 'Inativo' ? 'active' : ''}`}
          >
            Desativar
          </button>
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleCancel} className="btn btn-cancel">
            Cancelar
          </button>
          <button type="submit" className="btn btn-save">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeRegister;

