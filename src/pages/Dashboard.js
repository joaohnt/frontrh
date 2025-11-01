import React from 'react';
import { getAverageSalary, getSalaryByDepartment, getSalaryStats, employees } from '../data/mockData';
import './Dashboard.css';

function Dashboard() {
  const avgSalary = getAverageSalary();
  const salaryByDept = getSalaryByDepartment();
  const stats = getSalaryStats();

  // Dados para o gráfico de evolução do salário médio (últimos 6 meses) - ajustado para ter pico no 3º mês
  const monthlySalaries = [
    6500,  // 6 meses
    6800,  // 5 meses
    7200,  // 4 meses
    8000,  // 3 meses (pico)
    7600,  // 2 meses
    parseFloat(avgSalary)  // Atual
  ];
  const maxSalary = Math.max(...monthlySalaries);
  const minSalary = Math.min(...monthlySalaries);
  const range = maxSalary - minSalary;

  return (
    <div className="dashboard">
      <h1 className="page-title">Salário Médio dos Funcionários</h1>
      
      <div className="dashboard-main">
        <div className="chart-container">
          <div className="chart-wrapper">
            <div className="chart-bars">
              {monthlySalaries.map((salary, index) => {
                const normalizedHeight = ((salary - minSalary) / range) * 75 + 25; // Entre 25% e 100%
                const labels = ['6 meses', '5 meses', '4 meses', '3 meses', '2 meses', 'Atual'];
                return (
                  <div key={index} className="bar-wrapper">
                    <div className="chart-bar" style={{ height: `${normalizedHeight}%` }}></div>
                    <div className="bar-label">{labels[index]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="salary-display">
          <div className="salary-value">R$ {parseFloat(avgSalary).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
          <div className="salary-label">Salário Médio Total</div>
        </div>
      </div>

      <div className="department-section">
        <h2 className="section-title">Distribuição por Departamento</h2>
        <h3 className="subsection-title">Salário Médio por Departamento</h3>
        <div className="department-list">
          {salaryByDept.map((dept, index) => {
            const maxSalary = Math.max(...salaryByDept.map(d => parseFloat(d.salarioMedio)));
            const barWidth = (parseFloat(dept.salarioMedio) / maxSalary) * 100;
            return (
              <div key={index} className="department-item">
                <span className="department-name">{dept.departamento}</span>
                <div className="department-bar-container">
                  <div className="department-bar" style={{ width: `${barWidth}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="indicators-section">
        <h2 className="section-title">Indicadores Adicionais</h2>
        <div className="indicators-grid">
          <div className="indicator-card">
            <div className="indicator-label">Total de Funcionários</div>
            <div className="indicator-value">{stats.totalFuncionarios}</div>
          </div>
          <div className="indicator-card">
            <div className="indicator-label">Variação Percentual</div>
            <div className="indicator-value positive">{stats.variacaoPercentual}</div>
          </div>
          <div className="indicator-card">
            <div className="indicator-label">Maior Salário</div>
            <div className="indicator-value">R$ {stats.maior.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
          </div>
          <div className="indicator-card">
            <div className="indicator-label">Menor Salário</div>
            <div className="indicator-value">R$ {stats.menor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <h2 className="section-title">Filtros</h2>
        <div className="filters">
          <div className="filter-group">
            <label>Departamento</label>
            <select className="filter-select">
              <option>Todos</option>
              {salaryByDept.map((dept, index) => (
                <option key={index}>{dept.departamento}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Status</label>
            <select className="filter-select">
              <option>Ativo/Inativo</option>
              <option>Ativo</option>
              <option>Inativo</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

