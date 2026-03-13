import { useEffect, useState } from 'react';

export const useGlobalTimer = (updatedAt: number) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - updatedAt) / 1000));
    }, 10000); 

    return () => clearInterval(interval);
  }, [updatedAt]); 
  return elapsed;
};