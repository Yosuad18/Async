import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // Estado para almacenar los usuarios obtenidos de la API
  const [usuarios, setUsuarios] = useState([]);

  // Estado para controlar la fase de carga (loading)
  const [cargando, setCargando] = useState(true);

  // Estado para capturar errores de la petición HTTP
  const [error, setError] = useState(null);

  // useEffect ejecuta la petición al montar el componente
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((respuesta) => {
        // Si la respuesta es exitosa, guardamos los datos
        setUsuarios(respuesta.data);
        setCargando(false);
      })
      .catch(() => {
        // Si falla la petición (red, CORS, status 4xx/5xx), mostramos error
        setError('No se pudo cargar la información de la API');
        setCargando(false);
      });
  }, []);

  // Renderizado condicional: mientras carga, mostramos mensaje
  if (cargando) return <p>Cargando usuarios...</p>;

  // Renderizado condicional: si hubo error, lo mostramos
  if (error) return <p>{error}</p>;

  // Renderizado principal: lista de usuarios
  return (
    <div className="App">
      <header className="App-header">
        <h1>Lista de usuarios</h1>
      </header>
      <main>
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario.id}>
              {usuario.name} — {usuario.email}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
