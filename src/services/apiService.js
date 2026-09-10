// Servicio centralizado para peticiones a la API
const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users`);

    // Validar status HTTP
    if (!response.ok) {
      throw new Error(`Error HTTP status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};