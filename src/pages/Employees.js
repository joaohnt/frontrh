import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { employees, departments, positions } from '../data/mockData';
import './Employees.css';

function Employees() {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('Todos');
  const [departmentFilter, setDepartmentFilter] = useState('Todos');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.cargo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = positionFilter === 'Todos' || emp.cargo === positionFilter;
    const matchesDepartment = departmentFilter === 'Todos' || emp.departamento === departmentFilter;
    return matchesSearch && matchesPosition && matchesDepartment;
  });

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="employees-page">
      <h1 className="page-title">Funcionários registrados</h1>
      
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

      <div className="filters-row">
        <select
          value={positionFilter}
          onChange={(e) => setPositionFilter(e.target.value)}
          className="filter-select"
        >
          {positions.map((pos, index) => (
            <option key={index} value={pos}>{pos}</option>
          ))}
        </select>
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="filter-select"
        >
          {departments.map((dept, index) => (
            <option key={index} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      <div className="employees-table-container">
        <table className="employees-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Posição</th>
              <th>Departamento</th>
              <th>Contratação</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEmployees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.nome}</td>
                <td>{employee.cargo}</td>
                <td>{employee.departamento}</td>
                <td>{employee.dataContratacao}</td>
                <td>
                  <span className={`status-badge ${employee.status.toLowerCase()}`}>
                    {employee.status}
                  </span>
                </td>
                <td className="actions-cell">
                  <Link to={`/funcionarios/${employee.id}`} className="action-link">View Details</Link>
                  <span className="action-separator"> | </span>
                  <Link to={`/funcionarios/${employee.id}`} className="action-link">Edit</Link>
                  <span className="action-separator"> | </span>
                  <button className="action-link">Deactivate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          ‹
        </button>
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }
          return (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
            >
              {pageNum}
            </button>
          );
        })}
        {totalPages > 5 && (
          <>
            <span>...</span>
            <button
              onClick={() => setCurrentPage(totalPages)}
              className="pagination-btn"
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default Employees;

