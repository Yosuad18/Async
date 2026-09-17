import { useQuestions } from '../hooks/useQuestions';
import { saveQuestion } from '../services/questionService';
import { useState } from 'react';

function ApiDataList() {
  const { data: questions, loading, error, refetch } = useQuestions();
  const [questionText, setQuestionText] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    setSaving(true);
    try {
      await saveQuestion({ text: questionText.trim() });
      setQuestionText('');
      refetch();
    } catch (err) {
      console.error('Error al guardar:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="status-message">Cargando preguntas...</div>;
  }

  if (error) {
    return (
      <div className="status-message error">
        <p>Error: {error}</p>
        <button onClick={refetch}>Reintentar</button>
      </div>
    );
  }

  return (
    <div className="data-container">
      <h2>Mis Preguntas</h2>

      <form onSubmit={handleSave} style={{ marginBottom: '15px' }}>
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Escribe una pregunta..."
          disabled={saving}
        />
        <button type="submit" disabled={saving || !questionText.trim()}>
          {saving ? 'Guardando...' : 'Guardar'}
        </button>
      </form>

      <button onClick={refetch} style={{ marginBottom: '15px' }}>
        Recargar
      </button>

      <ul className="user-list">
        {questions.map((q) => (
          <li key={q.id} className="user-card">
            <p>{q.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApiDataList;
