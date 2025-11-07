// components/TrustedSection.tsx
const TrustedSection = () => {
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
              <p className="font-semibold text-gray-900">Jane Doe</p>
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
                  className="w-full px-3 py-2 text-gray-700 placeholder-gray-500 border-0 border-b border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent"
                />
              </div>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              We respect your privacy • No spam.
            </p>

            {/* Separator */}
            <div className="border-b border-gray-200 w-full"></div>

            {/* CTA Button */}
            <button className="w-full bg-gray-900 text-white py-4 px-6 rounded-none font-semibold text-lg hover:bg-gray-800 transition-colors duration-200">
              Claim Free Access
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedSection;