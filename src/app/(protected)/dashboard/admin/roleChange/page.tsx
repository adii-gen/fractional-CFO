// app/admin/inquiries/page.tsx
'use client';

import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  phone?: string;
  role: string;
  emailVerified: string | null;
  isActive: boolean;
  isVerified: boolean;
  pricePerMinute?: number | null;
  createdAt: string;
  updatedAt: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatingRole, setUpdatingRole] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

const fetchUsers = async () => {
  try {
    console.log('Fetching users...');
    const response = await fetch('/api/users');
    console.log('Response status:', response.status);
    
    const data = await response.json();
    console.log('Response data:', data);
    
    // Handle both array and object formats
    let usersArray;
    
    if (Array.isArray(data)) {
      usersArray = data; // Direct array
    } else if (Array.isArray(data.data)) {
      usersArray = data.data; // Wrapped in data property
    } else if (data.success && Array.isArray(data.data)) {
      usersArray = data.data; // Success wrapper
    } else {
      throw new Error('Unexpected API response format');
    }
    
    setUsers(usersArray);
    console.log('Users set successfully:', usersArray);
    
  } catch (error) {
    console.error('Error fetching users:', error);
    setError('Error loading users: ' + (error as Error).message);
  } finally {
    setLoading(false);
  }
};

  const updateUserRole = async (userId: string, newRole: string) => {
    setUpdatingRole(userId);
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user.id === userId
              ? { ...user, role: newRole }
              : user
          )
        );
        
        if (selectedUser && selectedUser.id === userId) {
          setSelectedUser({ ...selectedUser, role: newRole });
        }
        alert('Role updated successfully!');
      } else {
        alert('Failed to update role');
      }
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Failed to update role. Please try again.');
    } finally {
      setUpdatingRole(null);
    }
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'USER':
        return 'bg-blue-100 text-blue-800';
      case 'CONSULTANT':
        return 'bg-purple-100 text-purple-800';
      case 'ADMIN':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = roleFilter === 'all' 
    ? users 
    : users.filter(user => user.role === roleFilter);

  console.log('Filtered users:', filteredUsers);
  console.log('Total users:', users.length);

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center">
          <div className="text-xl">Loading users...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <button 
            onClick={fetchUsers}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-gray-600 mt-1">Total Users: {users.length}</p>
        </div>
        
        <select 
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="all">All Roles ({users.length})</option>
          <option value="USER">User ({users.filter(u => u.role === 'USER').length})</option>
          <option value="CONSULTANT">Consultant ({users.filter(u => u.role === 'CONSULTANT').length})</option>
          <option value="ADMIN">Admin ({users.filter(u => u.role === 'ADMIN').length})</option>
        </select>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr 
                key={user.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => handleUserClick(user)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900">{user.mobile || user.phone || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                  <select
                    value={user.role}
                    onChange={(e) => updateUserRole(user.id, e.target.value)}
                    disabled={updatingRole === user.id}
                    className={`text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      updatingRole === user.id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    }`}
                  >
                    <option value="USER">User</option>
                    <option value="CONSULTANT">Consultant</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredUsers.length === 0 && users.length > 0 && (
          <div className="text-center py-8 text-gray-500">
            No users found with role: {roleFilter}
          </div>
        )}
        
        {users.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No users found in database
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">User Details</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            
            <div className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <div className="mt-1 text-gray-900">{selectedUser.name}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <div className="mt-1 text-gray-900">{selectedUser.email}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <div className="mt-1 text-gray-900">{selectedUser.mobile || selectedUser.phone || 'N/A'}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email Verified</label>
                  <div className="mt-1">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      selectedUser.emailVerified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedUser.emailVerified ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Role</label>
                  <div className="mt-1">
                    <select
                      value={selectedUser.role}
                      onChange={(e) => updateUserRole(selectedUser.id, e.target.value)}
                      disabled={updatingRole === selectedUser.id}
                      className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        updatingRole === selectedUser.id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                      }`}
                    >
                      <option value="USER">User</option>
                      <option value="CONSULTANT">Consultant</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      selectedUser.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedUser.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Date Joined</label>
                  <div className="mt-1 text-gray-900">
                    {new Date(selectedUser.createdAt).toLocaleString()}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Updated</label>
                  <div className="mt-1 text-gray-900">
                    {new Date(selectedUser.updatedAt).toLocaleString()}
                  </div>
                </div>
              </div>
              
              {selectedUser.pricePerMinute !== null && selectedUser.pricePerMinute !== undefined && (
                <div className="pt-4 border-t">
                  <label className="text-sm font-medium text-gray-500">Price Per Minute</label>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                    ₹{selectedUser.pricePerMinute || 'Not Set'}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-3 p-6 border-t">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}