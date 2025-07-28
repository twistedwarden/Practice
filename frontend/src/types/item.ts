export interface Item {
  id: number;
  name: string;
  description?: string;
  price: number;
  category: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface CreateItemRequest {
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface UpdateItemRequest extends CreateItemRequest {
  id: number;
}