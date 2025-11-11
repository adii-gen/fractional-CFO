// "use client";

// import React, { useState, useEffect } from 'react';
// import { Plus, Trash2, Clock, Calendar, DollarSign } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { useCurrentUser } from '@/hooks/auth';

// type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

// interface ScheduleSlot {
//   id?: string;
//   dayOfWeek: DayOfWeek;
//   startTime: string;
//   endTime: string;
//   pricePerMinute?: number;
//   consultationType?: string;
//   isActive?: boolean;
// }

// interface ConsultantScheduleManagerProps {
//   defaultPricePerMinute?: number;
// }

// const DAYS_OF_WEEK: DayOfWeek[] = [
//   'MONDAY',
//   'TUESDAY',
//   'WEDNESDAY',
//   'THURSDAY',
//   'FRIDAY',
//   'SATURDAY',
//   'SUNDAY',
// ];

// export default function ConsultantScheduleManager({
//   defaultPricePerMinute = 5.0,
// }: ConsultantScheduleManagerProps) {
//   const [schedules, setSchedules] = useState<ScheduleSlot[]>([]);
//   const [newSlots, setNewSlots] = useState<ScheduleSlot[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);
//   const user = useCurrentUser();
//   // Fetch existing schedules
//   useEffect(() => {
//     if(user?.id)
//     fetchSchedules();
//   }, [user]);

//   const fetchSchedules = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`/api/consultant/schedule?consultantId=${user?.id}`);
//       const data = await response.json();

//       if (response.ok) {
//         setSchedules(data.schedules || []);
//       } else {
//         setError(data.error || 'Failed to fetch schedules');
//       }
//     } catch (err) {
//       setError('Failed to fetch schedules');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addNewSlot = () => {
//     setNewSlots([
//       ...newSlots,
//       {
//         dayOfWeek: 'MONDAY',
//         startTime: '09:00:00',
//         endTime: '17:00:00',
//         pricePerMinute: defaultPricePerMinute,
//         isActive: true,
//       },
//     ]);
//   };

//   const removeNewSlot = (index: number) => {
//     setNewSlots(newSlots.filter((_, i) => i !== index));
//   };

//   const updateNewSlot = (index: number, field: keyof ScheduleSlot, value: any) => {
//     const updated = [...newSlots];
//     updated[index] = { ...updated[index], [field]: value };
//     setNewSlots(updated);
//   };

//   const saveSchedules = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       setSuccess(null);
//       const consultantId = user?.id;
//       const response = await fetch('/api/consultant/schedule', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           consultantId,
//           schedules: newSlots,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccess('Schedules saved successfully!');
//         setNewSlots([]);
//         await fetchSchedules();
//         setTimeout(() => setSuccess(null), 3000);
//       } else {
//         setError(data.error || 'Failed to save schedules');
//       }
//     } catch (err) {
//       setError('Failed to save schedules');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteSchedule = async (scheduleId: string) => {
//     if (!confirm('Are you sure you want to delete this schedule?')) return;

//           const consultantId = user?.id;

//     try {
//       const response = await fetch(
//         `/api/consultant/schedule?scheduleId=${scheduleId}&consultantId=${consultantId}`,
//         { method: 'DELETE' }
//       );

//       if (response.ok) {
//         setSuccess('Schedule deleted successfully!');
//         await fetchSchedules();
//         setTimeout(() => setSuccess(null), 3000);
//       } else {
//         const data = await response.json();
//         setError(data.error || 'Failed to delete schedule');
//       }
//     } catch (err) {
//       setError('Failed to delete schedule');
//       console.error(err);
//     }
//   };

//   const groupSchedulesByDay = () => {
//     const grouped: Record<DayOfWeek, ScheduleSlot[]> = {
//       MONDAY: [],
//       TUESDAY: [],
//       WEDNESDAY: [],
//       THURSDAY: [],
//       FRIDAY: [],
//       SATURDAY: [],
//       SUNDAY: [],
//     };

//     schedules.forEach((schedule) => {
//       grouped[schedule.dayOfWeek].push(schedule);
//     });

//     return grouped;
//   };

