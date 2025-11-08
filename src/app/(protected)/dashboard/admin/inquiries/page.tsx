// app/admin/inquiries/page.tsx
'use client';

import { useState, useEffect } from 'react';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
  createdAt: string;
  source: string;
}

export default function InquiriesAdminPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter]);

  const fetchInquiries = async () => {
    try {
      const url = statusFilter === 'all' 
        ? '/api/chatbot/inquiries'
        : `/api/chatbot/inquiries?status=${statusFilter}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setInquiries(data.data);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (inquiryId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/chatbot/inquiries/${inquiryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchInquiries(); // Refresh the list
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) return <div className="p-8">Loading inquiries...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Chatbot Inquiries</h1>
        
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="all">All Status</option>
          <option value="new_inquiry">New</option>
          <option value="contacted">Contacted</option>
          <option value="converted">Converted</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{inquiry.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900">{inquiry.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900">{inquiry.phone || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900">{inquiry.company || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    inquiry.status === 'new_inquiry' ? 'bg-blue-100 text-blue-800' :
                    inquiry.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                    inquiry.status === 'converted' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {inquiry.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(inquiry.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <select
                    value={inquiry.status}
                    onChange={(e) => updateStatus(inquiry.id, e.target.value)}
                    className="text-sm border rounded px-2 py-1"
                  >
                    <option value="new_inquiry">New Inquiry</option>
                    <option value="contacted">Contacted</option>
                    <option value="converted">Converted</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {inquiries.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No inquiries found
          </div>
        )}
      </div>
    </div>
  );
}