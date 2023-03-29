import { useState, useEffect } from 'react';

const useCloudinary = (boat) => {
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/boat/cloud/${boat}`);
        const data = await res.json();
        setResponse(data);
      } catch (err) {
        console.log("error:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [boat]);

  return { isLoading, response, error };
};

export default useCloudinary;
