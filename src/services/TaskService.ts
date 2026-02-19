import { Task } from '@/src/types/Task';
import { supabase } from '@/src/utils/supabaseClient';

export const fetchTasks = async (): Promise<Task[]> => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('createdAt', { ascending: true });

  if (error) {
    console.error('Error fetching tasks:', error);
    throw new Error('Failed to fetch tasks');
  }
  return data || [];
};

export const updateTask = async (id: string, updates: Partial<Task>): Promise<Task> => {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .single(); // Use single() to get one row or null

  if (error) {
    console.error(`Error updating task ${id}:`, error);
    throw new Error(`Failed to update task ${id}`);
  }

  if (!data) {
    throw new Error(`Task with id ${id} not found`);
  }

  return data;
};

// Placeholder for other task related functions like createTask, deleteTask etc.
export const createTask = async (taskData: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
  const { data, error } = await supabase
    .from('tasks')
    .insert([{ ...taskData, createdAt: new Date().toISOString() }])
    .single();

  if (error) {
    console.error('Error creating task:', error);
    throw new Error('Failed to create task');
  }
  return data;
};

export const deleteTask = async (id: string): Promise<void> => {
  const { error } = await supabase.from('tasks').delete().eq('id', id);

  if (error) {
    console.error(`Error deleting task ${id}:`, error);
    throw new Error(`Failed to delete task ${id}`);
  }
};