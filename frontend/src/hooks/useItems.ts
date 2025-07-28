import { useState, useEffect } from 'react';
import { Item, CreateItemRequest, UpdateItemRequest } from '../types/item';
import { itemService } from '../services/itemService';

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedItems = await itemService.getItems();
      setItems(fetchedItems);
    } catch (err) {
      setError('Failed to fetch items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (data: CreateItemRequest): Promise<void> => {
    try {
      const newItem = await itemService.createItem(data);
      setItems(prev => [...prev, newItem]);
    } catch (err) {
      throw new Error('Failed to create item');
    }
  };

  const updateItem = async (data: UpdateItemRequest): Promise<void> => {
    try {
      const updatedItem = await itemService.updateItem(data.id, data);
      setItems(prev => 
        prev.map(item => item.id === updatedItem.id ? updatedItem : item)
      );
    } catch (err) {
      throw new Error('Failed to update item');
    }
  };

  const deleteItem = async (id: number): Promise<void> => {
    try {
      await itemService.deleteItem(id);
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      throw new Error('Failed to delete item');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    items,
    loading,
    error,
    createItem,
    updateItem,
    deleteItem,
    refetch: fetchItems
  };
};