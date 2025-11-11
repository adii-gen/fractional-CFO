'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  testimonial: string;
  clientName: string;
  clientInitials: string;
  designation: string;
  companyName: string;
  rating: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: Testimonial[];
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    testimonial: '',
    clientName: '',
    clientInitials: '',
    designation: '',
    companyName: '',
    rating: '5.0',
    order: 0,
    isActive: true
  });

  // Fetch testimonials
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/success-stories');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch testimonials: ${response.status}`);
      }
      
      const data: ApiResponse = await response.json();
      
      if (data.success && data.data) {
        setTestimonials(data.data);
      } else {
        throw new Error('Invalid data format from API');
      }
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setError(err instanceof Error ? err.message : 'Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'order' ? parseInt(value) || 0 : 
              name === 'rating' ? value : 
              name === 'isActive' ? value === 'true' : value
    }));
  };

  // Generate initials from client name
  const generateInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  };

  // Handle client name change (auto-generate initials)
  const handleClientNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      clientName: name,
      clientInitials: generateInitials(name)
    }));
  };

  // Start editing a testimonial
  const startEditing = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setFormData({ ...testimonial });
    setIsAddingNew(false);
  };

  // Start adding new testimonial
  const startAddingNew = () => {
    setIsAddingNew(true);
    setEditingId(null);
    setFormData({
      testimonial: '',
      clientName: '',
      clientInitials: '',
      designation: '',
      companyName: '',
      rating: '5.0',
      order: testimonials.length > 0 ? Math.max(...testimonials.map(t => t.order)) + 1 : 1,
      isActive: true
    });
  };

  // Cancel editing/adding
  const cancelEditing = () => {
    setEditingId(null);
    setIsAddingNew(false);
    setFormData({
      testimonial: '',
      clientName: '',
      clientInitials: '',
      designation: '',
      companyName: '',
      rating: '5.0',
      order: 0,
      isActive: true
    });
  };

  // Save testimonial (POST/PUT)
  const saveTestimonial = async () => {
    try {
      if (isAddingNew) {
        // POST request for new testimonial
        const response = await fetch('/api/success-stories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Failed to create testimonial: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.success) {
          await fetchTestimonials();
          cancelEditing();
        } else {
          throw new Error(result.error || 'Failed to create testimonial');
        }
      } else {
        // PUT request for updating testimonial
         const updateData = {
        id: editingId, // Send ID separately
        testimonial: formData.testimonial,
        clientName: formData.clientName,
        clientInitials: formData.clientInitials,
        designation: formData.designation,
        companyName: formData.companyName,
        rating: formData.rating,
        order: formData.order,
        isActive: formData.isActive
      };
        const response = await fetch('/api/success-stories', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
          updateData
          ),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Failed to update testimonial: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.success) {
          await fetchTestimonials();
          cancelEditing();
        } else {
          throw new Error(result.error || 'Failed to update testimonial');
        }
      }
    } catch (err) {
      console.error('Error saving testimonial:', err);
      setError(err instanceof Error ? err.message : 'Failed to save testimonial');
    }
  };

  // Delete testimonial
  const deleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }

    try {
      const response = await fetch(`/api/success-stories?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to delete testimonial: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        await fetchTestimonials();
      } else {
        throw new Error(result.error || 'Failed to delete testimonial');
      }
    } catch (err) {
      console.error('Error deleting testimonial:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete testimonial');
    }
  };

  // Toggle active status
  const toggleActive = async (testimonial: Testimonial) => {
    try {
         const updateData = {
      id: testimonial.id, // Send ID separately
      isActive: !testimonial.isActive
    };
      const response = await fetch('/api/success-stories', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to update testimonial: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        await fetchTestimonials();
      } else {
        throw new Error(result.error || 'Failed to update testimonial');
      }
    } catch (err) {
      console.error('Error updating testimonial:', err);
      setError(err instanceof Error ? err.message : 'Failed to update testimonial');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Testimonials Management</h1>
            <p className="text-gray-600">Loading testimonials...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Testimonials Management</h1>
          <button
            onClick={startAddingNew}
            disabled={isAddingNew || editingId !== null}
            className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-4 w-4" />
            Add New Testimonial
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
            <button 
              onClick={() => setError(null)}
              className="float-right text-red-800 hover:text-red-900"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Add/Edit Form */}
        {(isAddingNew || editingId) && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {isAddingNew ? 'Add New Testimonial' : 'Edit Testimonial'}
              </h2>
              <button
                onClick={cancelEditing}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Name *
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName || ''}
                  onChange={handleClientNameChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Initials *
                </label>
                <input
                  type="text"
                  name="clientInitials"
                  value={formData.clientInitials || ''}
                  onChange={handleInputChange}
                  maxLength={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 uppercase"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Designation *
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating *
                </label>
                <select
                  name="rating"
                  value={formData.rating || '5.0'}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="5.0">5.0 ★★★★★</option>
                  <option value="4.0">4.0 ★★★★☆</option>
                  <option value="3.0">3.0 ★★★☆☆</option>
                  <option value="2.0">2.0 ★★☆☆☆</option>
                  <option value="1.0">1.0 ★☆☆☆☆</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order *
                </label>
                <input
                  type="number"
                  name="order"
                  value={formData.order || 0}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="isActive"
                  value={formData.isActive?.toString() || 'true'}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Testimonial Text *
              </label>
              <textarea
                name="testimonial"
                value={formData.testimonial || ''}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
                placeholder="Enter the client's testimonial feedback..."
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={cancelEditing}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={saveTestimonial}
                disabled={!formData.clientName || !formData.testimonial || !formData.designation || !formData.companyName}
                className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4" />
                {isAddingNew ? 'Create' : 'Update'}
              </button>
            </div>
          </div>
        )}

        {/* Testimonials List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Testimonial
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {testimonials.map((testimonial) => (
                <tr key={testimonial.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-800 font-bold">
                        {testimonial.clientInitials}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {testimonial.clientName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {testimonial.designation}
                        </div>
                        <div className="text-xs text-gray-400">
                          {testimonial.companyName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-md line-clamp-2">
                      {testimonial.testimonial}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm text-gray-900">{testimonial.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {testimonial.order}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleActive(testimonial)}
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full cursor-pointer ${
                        testimonial.isActive
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {testimonial.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => startEditing(testimonial)}
                        className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTestimonial(testimonial.id)}
                        className="text-red-600 hover:text-red-900 flex items-center gap-1"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {testimonials.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">No testimonials found.</div>
              <button
                onClick={startAddingNew}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
              >
                Add Your First Testimonial
              </button>
            </div>
          )}
        </div>

        {/* Stats Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-2xl font-bold text-emerald-600">{testimonials.length}</div>
            <div className="text-sm text-gray-600">Total Testimonials</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-2xl font-bold text-green-600">
              {testimonials.filter(t => t.isActive).length}
            </div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-2xl font-bold text-red-600">
              {testimonials.filter(t => !t.isActive).length}
            </div>
            <div className="text-sm text-gray-600">Inactive</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-2xl font-bold text-yellow-600">
              {testimonials.length > 0 ? (testimonials.reduce((acc, t) => acc + parseFloat(t.rating), 0) / testimonials.length).toFixed(1) : '0.0'}
            </div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}