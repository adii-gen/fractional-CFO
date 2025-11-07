// components/FAQSection.tsx
'use client';

import { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  isOpen?: boolean;
}

const FAQSection = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      id: 1,
      question: "What services do you offer?",
      answer: `We provide a comprehensive suite of strategic consulting services tailored for C-suite executives, including market analysis, digital transformation, leadership development, and operational efficiency optimization. Our solutions are designed to address the unique challenges faced by modern enterprises.

Our core offerings include:

- Go-to-Market Strategy
- Change Management & Organizational Design
- Technology & Innovation Advisory
- Financial Modeling & Performance Management`,
      isOpen: false
    },
    {
      id: 2,
      question: "How do you ensure data security?",
      answer: "We implement enterprise-grade security measures including end-to-end encryption, SOC 2 Type II compliance, regular security audits, and strict access controls. All data is stored in secure, compliant cloud infrastructure with 24/7 monitoring and threat detection.",
      isOpen: false
    },
    {
      id: 3,
      question: "What is the onboarding process like?",
      answer: "Our onboarding process typically takes 2-4 weeks and includes: initial discovery session, needs assessment, solution design, implementation planning, and team training. We assign a dedicated onboarding specialist to ensure a smooth transition and quick time-to-value.",
      isOpen: false
    },
    {
      id: 4,
      question: "Can I customize my service package?",
      answer: "Yes, all our service packages are modular and can be customized to meet your specific needs. You can mix and match services, adjust engagement levels, and scale resources up or down based on your requirements and budget.",
      isOpen: false
    },
    {
      id: 5,
      question: "Who is the ideal customer for your services?",
      answer: "Our ideal customers are C-suite executives in mid-to-large enterprises across various industries who are facing strategic challenges related to digital transformation, market expansion, operational efficiency, or organizational change management.",
      isOpen: false
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const toggleFAQ = (id: number) => {
    setFaqs(faqs.map(faq => ({
      ...faq,
      isOpen: faq.id === id ? !faq.isOpen : false
    })));
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatAnswer = (answer: string) => {
    return answer.split('\n').map((line, lineIndex) => {
      if (line.trim() === '') {
        return <br key={lineIndex} />;
      }
      
      if (line.startsWith('- ')) {
        return (
          <div key={lineIndex} className="flex items-start ml-4 mb-1">
            <span className="mr-2">•</span>
            <span>{line.substring(2)}</span>
          </div>
        );
      }
      
      return (
        <p key={lineIndex} className="mb-4 last:mb-0">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-gray-600">
          Find answers to common questions about our services, security, and onboarding process.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Q. Search questions..."
            className="w-full px-4 py-1 text-gray-900 placeholder-gray-500 border-b border-gray-300 focus:outline-none focus:border-blue-500 text-lg"
          />
        </div>
        {/* <div className="border-b border-gray-200 mt-2"></div> */}
      </div>

      {/* FAQ Items */}
      <div className="space-y-0">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">
              No FAQs found matching your search.
            </p>
          </div>
        ) : (
          filteredFaqs.map((faq, index) => (
            <div key={faq.id} className="border-b border-gray-200 last:border-b-0">
              {/* Question with toggle button */}
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full py-6 flex justify-between items-center text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <h2 className="text-xl font-semibold text-gray-900 pr-8">
                  {faq.question}
                </h2>
                <div className="flex-shrink-0 ml-4">
                  <div className={`transform transition-transform duration-300 ${
                    faq.isOpen ? 'rotate-45' : 'rotate-0'
                  }`}>
                    <svg 
                      className="w-6 h-6 text-gray-500" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                      />
                    </svg>
                  </div>
                </div>
              </button>
              
              {/* Answer - Collapsible */}
              <div className={`overflow-hidden transition-all duration-300 ${
                faq.isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="pb-6 text-gray-700 leading-relaxed">
                  {formatAnswer(faq.answer)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FAQSection;