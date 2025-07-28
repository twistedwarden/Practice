import React from 'react';
import { Edit, Trash2, Calendar } from 'lucide-react';
import { Item } from '../types/item';

interface ItemCardProps {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (id: number) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, onEdit, onDelete }) => {
  const formatDate = (dateString?: string | null): string => {
    if (!dateString) return 'N/A';

    // Attempt parsing MySQL datetime (e.g., "2025-07-28 19:03:53")
    const date = new Date(dateString.replace(' ', 'T'));

    if (isNaN(date.getTime())) return 'Invalid Date';

    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold text-orange-600">${item.price}</span>
          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
            {item.category}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center text-gray-500 text-sm">
          <Calendar className="w-4 h-4 mr-1" />
          {formatDate(item.updated_at)}
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(item)}
            className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200"
            title="Edit item"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            title="Delete item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};