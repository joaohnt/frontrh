import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import EmployeeProfile from './pages/EmployeeProfile';
import EmployeeRegister from './pages/EmployeeRegister';
import Vacations from './pages/Vacations';
import Reports from './pages/Reports';
import ChangeHistory from './pages/ChangeHistory';
import PerformanceEvaluation from './pages/PerformanceEvaluation';
import UserProfile from './pages/UserProfile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/funcionarios" element={<Employees />} />
            <Route path="/funcionarios/:id" element={<EmployeeProfile />} />
            <Route path="/funcionarios/cadastro" element={<EmployeeRegister />} />
            <Route path="/ferias" element={<Vacations />} />
            <Route path="/relatorios" element={<Reports />} />
            <Route path="/historico" element={<ChangeHistory />} />
            <Route path="/desempenho" element={<PerformanceEvaluation />} />
            <Route path="/perfil" element={<UserProfile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

