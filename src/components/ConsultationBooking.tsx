"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, X, ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';

interface Consultant {
  id: string;
  name: string;
  email: string;
  profilePic: string | null;
  pricePerMinute: number;
  phone: string | null;
  specialty?: string;
  description?: string;
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
  const [searchQuery, setSearchQuery] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());

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
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateShort = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const isDateAvailable = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return availableDates.includes(dateStr);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const filteredConsultants = consultants.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.specialty && c.specialty.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className=" ml-64">
      {/* Consultants List */}
      {step === 'consultants' && (
        <div className="max-w-7xl mx-auto  py-12">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold text-gray-900">Meet Our Experts</h1>

            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-8 flex gap-4 max-w-4xl mx-auto">
            <div className="flex-1 relative">

            </div>
            {/* <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              <span className="text-gray-700">Filter by Specialty</span>
              <Filter className="h-4 w-4" />
            </button>
            <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              <span className="text-gray-700">Filter by Availability</span>
              <Filter className="h-4 w-4" />
            </button> */}
          </div>

          {loading ? (
              <div className="flex items-center justify-center min-h-screen">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {filteredConsultants.map((consultant) => (
                <div
                  key={consultant.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex flex-col items-center text-center mb-4">
                      <div className="w-24 h-24 mb-4">
                        {consultant.profilePic ? (
                          <img
                            src={consultant.profilePic}
                            alt={consultant.name}
                            className="w-24 h-24 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-3xl font-semibold">
                              {consultant.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>

                      <h3 className="font-bold text-lg text-gray-900 mb-1">{consultant.name}</h3>
                      <p className="text-sm text-blue-600 mb-2">
                        {consultant.specialty || 'Senior Financial Advisor'}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {consultant.description || 'Specializes in retirement planning and investment strategies.'}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={() => handleConsultantSelect(consultant)}
                        className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                      >
                        Select
                      </button>
                      <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Date Selection Modal */}
      {/* {step === 'dates' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Book a Consultation</h2>
                </div>
                <button
                  onClick={() => setStep('consultants')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Select a Date</h3>
                <p className="text-gray-600">Choose an available date below.</p>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-600" />
                  </button>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h4>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                    <div key={i} className="text-center text-sm font-medium text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                  
                  {(() => {
                    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
                    const cells = [];
                    
                    for (let i = 0; i < startingDayOfWeek; i++) {
                      cells.push(<div key={`empty-${i}`} className="aspect-square" />);
                    }
                    
                    for (let day = 1; day <= daysInMonth; day++) {
                      const date = new Date(year, month, day);
                      const dateStr = date.toISOString().split('T')[0];
                      const isAvailable = isDateAvailable(date);
                      const isSelected = selectedDate === dateStr;
                      const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
                      
                      cells.push(
                        <button
                          key={day}
                          onClick={() => isAvailable && !isPast && handleDateSelect(dateStr)}
                          disabled={!isAvailable || isPast}
                          className={`aspect-square rounded-lg font-medium text-sm transition-all ${
                            isSelected
                              ? 'bg-blue-600 text-white'
                              : isAvailable && !isPast
                              ? 'bg-white border-2 border-gray-200 text-gray-900 hover:border-blue-600'
                              : 'text-gray-300 cursor-not-allowed'
                          }`}
                        >
                          {day}
                        </button>
                      );
                    }
                    
                    return cells;
                  })()}
                </div>
              </div>

              <button
                onClick={() => selectedDate && handleDateSelect(selectedDate)}
                disabled={!selectedDate}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )} */}
      {step === 'dates' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-lg max-w-sm w-full overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-blue-600 rounded-md flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Book a Consultation</h2>
              </div>
              <button
                onClick={() => setStep('consultants')}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5">
              <div className="text-center mb-5">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Select a Date</h3>
                <p className="text-gray-500 text-sm">Choose an available date below</p>
              </div>

              {/* Month navigation */}
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="h-4 w-4 text-gray-600" />
                </button>
                <h4 className="text-base font-medium text-gray-900">
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h4>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="h-4 w-4 text-gray-600" />
                </button>
              </div>

              {/* Calendar */}
              <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-medium text-gray-500 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                  <div key={i} className="py-1">{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1.5 mb-5">
                {(() => {
                  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
                  const cells = [];

                  for (let i = 0; i < startingDayOfWeek; i++) {
                    cells.push(<div key={`empty-${i}`} className="aspect-square" />);
                  }

                  for (let day = 1; day <= daysInMonth; day++) {
                    const date = new Date(year, month, day);
                    const dateStr = date.toISOString().split('T')[0];
                    const isAvailable = isDateAvailable(date);
                    const isSelected = selectedDate === dateStr;
                    const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

                    cells.push(
                      <button
                        key={day}
                        onClick={() => isAvailable && !isPast && handleDateSelect(dateStr)}
                        disabled={!isAvailable || isPast}
                        className={`aspect-square rounded-md text-xs font-medium transition-all
                    ${isSelected
                            ? 'bg-blue-600 text-white'
                            : isAvailable && !isPast
                              ? 'bg-white border border-gray-200 text-gray-900 hover:border-blue-600'
                              : 'text-gray-300 cursor-not-allowed'}
                  `}
                      >
                        {day}
                      </button>
                    );
                  }
                  return cells;
                })()}
              </div>

              <button
                onClick={() => selectedDate && handleDateSelect(selectedDate)}
                disabled={!selectedDate}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Time Slot Selection */}
      {step === 'slots' && selectedConsultant && selectedDate && (
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <button
                    onClick={goBack}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                  >
                    <ChevronLeft className="h-5 w-5" />
                    <span>Back</span>
                  </button>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Select a Time</h2>
                  <p className="text-gray-600">
                    Available times for {formatDateShort(selectedDate)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">All times are in your local time (PST)</p>
                </div>

                {loading ? (
                  <div className="text-center py-12">
                    <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : timeSlots.length === 0 ? (
                  <div className="text-center py-12">
                    <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No available time slots for this date.</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Morning</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {timeSlots
                          .filter(slot => {
                            const hour = parseInt(slot.startTime.split(':')[0]);
                            return hour < 12;
                          })
                          .map((slot, index) => (
                            <button
                              key={index}
                              onClick={() => handleSlotSelect(slot)}
                              className={`py-3 px-4 border-2 rounded-lg font-medium transition-all ${selectedSlot?.startTime === slot.startTime
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'border-gray-300 text-gray-900 hover:border-blue-600 bg-white'
                                }`}
                            >
                              {slot.startTime}
                            </button>
                          ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Afternoon</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {timeSlots
                          .filter(slot => {
                            const hour = parseInt(slot.startTime.split(':')[0]);
                            return hour >= 12;
                          })
                          .map((slot, index) => (
                            <button
                              key={index}
                              onClick={() => handleSlotSelect(slot)}
                              className={`py-3 px-4 border-2 rounded-lg font-medium transition-all ${selectedSlot?.startTime === slot.startTime
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'border-gray-300 text-gray-900 hover:border-blue-600 bg-white'
                                }`}
                            >
                              {slot.startTime}
                            </button>
                          ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Your Consultation</h3>

                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                    <div className="w-12 h-12">
                      {selectedConsultant.profilePic ? (
                        <img
                          src={selectedConsultant.profilePic}
                          alt={selectedConsultant.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg font-semibold">
                            {selectedConsultant.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{selectedConsultant.name}</p>
                      <p className="text-sm text-gray-600">Senior Consultant</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Service</span>
                      <span className="font-medium text-gray-900">Financial Planning</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Date</span>
                      <span className="font-medium text-gray-900">{formatDateShort(selectedDate)}</span>
                    </div>
                    {selectedSlot && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Time</span>
                          <span className="font-medium text-blue-600">{selectedSlot.startTime}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Duration</span>
                          <span className="font-medium text-gray-900">{selectedSlot.duration} minutes</span>
                        </div>
                      </>
                    )}
                  </div>

                  {selectedSlot && (
                    <>
                      <div className="border-t border-gray-200 pt-4 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-gray-900">Total</span>
                          <span className="text-2xl font-bold text-gray-900">
                            ${selectedSlot.totalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => setStep('confirm')}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Continue
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation */}
      {step === 'confirm' && selectedConsultant && selectedDate && selectedSlot && (
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Confirm Your Booking</h2>
                <p className="text-gray-600 mt-1">
                  Please review the details below before confirming your appointment.
                </p>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
                  <div className="w-16 h-16">
                    {selectedConsultant.profilePic ? (
                      <img
                        src={selectedConsultant.profilePic}
                        alt={selectedConsultant.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl font-semibold">
                          {selectedConsultant.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Consultant</p>
                    <p className="text-xl font-bold text-gray-900">{selectedConsultant.name}</p>
                    <p className="text-sm text-gray-600">Senior Financial Advisor</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="font-medium text-gray-900">{formatDateShort(selectedDate)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Clock className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">Time</p>
                        <p className="font-medium text-gray-900">{selectedSlot.startTime} (PST)</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Clock className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="font-medium text-gray-900">{selectedSlot.duration} minutes</p>
                      </div>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}

                {success && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 text-sm">{success}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={goBack}
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleBooking}
                    disabled={loading}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Processing...' : 'Confirm Booking'}
                  </button>
                </div>

                <p className="text-center text-sm text-gray-500 mt-4">
                  A calendar invitation will be sent to your email upon confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}