import { Column } from '@/src/types/Column';
import { supabase } from '@/src/utils/supabaseClient';

export const fetchColumns = async (): Promise<Column[]> => {
  const { data, error } = await supabase
    .from('boardColumns')
    .select('*')
    .order('order', { ascending: true }); // Assuming an 'order' column for sorting

  if (error) {
    console.error('Error fetching board columns:', error);
    throw new Error('Failed to fetch board columns');
  }
  return data || [];
};

export const updateColumn = async (id: string, updates: Partial<Column>): Promise<Column> => {
  const { data, error } = await supabase
    .from('boardColumns')
    .update(updates)
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error updating column ${id}:`, error);
    throw new Error(`Failed to update column ${id}`);
  }
  if (!data) {
    throw new Error(`Column with id ${id} not found`);
  }
  return data;
};

export const createColumn = async (columnData: Omit<Column, 'id'>): Promise<Column> => {
  const { data, error } = await supabase
    .from('boardColumns')
    .insert([{ ...columnData }])
    .single();

  if (error) {
    console.error('Error creating column:', error);
    throw new Error('Failed to create column');
  }
  return data;
};

export const deleteColumn = async (id: string): Promise<void> => {
  const { error } = await supabase.from('boardColumns').delete().eq('id', id);

  if (error) {
    console.error(`Error deleting column ${id}:`, error);
    throw new Error(`Failed to delete column ${id}`);
  }
};