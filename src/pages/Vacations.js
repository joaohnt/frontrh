import React, { useState } from 'react';
import { vacations } from '../data/mockData';
import './Vacations.css';

function Vacations() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVacations = vacations.filter(vacation =>
    vacation.funcionario.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusClass = (status) => {
    switch (status) {
      case 'Concluída':
        return 'concluida';
      case 'Em andamento':
        return 'andamento';
      case 'Pendente':
        return 'pendente';
      default:
        return '';
    }
  };

  return (
    <div className="vacations-page">
      <div className="vacations-header">
        <h1 className="page-title">Gestão de férias</h1>
        <button className="add-vacation-btn">Adicionar férias...</button>
      </div>

      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="vacations-table-container">
        <table className="vacations-table">
          <thead>
            <tr>
              <th>Funcionário</th>
              <th>Data Início</th>
              <th>Data Fim</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVacations.map((vacation) => (
              <tr key={vacation.id}>
                <td>{vacation.funcionario}</td>
                <td>{vacation.dataInicio}</td>
                <td>{vacation.dataFim}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(vacation.status)}`}>
                    {vacation.status}
                  </span>
                </td>
                <td className="actions-cell">
                  <button className="action-link">Edit</button>
                  <span className="action-separator"> | </span>
                  <button className="action-link">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Vacations;

