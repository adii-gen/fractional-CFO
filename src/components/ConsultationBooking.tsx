'use client';

import { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, Mail } from 'lucide-react';
import { useCurrentUser } from '@/hooks/auth';

interface ConsultationBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AvailableSlot {
  id: string;
  startTime: string;
  endTime: string;
  consultationType: string;
  availableSpots: number;
}

export default function ConsultationBookingModal({ isOpen, onClose }: ConsultationBookingModalProps) {
  const  user  = useCurrentUser();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  
  const [formData, setFormData] = useState({
    type: 'DISCOVERY_CALL',
    title: '',
    description: '',
    userName: '',
    userEmail: '',
    userPhone: '',
  });

  // Pre-fill user data when user is loaded
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        userName: user.name || '',
        userEmail: user.email || '',
      }));
    }
  }, [user]);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedDate, formData.type]);

  const fetchAvailableSlots = async () => {
    if (!selectedDate) return;
    
    setIsLoadingSlots(true);
    try {
      const response = await fetch(
        `/api/available-slots?date=${selectedDate}&type=${formData.type}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setAvailableSlots(data.slots || []);
      } else {
        console.error('Failed to fetch available slots');
        setAvailableSlots([]);
      }
    } catch (error) {
      console.error('Error fetching available slots:', error);
      setAvailableSlots([]);
    } finally {
      setIsLoadingSlots(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please sign in to book a consultation');
      return;
    }

    if (!selectedSlot) {
      alert('Please select a time slot');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
          // userEmail is already in formData from useCurrentUser
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message || 'Booking request submitted successfully!');
        onClose();
        resetForm();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to create booking');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedDate('');
    setSelectedSlot(null);
    setAvailableSlots([]);
    if (user) {
      setFormData({
        type: 'DISCOVERY_CALL',
        title: '',
        description: '',
        userName: user.name || '',
        userEmail: user.email || '',
        userPhone:  '9876543211',
      });
    }
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            Book a Consultation
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Your form fields remain the same */}
          {/* ... */}
          
          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !selectedSlot || !user}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Booking...' : 'Book Consultation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}