"use client";

import React, { useState } from 'react';
import ConsultantBooking from "@/components/ConsultationBooking";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { Button } from '@/components/ui/button';
import { Mail, Phone, User, CheckCircle } from 'lucide-react';

export default function BookConsultationPage() {
  const user = useCurrentUser();
  
  // Guest user form state
  const [guestInfo, setGuestInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });
  
  const [isFormValid, setIsFormValid] = useState<boolean | "">(false);
  const [showBooking, setShowBooking] = useState(false);

  // Regex patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;

  // Validate individual field
  const validateField = (name: string, value: string) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (!nameRegex.test(value)) {
          error = 'Name should contain only letters (2-50 characters)';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!emailRegex.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!phoneRegex.test(value)) {
          error = 'Please enter a valid phone number';
        }
        break;
    }

    return error;
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setGuestInfo(prev => ({ ...prev, [name]: value }));
    
    // Validate field
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));

    // Check if form is valid
    const newErrors = {
      name: name === 'name' ? error : errors.name,
      email: name === 'email' ? error : errors.email,
      phone: name === 'phone' ? error : errors.phone,
    };

    const allFieldsFilled = 
      (name === 'name' ? value : guestInfo.name) &&
      (name === 'email' ? value : guestInfo.email) &&
      (name === 'phone' ? value : guestInfo.phone);

    const noErrors = !newErrors.name && !newErrors.email && !newErrors.phone;

    setIsFormValid(allFieldsFilled && noErrors);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Final validation
    const nameError = validateField('name', guestInfo.name);
    const emailError = validateField('email', guestInfo.email);
    const phoneError = validateField('phone', guestInfo.phone);

    setErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
    });

    if (!nameError && !emailError && !phoneError) {
      setShowBooking(true);
    }
  };

  // If user is logged in, show booking directly
  if (user) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <ConsultantBooking
          userId={user.id}
          userEmail={user.email}
          userName={user.name}
          userPhone={user.phone || undefined}
        />
      </div>
    );
  }

  // If guest has filled form, show booking
  if (showBooking) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <ConsultantBooking
          userEmail={guestInfo.email}
          userName={guestInfo.name}
          userPhone={guestInfo.phone}
        />
      </div>
    );
  }

  // Show guest form
  return (
    <div className="min-h-screen bg-gray-100 py-8 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Book a Consultation
            </h2>
            <p className="text-gray-600">
              Please provide your details to continue
            </p>
          </div>

          {/* Guest Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={guestInfo.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={guestInfo.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={guestInfo.phone}
                  onChange={handleInputChange}
                  placeholder="+971 50 123 4567"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-3 rounded-lg font-semibold transition-all ${
                isFormValid
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue to Booking
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                Log in
              </a>
            </p>
          </div>

          {/* Info Note */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              Your information is secure and will only be used to process your consultation booking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
