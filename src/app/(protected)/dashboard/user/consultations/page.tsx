// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useCurrentUser } from '@/hooks/auth/useCurrentUser';

// interface Booking {
//   id: string;
//   userId: string | null;
//   consultantId: string;
//   type: string;
//   status: string;
//   title: string;
//   description: string;
//   startTime: string;
//   endTime: string;
//   timezone: string;
//   durationMinutes: number;
//   pricePerMinute: string;
//   totalPrice: string;
//   currency: string;
//   userEmail: string;
//   userName: string;
//   userPhone: string | null;
//   meetingLink: string | null;
//   meetingPlatform: string | null;
//   meetingNotes: string | null;
//   consultantNotes: string | null;
//   createdAt: string;
//   updatedAt: string;
// }

// interface BookingsResponse {
//   bookings: Booking[];
// }

// export default function BookingsPage() {
//   const user = useCurrentUser(); // ✅ Get logged-in user
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
//   const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

//   useEffect(() => {
//     if (user?.id) fetchBookings();
//   }, [user]);

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('/api/bookings');
//       if (!response.ok) {
//         throw new Error('Failed to fetch bookings');
//       }
//       const data: BookingsResponse = await response.json();

//       // ✅ Only include bookings for the logged-in user
//       const userBookings = data.bookings.filter(
//         (booking) => booking.userId === user?.id
//       );

//       setBookings(userBookings);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       weekday: 'short',
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     });
//   };

//   const formatTime = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   const getStatusColor = (status: string) => {
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

//   const getUpcomingBookings = () => {
//     const now = new Date();
//     return bookings.filter((booking) => new Date(booking.startTime) > now);
//   };

//   const getPastBookings = () => {
//     const now = new Date();
//     return bookings.filter((booking) => new Date(booking.startTime) <= now);
//   };

//   const getFilteredBookings = () => {
//     switch (filter) {
//       case 'upcoming':
//         return getUpcomingBookings();
//       case 'past':
//         return getPastBookings();
//       default:
//         return bookings;
//     }
//   };

//   const filteredBookings = getFilteredBookings();

//   // 🌀 Loader
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="inline-block w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   // ⚠️ Error
//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">
//             Error Loading Bookings
//           </h2>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={fetchBookings}
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // 🚫 If not logged in
//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-700">
//         Please log in to view your consultations.
//       </div>
//     );
//   }

//   // 🧭 UI
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-gray-900">
//             My Consultations
//           </h1>
//           <div className="flex gap-2">
//             {['all', 'upcoming', 'past'].map((f) => (
//               <button
//                 key={f}
//                 onClick={() => setFilter(f as any)}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium ${
//                   filter === f
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 {f.charAt(0).toUpperCase() + f.slice(1)}
//               </button>
//             ))}
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto p-6">
//         {filteredBookings.length === 0 ? (
//           <div className="text-center py-16 text-gray-600">
//             No {filter !== 'all' ? filter : ''} consultations found.
//           </div>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredBookings.map((booking) => (
//               <div
//                 key={booking.id}
//                 onClick={() => setSelectedBooking(booking)}
//                 className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition cursor-pointer"
//               >
//                 <div className="flex justify-between items-start">
//                   <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
//                     {booking.title || 'Consultation'}
//                   </h3>
//                   <span
//                     className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(
//                       booking.status
//                     )}`}
//                   >
//                     {booking.status}
//                   </span>
//                 </div>

//                 <p className="text-sm text-gray-600 mt-1">
//                   {formatDate(booking.startTime)} • {formatTime(booking.startTime)}
//                 </p>
//                 <p className="text-gray-700 mt-3 line-clamp-2">
//                   {booking.description || 'No description provided.'}
//                 </p>

//                 {booking.meetingLink && (
//                   <Link
//                     href={booking.meetingLink}
//                     target="_blank"
//                     className="text-blue-600 text-sm font-medium mt-3 inline-block"
//                   >
//                     Join Meeting →
//                   </Link>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </main>

