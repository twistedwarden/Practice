import { useState, useMemo } from 'react';
import { Package, Loader2, AlertCircle } from 'lucide-react';
import { ItemCard } from './ItemCard';
import { ItemForm } from './ItemForm';
import { DeleteConfirmation } from './DeleteConfirmation';
import { SearchAndFilter } from './SearchAndFilter';
import { useItems } from '../hooks/useItems';
import { Item, CreateItemRequest, UpdateItemRequest } from '../types/item';


function ItemManagement() {
    const { items, loading, error, createItem, updateItem, deleteItem } = useItems();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [deletingItem, setDeletingItem] = useState<Item | null>(null);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['Electronics', 'Home', 'Sports', 'Books', 'Clothing', 'Food', 'Other'];

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchTerm, selectedCategory]);

  const handleAddNew = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (data: CreateItemRequest | UpdateItemRequest) => {
    try {
      setIsFormLoading(true);
      
      if ('id' in data) {
        await updateItem(data);
      } else {
        await createItem(data);
      }
      
      setIsFormOpen(false);
      setEditingItem(null);
    } catch (err) {
      console.error(err);
      // In a real app, you'd show a toast notification
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    const item = items.find(item => item.id === id);
    if (item) {
      setDeletingItem(item);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingItem) return;
    
    try {
      setIsDeleteLoading(true);
      await deleteItem(deletingItem.id);
      setDeletingItem(null);
    } catch (err) {
      console.error(err);
      // In a real app, you'd show a toast notification
    } finally {
      setIsDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
          <span className="text-lg text-gray-600">Loading items...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-3 bg-orange-600 rounded-xl">
              <Package className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Item Management</h1>
              <p className="text-gray-600">Manage your inventory with ease</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onAddNew={handleAddNew}
          categories={categories}
        />

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm || selectedCategory ? 'No items found' : 'No items yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedCategory 
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by adding your first item'
              }
            </p>
            {!searchTerm && !selectedCategory && (
              <button
                onClick={handleAddNew}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors duration-200 font-medium"
              >
                Add Your First Item
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}

        {/* Form Modal */}
        <ItemForm
          item={editingItem}
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingItem(null);
          }}
          onSubmit={handleFormSubmit}
          isLoading={isFormLoading}
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmation
          isOpen={!!deletingItem}
          itemName={deletingItem?.name || ''}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingItem(null)}
          isLoading={isDeleteLoading}
        />
      </div>
    </div>
  );
}
export default ItemManagement;