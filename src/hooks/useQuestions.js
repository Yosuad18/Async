import { useState, useEffect } from 'react';
import { getQuestions } from '../services/questionService';

export function useQuestions() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getQuestions();
      setData(result);
    } catch (err) {
      setError(err.message || 'Error al cargar las preguntas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getQuestions();
        if (!controller.signal.aborted) {
          setData(result);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message || 'Error al cargar las preguntas.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  return { data, loading, error, refetch: fetchQuestions };
}
