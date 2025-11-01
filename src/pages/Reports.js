import React, { useState } from 'react';
import { employees } from '../data/mockData';
import './Reports.css';

function Reports() {
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [reportFormat, setReportFormat] = useState('');

  const filteredEmployees = employees.filter(emp => {
    if (statusFilter === 'Todos') return true;
    return emp.status === statusFilter;
  });

  const handleGenerateReport = () => {
    console.log('Gerando relatório...');
    alert('Relatório gerado com sucesso!');
  };

  const handleVisualize = () => {
    console.log('Visualizando relatório...');
  };

  const handlePrintPDF = () => {
    console.log('Imprimindo PDF...');
    window.print();
  };

  return (
    <div className="reports-page">
      <div className="reports-header">
        <h1 className="page-title">Relatórios de Funcionários</h1>
        <button className="export-pdf-btn" onClick={handlePrintPDF}>Exportar PDF</button>
      </div>

      <div className="status-filters">
        <button
          className={`status-filter-btn ${statusFilter === 'Todos' ? 'active' : ''}`}
          onClick={() => setStatusFilter('Todos')}
        >
          Todos
        </button>
        <button
          className={`status-filter-btn ${statusFilter === 'Ativo' ? 'active' : ''}`}
          onClick={() => setStatusFilter('Ativo')}
        >
          Ativos
        </button>
        <button
          className={`status-filter-btn ${statusFilter === 'Inativo' ? 'active' : ''}`}
          onClick={() => setStatusFilter('Inativo')}
        >
          Inativos
        </button>
      </div>

      <div className="report-controls">
        <div className="format-section">
          <label className="format-label">Formato</label>
          <input
            type="text"
            value={reportFormat}
            onChange={(e) => setReportFormat(e.target.value)}
            className="format-input"
            placeholder="Ex: PDF, Excel, etc."
          />
        </div>
        <div className="report-buttons">
          <button className="btn btn-primary" onClick={handleGenerateReport}>
            Gerar Relatório
          </button>
          <button className="btn btn-secondary" onClick={handleVisualize}>
            Visualizar
          </button>
          <button className="btn btn-secondary" onClick={handlePrintPDF}>
            Imprimir PDF
          </button>
        </div>
      </div>

      <div className="reports-table-container">
        <table className="reports-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cargo</th>
              <th>Data de Admissão</th>
              <th>Salário</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.nome}</td>
                <td>{employee.cargo}</td>
                <td>{employee.dataContratacao}</td>
                <td>R$ {employee.salario.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                <td>
                  <span className={`status-badge ${employee.status.toLowerCase()}`}>
                    {employee.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;

