import React, { useState } from 'react';
import { performanceEvaluations, employees } from '../data/mockData';
import './PerformanceEvaluation.css';

function PerformanceEvaluation() {
  const [formData, setFormData] = useState({
    funcionario: '',
    periodo: '',
    avaliador: '',
    comentarios: ''
  });

  const evaluation = performanceEvaluations[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Salvando avaliação...', formData);
    alert('Avaliação salva com sucesso!');
  };

  const handleViewPrevious = () => {
    console.log('Visualizando avaliações anteriores...');
  };

  const handleSendFeedback = () => {
    console.log('Enviando feedback...');
    alert('Feedback enviado com sucesso!');
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Atingida':
        return 'atingida';
      case 'Em andamento':
        return 'andamento';
      case 'Não atingida':
        return 'nao-atingida';
      default:
        return '';
    }
  };

  return (
    <div className="performance-evaluation-page">
      <h1 className="page-title">Avaliação de Desempenho do Funcionário</h1>
      <p className="page-subtitle">
        Gerencie e avalie o desempenho dos funcionários de forma eficiente.
      </p>

      <form className="evaluation-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="funcionario">Funcionário</label>
            <input
              type="text"
              id="funcionario"
              name="funcionario"
              value={formData.funcionario}
              onChange={handleChange}
              className="form-input"
              placeholder="Selecione o funcionário"
            />
          </div>
          <div className="form-group">
            <label htmlFor="periodo">Período de Avaliação</label>
            <input
              type="text"
              id="periodo"
              name="periodo"
              value={formData.periodo}
              onChange={handleChange}
              className="form-input"
              placeholder="Ex: 2024-Q2"
            />
          </div>
          <div className="form-group">
            <label htmlFor="avaliador">Avaliador</label>
            <input
              type="text"
              id="avaliador"
              name="avaliador"
              value={formData.avaliador}
              onChange={handleChange}
              className="form-input"
              placeholder="Nome do avaliador"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="comentarios">Comentários</label>
          <textarea
            id="comentarios"
            name="comentarios"
            value={formData.comentarios}
            onChange={handleChange}
            className="form-textarea"
            rows="5"
            placeholder="Adicione comentários sobre a avaliação..."
          />
        </div>

        <div className="goals-section">
          <h2 className="section-title">Metas e Resultados</h2>
          <div className="goals-table">
            <div className="goals-header">
              <div className="goal-column">Descrição da Meta</div>
              <div className="status-column">Status</div>
              <div className="notes-column">Notas</div>
            </div>
            {evaluation?.metas.map((meta, index) => (
              <div key={index} className="goal-row">
                <div className="goal-column">{meta.descricao}</div>
                <div className="status-column">
                  <span className={`status-badge ${getStatusClass(meta.status)}`}>
                    {meta.status}
                  </span>
                </div>
                <div className="notes-column">{meta.notas}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="performance-score-section">
          <h2 className="section-title">Pontuação Geral de Desempenho</h2>
          <div className="score-container">
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${evaluation?.pontuacao || 0}%` }}
              ></div>
            </div>
            <div className="score-value">{evaluation?.pontuacao || 0}%</div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleSave} className="btn btn-primary">
            Salvar Avaliação
          </button>
          <button type="button" onClick={handleViewPrevious} className="btn btn-secondary">
            Ver Avaliações Anteriores
          </button>
          <button type="button" onClick={handleSendFeedback} className="btn btn-secondary">
            Enviar Feedback
          </button>
        </div>
      </form>
    </div>
  );
}

export default PerformanceEvaluation;

