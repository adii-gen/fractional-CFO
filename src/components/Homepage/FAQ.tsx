// types/faq.ts
// export interface FAQ {
//   id: string;
//   category: string | null;
//   question: string;
//   answers: {
//     main: string;
//     details?: string[];
//   } | string;
//   order: number;
//   isActive: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

export interface FAQApiResponse {
  success: boolean;
  data: FAQ[];
}

// export interface FAQItem extends FAQ {
//   isOpen?: boolean;
// }

// components/FAQSection.tsx
'use client';

import { useState, useEffect } from 'react';

interface FAQ {
  id: string;
  category: string | null;
  question: string;
  answers: {
    main: string;
    details?: string[];
  } | string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface FAQItem extends FAQ {
  isOpen?: boolean;
}

const FAQSection = () => {
  const [allFaqs, setAllFaqs] = useState<FAQItem[]>([]);
  const [displayedFaqs, setDisplayedFaqs] = useState<FAQItem[]>([]);
  const [displayCount, setDisplayCount] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFAQs();
  }, []);

  useEffect(() => {
    // Update displayed FAQs when search query or display count changes
    const filtered = allFaqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getAnswerText(faq.answers).toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDisplayedFaqs(filtered.slice(0, displayCount));
  }, [allFaqs, searchQuery, displayCount]);

  const fetchFAQs = async () => {
    try {
      const response = await fetch('/api/faq');
      
      if (!response.ok) {
        throw new Error('Failed to fetch FAQs');
      }

      const result = await response.json();
      
      if (result.success) {
        const faqsWithOpen = result.data.map((faq: FAQ) => ({
          ...faq,
          isOpen: false
        }));
        setAllFaqs(faqsWithOpen);
        setDisplayedFaqs(faqsWithOpen.slice(0, 5));
      } else {
        throw new Error('API returned unsuccessful response');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching FAQs:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFAQ = (id: string) => {
    setDisplayedFaqs(displayedFaqs.map(faq => ({
      ...faq,
      isOpen: faq.id === id ? !faq.isOpen : false
    })));
  };

  const loadMore = () => {
    setDisplayCount(prev => prev + 5);
  };

  const getAnswerText = (answers: FAQ['answers']): string => {
    if (typeof answers === 'string') {
      return answers;
    }
    
    let text = answers.main || '';
    if (answers.details && answers.details.length > 0) {
      text += '\n\n' + answers.details.join('\n');
    }
    return text;
  };

  const formatAnswer = (answers: FAQ['answers']) => {
    const answerText = getAnswerText(answers);
    
    return answerText.split('\n').map((line, lineIndex) => {
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

  const filteredFaqsCount = allFaqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    getAnswerText(faq.answers).toLowerCase().includes(searchQuery.toLowerCase())
  ).length;

  const hasMore = displayCount < filteredFaqsCount;

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
        <div className="text-center mb-12">
          <div className="h-10 bg-gray-300 rounded w-96 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded w-full max-w-2xl mx-auto animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-b border-gray-200 py-6">
              <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
        <div className="text-center py-12">
          <p className="text-red-600 text-lg">Error loading FAQs: {error}</p>
        </div>
      </div>
    );
  }

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
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setDisplayCount(5); // Reset to show first 5 when searching
            }}
            placeholder="Q. Search questions..."
            className="w-full px-4 py-1 text-gray-900 placeholder-gray-500 border-b border-gray-300 focus:outline-none focus:border-blue-500 text-lg"
          />
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-0">
        {displayedFaqs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">
              No FAQs found matching your search.
            </p>
          </div>
        ) : (
          <>
            {displayedFaqs.map((faq) => (
              <div key={faq.id} className="border-b border-gray-200 last:border-b-0">
                {/* Question with toggle button */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full py-6 flex justify-between items-center text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex-1 pr-8">
                    {/* {faq.category && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mb-2 inline-block">
                        {faq.category}
                      </span>
                    )} */}
                    <h2 className="text-xl font-semibold text-gray-900">
                      {faq.question}
                    </h2>
                  </div>
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
                    {formatAnswer(faq.answers)}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Load More Button */}
            {hasMore && (
              <div className="text-center pt-8 pb-4">
                <button
                  onClick={loadMore}
                  className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Load More FAQs
                </button>
                <p className="text-sm text-gray-500 mt-3">
                  Showing {displayedFaqs.length} of {filteredFaqsCount} FAQs
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FAQSection;