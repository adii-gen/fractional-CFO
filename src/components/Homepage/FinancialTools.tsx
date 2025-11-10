'use client'
import { useState } from 'react';
import Swal from 'sweetalert2'; // ✅ import SweetAlert2

const TrustedSection = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
  if (!email) return;
  
  setIsLoading(true);
  try {
    const response = await fetch('/api/send-free-tools', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
     Swal.fire({
          title: 'Success!',
          text: 'Free tools email sent successfully!',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Okay',
        });
      setEmail('');
    } else {
      throw new Error(data.error || 'Failed to send email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    alert('Failed to send email. Please try again.');
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* Left Column - Testimonial */}
        <div className="space-y-8">
          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-900">
            Trusted by Leaders. Free for You.
          </h1>

          {/* Testimonial */}
          <div className="space-y-6">
            <blockquote className="text-lg text-gray-700 leading-relaxed italic">
              "These tools have completely transformed our strategic planning process. The insights are invaluable, allowing us to forecast with unprecedented accuracy and stay ahead of market shifts. It's an essential part of our financial toolkit."
            </blockquote>

            <div className="space-y-1">
              <p className="font-semibold text-gray-900">Ninoslav Dmitrijivic</p>
              <p className="text-gray-600">Chief Financial Officer, Innovate Corp</p>
            </div>
          </div>

          {/* Separator */}
          <div className="border-b border-gray-200 w-full"></div>
        </div>

        {/* Right Column - Features & Signup */}
        <div className="space-y-8">
          {/* Header */}
          <h2 className="text-2xl font-bold text-gray-900">
            Unlock Strategic Financial Insights Instantly.
          </h2>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed">
            Streamline forecasting, analyze market trends, and enhance decision-making with our suite of powerful, intuitive financial tools designed for executives.
          </p>

          {/* Features List */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-700">Analyze Market Trends</span>
            </div>

            <div className="flex items-center">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-700">Streamline Forecasting</span>
            </div>

            <div className="flex items-center">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-700">Enhance Decision-Making</span>
            </div>

            {/* Email Input */}
            <div className="flex items-center pt-2">
              <div className="w-5 h-5 border-2 border-gray-300 rounded mr-3 flex-shrink-0"></div>
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-gray-700 placeholder-gray-500 border-0 border-b border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent"
                />
              </div>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="space-y-1">
           

            {/* CTA Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading || !email}
              className="w-full bg-gray-900 text-white py-4 px-6 rounded-md font-semibold text-lg hover:bg-gray-800 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Claim Free Access'}
            </button>
            <p className='text-xs italic text-end '> *We respect your privacy • No spam*</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedSection;