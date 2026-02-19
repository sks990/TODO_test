import { useState, useEffect, useCallback } from 'react';
import { Column } from '@/src/types/Column';
import { fetchColumns } from '@/src/services/BoardColumnService';

export const useBoardColumns = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadColumns = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedColumns = await fetchColumns();
      setColumns(fetchedColumns);
    } catch (err) {
      console.error('Failed to fetch columns:', err);
      setError('Failed to load columns.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadColumns();
  }, [loadColumns]);

  return { columns, loading, error, refetch: loadColumns };
};