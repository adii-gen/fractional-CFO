'use client'
import React, { useState, useEffect } from 'react';
import { Trash2, Plus, X, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';

// Define the Expertise type
interface Expertise {
  id: string;
  header: string;
  description: string;
  iconImage: string | null;
  order: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface FormData {
  header: string;
  description: string;
  iconImage: string;
  order: number;
}

export default function ExpertiseManager() {
  const [expertiseList, setExpertiseList] = useState<Expertise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    header: '',
    description: '',
    iconImage: '',
    order: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Fetch expertise entries
  const fetchExpertise = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/expertise');
      const data = await response.json();
      
      if (data.success) {
        setExpertiseList(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching expertise:', err);
      setError('Failed to load expertise entries');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load expertise entries',
        confirmButtonColor: '#2563eb'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExpertise();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'order' ? parseInt(value) || 0 : value
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    setError('');
    
    if (!formData.header.trim() || !formData.description.trim()) {
      setError('Header and description are required');
      Swal.fire({
        icon: 'warning',
        title: 'All fields are required',
        text: 'Header and description are required',
        confirmButtonColor: '#2563eb'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/expertise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setExpertiseList(prev => [...prev, data.data]);
        setShowModal(false);
        setFormData({ header: '', description: '', iconImage: '', order: 0 });
        
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Expertise created successfully',
          timer: 2000,
          showConfirmButton: false
        });
      } else {
        setError(data.error || 'Failed to create expertise entry');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.error || 'Failed to create expertise entry',
          confirmButtonColor: '#2563eb'
        });
      }
    } catch (err) {
      console.error('Error creating expertise:', err);
      setError('Failed to create expertise entry');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to create expertise entry',
        confirmButtonColor: '#2563eb'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/expertise/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setExpertiseList(prev => prev.filter(item => item.id !== id));
        
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Expertise has been deleted.',
          timer: 2000,
          showConfirmButton: false
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.error || 'Failed to delete expertise entry',
          confirmButtonColor: '#2563eb'
        });
      }
    } catch (err) {
      console.error('Error deleting expertise:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete expertise entry',
        confirmButtonColor: '#2563eb'
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">Expertise Manager</h1>
              <p className="text-slate-600">Manage your expertise entries</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus size={20} />
              Add Expertise
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && !showModal && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={48} />
          </div>
        ) : (
          /* Expertise List */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertiseList.length === 0 ? (
              <div className="col-span-full text-center py-20 bg-white rounded-2xl shadow-lg">
                <p className="text-slate-500 text-lg">No expertise entries yet. Add your first one!</p>
              </div>
            ) : (
              expertiseList.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 relative group"
                >
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="absolute top-4 right-4 p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>

                  {/* Icon */}
                  {item.iconImage && (
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                      <img 
                        src={item.iconImage} 
                        alt={item.header}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{item.header}</h3>
                  <p className="text-slate-600 mb-4 line-clamp-3">{item.description}</p>
                  
                  {/* Footer */}
                  <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-slate-100">
                    <span>Order: {item.order}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.isActive 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {item.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Add Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-slate-200">
                <h2 className="text-2xl font-bold text-slate-800">Add New Expertise</h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setError('');
                    setFormData({ header: '', description: '', iconImage: '', order: 0 });
                  }}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                {/* Header */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Header *
                  </label>
                  <input
                    type="text"
                    name="header"
                    value={formData.header}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g., Web Development"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Describe your expertise..."
                  />
                </div>

                {/* Icon Image URL */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Icon Image URL (optional)
                  </label>
                  <input
                    type="url"
                    name="iconImage"
                    value={formData.iconImage}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="https://example.com/icon.png"
                  />
                </div>

                {/* Order */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="0"
                    min="0"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setError('');
                      setFormData({ header: '', description: '', iconImage: '', order: 0 });
                    }}
                    className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus size={20} />
                        Create Expertise
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}