//   const groupedSchedules = groupSchedulesByDay();

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">
//           Weekly Schedule Management
//         </h2>
//         <p className="text-gray-600">
//           Set your available time slots for each day of the week
//         </p>
//       </div>

//       {/* Error/Success Messages */}
//       {error && (
//         <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
//           {error}
//         </div>
//       )}
//       {success && (
//         <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
//           {success}
//         </div>
//       )}

//       {/* Existing Schedules */}
//       <div className="mb-8">
//         <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
//           <Calendar className="h-5 w-5 text-blue-600" />
//           Current Schedule
//         </h3>

//         {loading && <p className="text-gray-500">Loading schedules...</p>}

//         {!loading && schedules.length === 0 && (
//           <p className="text-gray-500 italic">No schedules set yet. Add your first slot below.</p>
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {DAYS_OF_WEEK.map((day) => {
//             const daySchedules = groupedSchedules[day];
//             if (daySchedules.length === 0) return null;

//             return (
//               <div key={day} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
//                 <h4 className="font-semibold text-gray-900 mb-3">{day}</h4>
//                 <div className="space-y-2">
//                   {daySchedules.map((schedule) => (
//                     <div
//                       key={schedule.id}
//                       className="bg-white p-3 rounded border border-gray-200 flex justify-between items-center"
//                     >
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2 text-sm">
//                           <Clock className="h-4 w-4 text-gray-500" />
//                           <span className="font-medium">
//                             {schedule.startTime.slice(0, 5)} - {schedule.endTime.slice(0, 5)}
//                           </span>
//                         </div>
//                         {schedule.pricePerMinute && (
//                           <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
//                             <DollarSign className="h-3 w-3" />
//                             {schedule.pricePerMinute}/min
//                           </div>
//                         )}
//                       </div>
//                       <button
//                         onClick={() => schedule.id && deleteSchedule(schedule.id)}
//                         className="text-red-500 hover:text-red-700 p-1"
//                         title="Delete schedule"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Add New Slots */}
//       <div className="border-t pt-6">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">Add New Time Slots</h3>
//           <Button
//             onClick={addNewSlot}
//             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
//           >
//             <Plus className="h-4 w-4" />
//             Add Slot
//           </Button>
//         </div>

//         {newSlots.length === 0 && (
//           <p className="text-gray-500 italic text-center py-8">
//             Click "Add Slot" to create a new time slot
//           </p>
//         )}

//         <div className="space-y-4">
//           {newSlots.map((slot, index) => (
//             <div
//               key={index}
//               className="border border-gray-300 rounded-lg p-4 bg-gray-50"
//             >
//               <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//                 {/* Day of Week */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Day
//                   </label>
//                   <select
//                     value={slot.dayOfWeek}
//                     onChange={(e) =>
//                       updateNewSlot(index, 'dayOfWeek', e.target.value as DayOfWeek)
//                     }
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   >
//                     {DAYS_OF_WEEK.map((day) => (
//                       <option key={day} value={day}>
//                         {day}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Start Time */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Start Time
//                   </label>
//                   <input
//                     type="time"
//                     value={slot.startTime.slice(0, 5)}
//                     onChange={(e) =>
//                       updateNewSlot(index, 'startTime', e.target.value + ':00')
//                     }
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 {/* End Time */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     End Time
//                   </label>
//                   <input
//                     type="time"
//                     value={slot.endTime.slice(0, 5)}
//                     onChange={(e) =>
//                       updateNewSlot(index, 'endTime', e.target.value + ':00')
//                     }
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 {/* Price Per Minute */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Price/Min (AED)
//                   </label>
//                   <input
//                     type="number"
//                     step="0.01"
//                     value={slot.pricePerMinute}
//                     onChange={(e) =>
//                       updateNewSlot(index, 'pricePerMinute', parseFloat(e.target.value))
//                     }
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 {/* Remove Button */}
//                 <div className="flex items-end">
//                   <button
//                     onClick={() => removeNewSlot(index)}
//                     className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center gap-2"
//                   >
//                     <Trash2 className="h-4 w-4" />
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {newSlots.length > 0 && (
//           <div className="mt-6 flex justify-end">
//             <Button
//               onClick={saveSchedules}
//               disabled={loading}
//               className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold"
//             >
//               {loading ? 'Saving...' : `Save ${newSlots.length} Slot${newSlots.length > 1 ? 's' : ''}`}
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Clock, Calendar, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

interface ScheduleSlot {
  id?: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  pricePerMinute?: number;
  consultationType?: string;
  isActive?: boolean;
}

interface Consultant {
  id: string;
  name: string;
  email: string;
  specialization?: string;
}

interface ConsultantScheduleManagerProps {
  defaultPricePerMinute?: number;
}

const DAYS_OF_WEEK: DayOfWeek[] = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
];

export default function ConsultantScheduleManager({
  defaultPricePerMinute = 5.0,
}: ConsultantScheduleManagerProps) {
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null);
  const [schedules, setSchedules] = useState<ScheduleSlot[]>([]);
  const [newSlots, setNewSlots] = useState<ScheduleSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [consultantsLoading, setConsultantsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch available consultants
  useEffect(() => {
    fetchConsultants();
  }, []);

  // Fetch schedules when consultant is selected
  useEffect(() => {
    if (selectedConsultant) {
      fetchSchedules();
    } else {
      setSchedules([]);
    }
  }, [selectedConsultant]);

  const fetchConsultants = async () => {
    try {
      setConsultantsLoading(true);
      const response = await fetch('/api/consultants');
      const data = await response.json();

      if (response.ok) {
        setConsultants(data.consultants || []);
      } else {
        setError(data.error || 'Failed to fetch consultants');
      }
    } catch (err) {
      setError('Failed to fetch consultants');
      console.error(err);
    } finally {
      setConsultantsLoading(false);
    }
  };

  const fetchSchedules = async () => {
    if (!selectedConsultant) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/consultant/schedule?consultantId=${selectedConsultant.id}`);
      const data = await response.json();

      if (response.ok) {
        setSchedules(data.schedules || []);
      } else {
        setError(data.error || 'Failed to fetch schedules');
      }
    } catch (err) {
      setError('Failed to fetch schedules');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addNewSlot = () => {
    setNewSlots([
      ...newSlots,
      {
        dayOfWeek: 'MONDAY',
        startTime: '09:00:00',
        endTime: '17:00:00',
        pricePerMinute: defaultPricePerMinute,
        isActive: true,
      },
    ]);
  };

  const removeNewSlot = (index: number) => {
    setNewSlots(newSlots.filter((_, i) => i !== index));
  };

  const updateNewSlot = (index: number, field: keyof ScheduleSlot, value: any) => {
    const updated = [...newSlots];
    updated[index] = { ...updated[index], [field]: value };
    setNewSlots(updated);
  };

  const saveSchedules = async () => {
    if (!selectedConsultant) {
      setError('Please select a consultant first');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      const response = await fetch('/api/consultant/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consultantId: selectedConsultant.id,
          schedules: newSlots,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(`Schedules saved successfully for ${selectedConsultant.name}!`);
        setNewSlots([]);
        await fetchSchedules();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(data.error || 'Failed to save schedules');
      }
    } catch (err) {
      setError('Failed to save schedules');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteSchedule = async (scheduleId: string) => {
    if (!selectedConsultant) return;
    if (!confirm('Are you sure you want to delete this schedule?')) return;

    try {
      const response = await fetch(
        `/api/consultant/schedule?scheduleId=${scheduleId}&consultantId=${selectedConsultant.id}`,
        { method: 'DELETE' }
      );

      if (response.ok) {
        setSuccess('Schedule deleted successfully!');
        await fetchSchedules();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete schedule');
      }
    } catch (err) {
      setError('Failed to delete schedule');
      console.error(err);
    }
  };

  const groupSchedulesByDay = () => {
    const grouped: Record<DayOfWeek, ScheduleSlot[]> = {
      MONDAY: [],
      TUESDAY: [],
      WEDNESDAY: [],
      THURSDAY: [],
      FRIDAY: [],
      SATURDAY: [],
      SUNDAY: [],
    };

    schedules.forEach((schedule) => {
      grouped[schedule.dayOfWeek].push(schedule);
    });

    return grouped;
  };

  const groupedSchedules = groupSchedulesByDay();

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Consultant Schedule Management
        </h2>
        <p className="text-gray-600">
          Manage schedules for available consultants
        </p>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          {success}
        </div>
      )}

      {/* Consultants List */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-600" />
          Select Consultant
        </h3>

        {consultantsLoading && <p className="text-gray-500">Loading consultants...</p>}

        {!consultantsLoading && consultants.length === 0 && (
          <p className="text-gray-500 italic">No consultants available.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {consultants.map((consultant) => (
            <div
              key={consultant.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedConsultant?.id === consultant.id
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                  : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedConsultant(consultant)}
            >
              <h4 className="font-semibold text-gray-900">{consultant.name}</h4>
              <p className="text-sm text-gray-600">{consultant.email}</p>
              {consultant.specialization && (
                <p className="text-xs text-gray-500 mt-1">{consultant.specialization}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedConsultant && (
        <>
          {/* Selected Consultant Info */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900">
              Managing schedules for: {selectedConsultant.name}
            </h3>
            <p className="text-blue-700">{selectedConsultant.email}</p>
          </div>

          {/* Existing Schedules */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Current Schedule
            </h3>

            {loading && <p className="text-gray-500">Loading schedules...</p>}

            {!loading && schedules.length === 0 && (
              <p className="text-gray-500 italic">No schedules set yet. Add your first slot below.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DAYS_OF_WEEK.map((day) => {
                const daySchedules = groupedSchedules[day];
                if (daySchedules.length === 0) return null;

                return (
                  <div key={day} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h4 className="font-semibold text-gray-900 mb-3">{day}</h4>
                    <div className="space-y-2">
                      {daySchedules.map((schedule) => (
                        <div
                          key={schedule.id}
                          className="bg-white p-3 rounded border border-gray-200 flex justify-between items-center"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="font-medium">
                                {schedule.startTime.slice(0, 5)} - {schedule.endTime.slice(0, 5)}
                              </span>
                            </div>
                            {schedule.pricePerMinute && (
                              <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                                <DollarSign className="h-3 w-3" />
                                {schedule.pricePerMinute}/min
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => schedule.id && deleteSchedule(schedule.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                            title="Delete schedule"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add New Slots */}
          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Time Slots</h3>
              <Button
                onClick={addNewSlot}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                Add Slot
              </Button>
            </div>

            {newSlots.length === 0 && (
              <p className="text-gray-500 italic text-center py-8">
                Click "Add Slot" to create a new time slot for {selectedConsultant.name}
              </p>
            )}

            <div className="space-y-4">
              {newSlots.map((slot, index) => (
                <div
                  key={index}
                  className="border border-gray-300 rounded-lg p-4 bg-gray-50"
                >
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {/* Day of Week */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Day
                      </label>
                      <select
                        value={slot.dayOfWeek}
                        onChange={(e) =>
                          updateNewSlot(index, 'dayOfWeek', e.target.value as DayOfWeek)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        {DAYS_OF_WEEK.map((day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Start Time */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={slot.startTime.slice(0, 5)}
                        onChange={(e) =>
                          updateNewSlot(index, 'startTime', e.target.value + ':00')
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* End Time */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={slot.endTime.slice(0, 5)}
                        onChange={(e) =>
                          updateNewSlot(index, 'endTime', e.target.value + ':00')
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Price Per Minute */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price/Min (AED)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={slot.pricePerMinute}
                        onChange={(e) =>
                          updateNewSlot(index, 'pricePerMinute', parseFloat(e.target.value))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Remove Button */}
                    <div className="flex items-end">
                      <button
                        onClick={() => removeNewSlot(index)}
                        className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {newSlots.length > 0 && (
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={saveSchedules}
                  disabled={loading}
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold"
                >
                  {loading ? 'Saving...' : `Save ${newSlots.length} Slot${newSlots.length > 1 ? 's' : ''} for ${selectedConsultant.name}`}
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}