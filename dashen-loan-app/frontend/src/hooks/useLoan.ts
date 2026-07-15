import { useState } from 'react';

const useLoan = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return { result, setResult, loading, setLoading, error, setError };
};

export default useLoan;
