import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../services/apiService';

function ApiDataList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función interna para obtener datos
  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message || 'Ocurrió un error inesperado al cargar la API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 1. Renderizado en estado de carga
  if (loading) {
    return <div className="status-message">Cargando datos de la API...</div>;
  }

  // 2. Renderizado en estado de error
  if (error) {
    return (
      <div className="status-message error">
        <p>Error: {error}</p>
        <button onClick={loadData}>Reintentar</button>
      </div>
    );
  }

  // 3. Renderizado principal con datos
  return (
    <div className="data-container">
      <h2>Lista de Usuarios desde API</h2>
      <button onClick={loadData} style={{ marginBottom: '15px' }}>
        Recargar Datos
      </button>

      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p><strong>Username:</strong> @{user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Compañía:</strong> {user.company?.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApiDataList;