import { Item, CreateItemRequest, UpdateItemRequest } from '../types/item';
import axios from 'axios';

const API_URL = '/api/items';

export const itemService = {
  // Get all items
  async getItems(): Promise<Item[]> {
    const response = await axios.get(API_URL);
      // Normalize to always return an array
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (Array.isArray(response.data.data)) {
        return response.data.data;
      } else {
        return [];
      }
  },

  // Get item by ID
  async getItem(id: number): Promise<Item | null> {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  // Create new item
  async createItem(item: CreateItemRequest): Promise<Item> {
    const response = await axios.post(API_URL, item);
    return response.data;
  },

  // Update existing item
  async updateItem(id: number | string, item: UpdateItemRequest): Promise<Item> {
    const response = await axios.put(`${API_URL}/${id}`, item);
    return response.data;
  },

  // Delete item
  async deleteItem(id: number): Promise<void> {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
};