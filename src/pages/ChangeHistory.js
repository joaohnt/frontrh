import React, { useState } from 'react';
import { changeHistory } from '../data/mockData';
import './ChangeHistory.css';

function ChangeHistory() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = changeHistory.filter(change =>
    change.funcionario.toLowerCase().includes(searchTerm.toLowerCase()) ||
    change.campoAlterado.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportPDF = () => {
    console.log('Exportando PDF...');
    alert('PDF exportado com sucesso!');
  };

  return (
    <div className="change-history-page">
      <div className="history-header">
        <h1 className="page-title">Histórico de Alterações</h1>
        <button className="export-pdf-btn" onClick={handleExportPDF}>Exportar PDF</button>
      </div>

      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Pesquisar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="history-table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th>Data/Hora</th>
              <th>Funcionário</th>
              <th>Campo Alterado</th>
              <th>Valor Antigo</th>
              <th>Valor Novo</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((change) => (
              <tr key={change.id}>
                <td>{change.dataHora}</td>
                <td>{change.funcionario}</td>
                <td>{change.campoAlterado}</td>
                <td>{change.valorAntigo}</td>
                <td>{change.valorNovo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ChangeHistory;

