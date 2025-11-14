// // app/admin/inquiries/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';

// interface Inquiry {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   company: string;
//   message: string;
//   status: string;
//   createdAt: string;
//   source: string;
// }

// export default function InquiriesAdminPage() {
//   const [inquiries, setInquiries] = useState<Inquiry[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     fetchInquiries();
//   }, [statusFilter]);

//   const fetchInquiries = async () => {
//     try {
//       const url = statusFilter === 'all' 
//         ? '/api/chatbot/inquiries'
//         : `/api/chatbot/inquiries?status=${statusFilter}`;
      
//       const response = await fetch(url);
//       const data = await response.json();
      
//       if (data.success) {
//         setInquiries(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching inquiries:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateStatus = async (inquiryId: string, newStatus: string) => {
//     try {
//       const response = await fetch(`/api/chatbot/inquiries/${inquiryId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ status: newStatus }),
//       });

//       if (response.ok) {
//         fetchInquiries(); // Refresh the list
//       }
//     } catch (error) {
//       console.error('Error updating status:', error);
//     }
//   };

//   const truncateMessage = (message: string, maxLength: number = 20): string => {
//     if (!message) return 'N/A';
//     if (message.length <= maxLength) return message;
//     return message.substring(0, maxLength) + '...';
//   };

//   const handleMessageClick = (inquiry: Inquiry) => {
//     setSelectedInquiry(inquiry);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedInquiry(null);
//   };

//   if (loading) return <div className="p-8">Loading inquiries...</div>;

//   return (
//     <div className="p-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Chatbot Inquiries</h1>
        
//         <select 
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="border rounded-lg px-4 py-2"
//         >
//           <option value="all">All Status</option>
//           <option value="new_inquiry">New</option>
//           <option value="contacted">Contacted</option>
//           <option value="converted">Converted</option>
//           <option value="closed">Closed</option>
//         </select>
//       </div>

//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Query</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {inquiries.map((inquiry) => (
//               <tr key={inquiry.id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="font-medium text-gray-900">{inquiry.name}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-gray-900">{inquiry.email}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-gray-900">{inquiry.phone || 'N/A'}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-gray-900">{inquiry.company || 'N/A'}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <button
//                     onClick={() => handleMessageClick(inquiry)}
//                     className="text-left text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
//                     title="Click to view full message"
//                   >
//                     {truncateMessage(inquiry.message)}
//                   </button>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                     inquiry.status === 'new_inquiry' ? 'bg-blue-100 text-blue-800' :
//                     inquiry.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
//                     inquiry.status === 'converted' ? 'bg-green-100 text-green-800' :
//                     'bg-gray-100 text-gray-800'
//                   }`}>
//                     {inquiry.status.replace('_', ' ')}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {new Date(inquiry.createdAt).toLocaleDateString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
        
//         {inquiries.length === 0 && (
//           <div className="text-center py-8 text-gray-500">
//             No inquiries found
//           </div>
//         )}
//       </div>

//       {/* Message Detail Modal */}
//       {isModalOpen && selectedInquiry && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
//             <div className="flex justify-between items-center p-6 border-b">
//               <h2 className="text-xl font-semibold">Message Details</h2>
//               <button
//                 onClick={closeModal}
//                 className="text-gray-500 hover:text-gray-700 text-2xl"
//               >
//                 &times;
//               </button>
//             </div>
            
//             <div className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
              
              
//               <div>
//                 <label className="text-sm font-medium text-gray-500">Full Message</label>
//                 <div className="mt-2 p-4 bg-gray-50 rounded-lg whitespace-pre-wrap">
//                   {selectedInquiry.message || 'No message provided'}
//                 </div>
//               </div>
//             </div>
            
//             <div className="flex justify-end gap-3 p-6 border-t">
//               <button
//                 onClick={closeModal}
//                 className="px-4 py-2 text-gray-600 hover:text-gray-800"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// app/admin/inquiries/page.tsx
'use client';

import { useState, useEffect } from 'react';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  status: string;
  createdAt: string;
  source: string;
}

export default function InquiriesAdminPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

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
    setUpdatingStatus(inquiryId);
    try {
      const response = await fetch(`/api/chatbot/inquiries/${inquiryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update the inquiry in the local state
        setInquiries(prevInquiries =>
          prevInquiries.map(inquiry =>
            inquiry.id === inquiryId
              ? { ...inquiry, status: newStatus }
              : inquiry
          )
        );
        
        // If modal is open and it's the same inquiry, update it
        if (selectedInquiry && selectedInquiry.id === inquiryId) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus });
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status. Please try again.');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const truncateMessage = (message: string, maxLength: number = 20): string => {
    if (!message) return 'N/A';
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

  const handleMessageClick = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInquiry(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new_inquiry':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'converted':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Query</th>
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
                  <button
                    onClick={() => handleMessageClick(inquiry)}
                    className="text-left text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                    title="Click to view full message"
                  >
                    {truncateMessage(inquiry.message)}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(inquiry.status)}`}>
                    {inquiry.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(inquiry.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={inquiry.status}
                    onChange={(e) => updateStatus(inquiry.id, e.target.value)}
                    disabled={updatingStatus === inquiry.id}
                    className={`text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      updatingStatus === inquiry.id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    }`}
                  >
                    <option value="new_inquiry">New</option>
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

      {/* Message Detail Modal */}
      {isModalOpen && selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">Message Details</h2>
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
                  <div className="mt-1 text-gray-900">{selectedInquiry.name}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <div className="mt-1 text-gray-900">{selectedInquiry.email}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <div className="mt-1 text-gray-900">{selectedInquiry.phone || 'N/A'}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Company</label>
                  <div className="mt-1 text-gray-900">{selectedInquiry.company || 'N/A'}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1">
                    <select
                      value={selectedInquiry.status}
                      onChange={(e) => updateStatus(selectedInquiry.id, e.target.value)}
                      disabled={updatingStatus === selectedInquiry.id}
                      className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        updatingStatus === selectedInquiry.id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                      }`}
                    >
                      <option value="new_inquiry">New Inquiry</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Date</label>
                  <div className="mt-1 text-gray-900">
                    {new Date(selectedInquiry.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Full Message</label>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg whitespace-pre-wrap">
                  {selectedInquiry.message || 'No message provided'}
                </div>
              </div>
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