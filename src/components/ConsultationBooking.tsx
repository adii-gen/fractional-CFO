"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, DollarSign, User, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Consultant {
  id: string;
  name: string;
  email: string;
  profilePic: string | null;
  pricePerMinute: number;
  phone: string | null;
}

interface TimeSlot {
  startTime: string;
  endTime: string;
  pricePerMinute: number;
  duration: number;
  totalPrice: number;
}

interface ConsultantBookingProps {
  userId?: string;
  userEmail?: string | null;
  userName?: string | null;
  userPhone?: string | null;
}

export default function ConsultantBooking({
  userId,
  userEmail,
  userName,
  userPhone,
}: ConsultantBookingProps) {
  const [step, setStep] = useState<'consultants' | 'dates' | 'slots' | 'confirm'>('consultants');
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch consultants
  useEffect(() => {
    fetchConsultants();
  }, []);

  const fetchConsultants = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/consultants');
      const data = await response.json();
      setConsultants(data.consultants || []);
    } catch (err) {
      setError('Failed to fetch consultants');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableDates = async (consultantId: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/consultants/${consultantId}/availability?mode=dates`
      );
      const data = await response.json();
      setAvailableDates(data.availableDates || []);
      setStep('dates');
    } catch (err) {
      setError('Failed to fetch available dates');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTimeSlots = async (consultantId: string, date: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/consultants/${consultantId}/availability?mode=slots&date=${date}`
      );
      const data = await response.json();
      setTimeSlots(data.timeSlots || []);
      setStep('slots');
    } catch (err) {
      setError('Failed to fetch time slots');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConsultantSelect = (consultant: Consultant) => {
    setSelectedConsultant(consultant);
    setError(null);
    fetchAvailableDates(consultant.id);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setError(null);
    if (selectedConsultant) {
      fetchTimeSlots(selectedConsultant.id, date);
    }
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setStep('confirm');
  };

  const handleBooking = async () => {
    if (!selectedConsultant || !selectedDate || !selectedSlot) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          consultantId: selectedConsultant.id,
          date: selectedDate,
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
          userEmail,
          userName,
          userPhone,
          type: 'DISCOVERY_CALL',
          title: `Consultation with ${selectedConsultant.name}`,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Booking confirmed successfully!');
        setTimeout(() => {
          resetBooking();
        }, 3000);
      } else {
        setError(data.error || 'Failed to create booking');
      }
    } catch (err) {
      setError('Failed to create booking');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetBooking = () => {
    setStep('consultants');
    setSelectedConsultant(null);
    setSelectedDate(null);
    setSelectedSlot(null);
    setAvailableDates([]);
    setTimeSlots([]);
    setSuccess(null);
    setError(null);
  };

  const goBack = () => {
    if (step === 'dates') {
      setStep('consultants');
      setSelectedConsultant(null);
    } else if (step === 'slots') {
      setStep('dates');
      setSelectedDate(null);
    } else if (step === 'confirm') {
      setStep('slots');
      setSelectedSlot(null);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="mb-6">
        {step !== 'consultants' && (
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        )}
        <h2 className="text-2xl font-bold text-gray-900">Book a Consultation</h2>
        <p className="text-gray-600 mt-1">
          {step === 'consultants' && 'Select a consultant'}
          {step === 'dates' && 'Choose an available date'}
          {step === 'slots' && 'Pick a time slot'}
          {step === 'confirm' && 'Confirm your booking'}
        </p>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          {success}
        </div>
      )}

      {/* Step 1: Consultants */}
      {step === 'consultants' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && <p className="text-gray-500 col-span-full">Loading consultants...</p>}
          {consultants.map((consultant) => (
            <div
              key={consultant.id}
              className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleConsultantSelect(consultant)}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  {consultant.profilePic ? (
                    <img
                      src={consultant.profilePic}
                      alt={consultant.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-8 w-8 text-blue-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{consultant.name}</h3>
                  <p className="text-sm text-gray-600">{consultant.email}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-green-600 font-semibold">
                  <DollarSign className="h-4 w-4" />
                  AED {consultant.pricePerMinute}/min
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Select
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Step 2: Available Dates */}
      {step === 'dates' && (
        <div>
          {loading && <p className="text-gray-500">Loading available dates...</p>}
          {!loading && availableDates.length === 0 && (
            <p className="text-gray-500">No available dates found for this consultant.</p>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {availableDates.map((date) => (
              <button
                key={date}
                onClick={() => handleDateSelect(date)}
                className="border border-gray-300 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition-all text-center"
              >
                <Calendar className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <div className="text-sm font-semibold text-gray-900">
                  {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="text-xs text-gray-600">
                  {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Time Slots */}
      {step === 'slots' && (
        <div>
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Date:</strong> {selectedDate && formatDate(selectedDate)}
            </p>
          </div>

          {loading && <p className="text-gray-500">Loading time slots...</p>}
          {!loading && timeSlots.length === 0 && (
            <p className="text-gray-500">No available time slots for this date.</p>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {timeSlots.map((slot, index) => (
              <button
                key={index}
                onClick={() => handleSlotSelect(slot)}
                className="border border-gray-300 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <Clock className="h-5 w-5 mx-auto mb-2 text-blue-600" />
                <div className="text-sm font-semibold text-gray-900">
                  {slot.startTime} - {slot.endTime}
                </div>
                <div className="text-xs text-gray-600 mt-1">{slot.duration} minutes</div>
                <div className="text-xs font-semibold text-green-600 mt-2">
                  AED {slot.totalPrice.toFixed(2)}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {step === 'confirm' && selectedConsultant && selectedDate && selectedSlot && (
        <div className="max-w-2xl mx-auto">
          <div className="border border-gray-300 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Booking Summary</h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Consultant:</span>
                <span className="font-semibold">{selectedConsultant.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-semibold">{formatDate(selectedDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-semibold">
                  {selectedSlot.startTime} - {selectedSlot.endTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-semibold">{selectedSlot.duration} minutes</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="text-gray-900 font-semibold">Total Price:</span>
                <span className="text-green-600 font-bold text-lg">
                  AED {selectedSlot.totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <Button
              onClick={handleBooking}
              disabled={loading}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
            >
              {loading ? 'Booking...' : 'Confirm Booking'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
