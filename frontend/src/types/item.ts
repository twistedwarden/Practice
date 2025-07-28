export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: string;
  updatedAt: string;
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