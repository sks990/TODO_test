import { useState, useEffect, useCallback } from 'react';
import { Task } from '@/src/types/Task';
import { fetchTasks, updateTask } from '@/src/services/TaskService';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      setError('Failed to load tasks.');
    } finally {
      setLoading(false);
    }
  }, []);

  const moveTask = useCallback(async (taskId: string, targetColumnId: string) => {
    setLoading(true);
    setError(null);
    try {
      const updatedTask = await updateTask(taskId, { boardColumnId: targetColumnId });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (err) {
      console.error('Failed to move task:', err);
      setError('Failed to move task.');
      // Revert local state if update fails
      loadTasks();
    } finally {
      setLoading(false);
    }
  }, [loadTasks]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return { tasks, loading, error, moveTask, refetch: loadTasks };
};