//       {selectedBooking && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-6 z-50"
//           onClick={() => setSelectedBooking(null)}
//         >
//           <div
//             className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={() => setSelectedBooking(null)}
//               className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
//             >
//               ✕
//             </button>
//             <h2 className="text-2xl font-bold mb-3">{selectedBooking.title}</h2>
//             <p className="text-gray-700 mb-2">
//               {formatDate(selectedBooking.startTime)} at{' '}
//               {formatTime(selectedBooking.startTime)}
//             </p>
//             <p className="text-gray-700 mb-4">
//               {selectedBooking.description || 'No description provided.'}
//             </p>
//             {selectedBooking.meetingLink && (
//               <Link
//                 href={selectedBooking.meetingLink}
//                 target="_blank"
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-block"
//               >
//                 Join Meeting
//               </Link>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCurrentUser } from '@/hooks/auth/useCurrentUser';

interface Booking {
  id: string;
  userId: string | null;
  consultantId: string;
  type: string;
  status: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  timezone: string;
  durationMinutes: number;
  pricePerMinute: string;
  totalPrice: string;
  currency: string;
  userEmail: string;
  userName: string;
  userPhone: string | null;
  meetingLink: string | null;
  meetingPlatform: string | null;
  meetingNotes: string | null;
  consultantNotes: string | null;
  createdAt: string;
  updatedAt: string;
}

interface BookingsResponse {
  bookings: Booking[];
}

export default function BookingsPage() {
  const user = useCurrentUser(); // ✅ Get logged-in user
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (user?.id) fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/bookings');
      if (!response.ok) throw new Error('Failed to fetch bookings');

      const data: BookingsResponse = await response.json();

      // ✅ Only include bookings for the logged-in user
      const userBookings = data.bookings.filter(
        (booking) => booking.userId === user?.id
      );

      setBookings(userBookings);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUpcomingBookings = () => {
    const now = new Date();
    return bookings.filter((booking) => new Date(booking.startTime) > now);
  };

  const getPastBookings = () => {
    const now = new Date();
    return bookings.filter((booking) => new Date(booking.startTime) <= now);
  };

  const getFilteredBookings = () => {
    switch (filter) {
      case 'upcoming':
        return getUpcomingBookings();
      case 'past':
        return getPastBookings();
      default:
        return bookings;
    }
  };

  const filteredBookings = getFilteredBookings();

  // 🌀 Loader
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="inline-block w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // ⚠️ Error
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Error Loading Bookings
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchBookings}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // 🚫 If not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        Please log in to view your consultations.
      </div>
    );
  }

  // 🧭 UI (kept exactly same)
  return (
    <div className="min-h-screen bg-gray-50 ml-64">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            My Consultations
          </h1>
          <div className="flex gap-2">
            {['all', 'upcoming', 'past'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === f
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-16 text-gray-600">
            No {filter !== 'all' ? filter : ''} consultations found.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                onClick={() => setSelectedBooking(booking)}
                className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {booking.title || 'Consultation'}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mt-1">
                  {formatDate(booking.startTime)} • {formatTime(booking.startTime)}
                </p>
                <p className="text-gray-700 mt-3 line-clamp-2">
                  {booking.description || 'No description provided.'}
                </p>

                {booking.meetingLink && (
                  <Link
                    href={booking.meetingLink}
                    target="_blank"
                    className="text-blue-600 text-sm font-medium mt-3 inline-block"
                  >
                    Join Meeting →
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {selectedBooking && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-6 z-50"
          onClick={() => setSelectedBooking(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-3">{selectedBooking.title}</h2>
            <p className="text-gray-700 mb-2">
              {formatDate(selectedBooking.startTime)} at{' '}
              {formatTime(selectedBooking.startTime)}
            </p>
            <p className="text-gray-700 mb-4">
              {selectedBooking.description || 'No description provided.'}
            </p>
            {selectedBooking.meetingLink && (
              <Link
                href={selectedBooking.meetingLink}
                target="_blank"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-block"
              >
                Join Meeting
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
