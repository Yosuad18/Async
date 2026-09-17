import axiosClient from '../api/axiosClient';

export const saveQuestion = async (questionData) => {
  try {
    const response = await axiosClient.post('/questions', questionData);
    return response.data;
  } catch (error) {
    console.error('Error al guardar la pregunta:', error);
    throw error;
  }
};

export const getQuestions = async () => {
  try {
    const response = await axiosClient.get('/questions');
    return response.data;
  } catch (error) {
    console.error('Error al obtener preguntas:', error);
    throw error;
  }
};
