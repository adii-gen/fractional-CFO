// 'use client'
// import React, { useState, useEffect } from 'react';
// import { Calendar, Clock, User, Mail, Phone, AlertCircle } from 'lucide-react';

// export default function ConsultationBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await fetch('/api/bookings');
      
//       if (!response.ok) {
//         throw new Error(`Error: ${response.status} ${response.statusText}`);
//       }
      
//       const data = await response.json();
//       setBookings(Array.isArray(data) ? data : data.bookings || []);
//                   console.log("ASdfasdf",data.booking);

//     } catch (err) {
//       setError(err.);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (dateString: string | number | Date) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const formatTime = (dateString: string | number | Date) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   const formatStatus = (status: string) => {
//     return status.toLowerCase().replace('_', ' ');
//   };

//   const getStatusColor = (status: any) => {
//     switch (status) {
//       case 'CONFIRMED':
//         return 'bg-green-100 text-green-800';
//       case 'PENDING':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'CANCELLED':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
//           <p className="mt-4 text-gray-600">Loading bookings...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 flex items-center justify-center">
//         <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
//           <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
//           <h2 className="text-xl font-bold text-gray-800 text-center mb-2">Error Loading Bookings</h2>
//           <p className="text-gray-600 text-center mb-4">{error}</p>
//           <button
//             onClick={fetchBookings}
//             className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-gray-800 mb-2">Consultation Bookings</h1>
//           <p className="text-gray-600">Total bookings: {bookings.length}</p>
//         </div>

//         {bookings.length === 0 ? (
//           <div className="bg-white rounded-lg shadow-lg p-12 text-center">
//             <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-gray-700 mb-2">No Bookings Found</h3>
//             <p className="text-gray-500">There are no consultation bookings at the moment.</p>
//           </div>
//         ) : (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {bookings.map((booking) => (
//               <div
//                 key={booking.id}
//                 className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
//               >
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="bg-indigo-100 rounded-full p-3">
//                     <User className="w-6 h-6 text-indigo-600" />
//                   </div>
//                   <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
//                     {formatStatus(booking.status)}
//                   </span>
//                 </div>

//                 <h3 className="text-xl font-bold text-gray-800 mb-2">
//                   {booking.title}
//                 </h3>

//                 <p className="text-sm text-gray-600 mb-4 capitalize">
//                   {booking.type.toLowerCase().replace('_', ' ')}
//                 </p>

//                 <div className="space-y-3">
//                   <div className="flex items-center text-gray-600">
//                     <User className="w-4 h-4 mr-2 flex-shrink-0" />
//                     <span className="text-sm">{booking.userName}</span>
//                   </div>

//                   {booking.userEmail && (
//                     <div className="flex items-center text-gray-600">
//                       <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
//                       <span className="text-sm truncate">{booking.userEmail}</span>
//                     </div>
//                   )}

//                   {booking.userPhone && (
//                     <div className="flex items-center text-gray-600">
//                       <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
//                       <span className="text-sm">{booking.userPhone}</span>
//                     </div>
//                   )}

//                   <div className="flex items-center text-gray-600">
//                     <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
//                     <span className="text-sm">{formatDate(booking.startTime)}</span>
//                   </div>

//                   <div className="flex items-center text-gray-600">
//                     <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
//                     <span className="text-sm">
//                       {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
//                     </span>
//                   </div>

//                   <div className="flex justify-between text-sm text-gray-600 mt-2">
//                     <span>Duration: {booking.durationMinutes} min</span>
//                     {booking.totalPrice !== "0.00" && (
//                       <span className="font-semibold">
//                         {booking.currency} {booking.totalPrice}
//                       </span>
//                     )}
//                   </div>

//                   {booking.meetingLink && (
//                     <div className="mt-3 pt-3 border-t border-gray-200">
//                       <a 
//                         href={booking.meetingLink} 
//                         target="_blank" 
//                         rel="noopener noreferrer"
//                         className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
//                       >
//                         Join Meeting →
//                       </a>
//                     </div>
//                   )}

//                   {booking.consultantNotes && (
//                     <div className="mt-3 pt-3 border-t border-gray-200">
//                       <p className="text-xs text-gray-500 font-semibold mb-1">Consultant Notes:</p>
//                       <p className="text-sm text-gray-600">{booking.consultantNotes}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page