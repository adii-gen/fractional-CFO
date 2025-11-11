// import React, { useState, useRef, useEffect } from 'react';
// import { MessageCircle, X, Send, User, Mail, Phone, Building } from 'lucide-react';

// interface Message {
//   type: 'bot' | 'user' | 'system';
//   content: string;
//   timestamp: Date;
// }

// interface UserData {
//   name: string;
//   email: string;
//   phone: string;
//   company: string;
// }

// interface FAQItem {
//   id: number;
//   question: string;
//   answer: string;
// }

// const ConsultingChatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       type: 'bot',
//       content: 'Hello! Welcome to FRACTIONAL CXO Consulting Services. I\'m here to help answer your questions about our services.\n\nBefore we begin, could you please provide your details so we can better assist you?',
//       timestamp: new Date()
//     }
//   ]);
//   const [userData, setUserData] = useState<UserData>({
//     name: '',
//     email: '',
//     phone: '',
//     company: ''
//   });
//   const [currentStep, setCurrentStep] = useState<'name' | 'email' | 'phone' | 'company' | 'complete'>('name');
//   const [inputText, setInputText] = useState('');
//   const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const faqItems: FAQItem[] = [
//     {
//       id: 1,
//       question: "What services do you offer?",
//       answer: `We provide a comprehensive suite of strategic consulting services tailored for C-suite executives, including market analysis, digital transformation, leadership development, and operational efficiency optimization. Our solutions are designed to address the unique challenges faced by modern enterprises.

// Our core offerings include:

// - Go-to-Market Strategy
// - Change Management & Organizational Design
// - Technology & Innovation Advisory
// - Financial Modeling & Performance Management`
//     },
//     {
//       id: 2,
//       question: "How do you ensure data security?",
//       answer: "We implement enterprise-grade security measures including end-to-end encryption, SOC 2 Type II compliance, regular security audits, and strict access controls. All data is stored in secure, compliant cloud infrastructure with 24/7 monitoring and threat detection."
//     },
//     {
//       id: 3,
//       question: "What is the onboarding process like?",
//       answer: "Our onboarding process typically takes 2-4 weeks and includes: initial discovery session, needs assessment, solution design, implementation planning, and team training. We assign a dedicated onboarding specialist to ensure a smooth transition and quick time-to-value."
//     },
//     {
//       id: 4,
//       question: "Can I customize my service package?",
//       answer: "Yes, all our service packages are modular and can be customized to meet your specific needs. You can mix and match services, adjust engagement levels, and scale resources up or down based on your requirements and budget."
//     },
//     {
//       id: 5,
//       question: "Who is the ideal customer for your services?",
//       answer: "Our ideal customers are C-suite executives in mid-to-large enterprises across various industries who are facing strategic challenges related to digital transformation, market expansion, operational efficiency, or organizational change management."
//     }
//   ];

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const addMessage = (content: string, type: 'bot' | 'user' | 'system') => {
//     const newMessage: Message = {
//       type,
//       content,
//       timestamp: new Date()
//     };
//     setMessages(prev => [...prev, newMessage]);
//   };
// const createChatbotInquiry = async (userData: UserData): Promise<boolean> => {
//   try {
//     const response = await fetch('/api/chatbot/inquiries', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         name: userData.name,
//         email: userData.email,
//         phone: userData.phone,
        
//         // message: 'Chatbot inquiry from website',
//       }),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to create inquiry');
//     }

//     const result = await response.json();
//     console.log('✅ Inquiry created:', result);
//     return true;
//   } catch (error) {
//     console.error('Error creating inquiry:', error);
//     return false;
//   }
// };
//   const handleUserDataInput = async (value: string) => {
//     const updatedUserData = { ...userData };

//     switch (currentStep) {
//       case 'name':
//         updatedUserData.name = value;
//         setUserData(updatedUserData);
//         addMessage(value, 'user');
//         addMessage('Thank you! What\'s your email address?', 'bot');
//         setCurrentStep('email');
//         break;

//       case 'email':
//         if (!validateEmail(value)) {
//           addMessage('Please enter a valid email address.', 'bot');
//           return;
//         }
//         updatedUserData.email = value;
//         setUserData(updatedUserData);
//         addMessage(value, 'user');
//         addMessage('Great! What\'s your phone number?', 'bot');
//         setCurrentStep('phone');
//         break;

//       case 'phone':
//         updatedUserData.phone = value;
//         setUserData(updatedUserData);
//         addMessage(value, 'user');
//         addMessage('Perfect! Which company do you represent?', 'bot');
//         setCurrentStep('company');
//         console.log("completed p1")
//         break;
//       case 'company':
//          updatedUserData.company = value;
//   setUserData(updatedUserData);
//   addMessage(value, 'user');
  
//   // Create inquiry in database
//   setIsWaitingForResponse(true);
//   console.log("loggggg",updatedUserData);
//   const success = await createChatbotInquiry(updatedUserData);
//   if (success) {
//     console.log("success hoya")
    
//   }
//   else{
//     console.log("something failed")
//   }
//   console.log("success completet");
//   setIsWaitingForResponse(false);
  
//   if (success) {
//     addMessage(`🎉 Thank you, ${userData.name}!

// ✅ Your inquiry has been submitted successfully
// ✅ Our team has been notified
// ✅ We'll contact you at ${userData.email} within 24 hours

// In the meantime, feel free to ask any questions about our services!`, 'bot');
//   } else {
//     addMessage(`Thank you for your details, ${userData.name}! Our team will contact you at ${userData.email} shortly.`, 'bot');
//   }
  
//   setCurrentStep('complete');
//   break;
//     }

//     setInputText('');
//   };

//   const validateEmail = (email: string): boolean => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const sendAdminNotification = (userData: UserData) => {
//     // In a real application, this would send an email/notification to the admin
//     console.log('New user inquiry:', userData);
//     // addMessage(`[System] User ${userData.name} from ${userData.company} has started a conversation. Email: ${userData.email}, Phone: ${userData.phone}`, 'system');
//   };

//   const handleFAQClick = (faq: FAQItem) => {
//     addMessage(faq.question, 'user');
    
//     // Simulate typing delay
//     setIsWaitingForResponse(true);
//     setTimeout(() => {
//       addMessage(faq.answer, 'bot');
//       setIsWaitingForResponse(false);
//     }, 1000);
//   };

//   const handleSendMessage = () => {
//     if (!inputText.trim() || isWaitingForResponse) return;

//     if (currentStep !== 'complete') {
//       handleUserDataInput(inputText);
//       return;
//     }

//     // Handle regular conversation after user data collection
//     addMessage(inputText, 'user');
//     setInputText('');
    
//     // Simulate AI response or human agent connection
//     setIsWaitingForResponse(true);
//     setTimeout(() => {
//       const lowerText = inputText.toLowerCase();
      
//       if (lowerText.includes('contact') || lowerText.includes('speak') || lowerText.includes('human')) {
//         addMessage(`I've notified our team about your request to speak with someone. ${userData.name ? `${userData.name}, ` : ''}Our consultant will contact you at ${userData.email || 'your email'} shortly.

// Is there anything specific you'd like to discuss in the meantime?`, 'bot');
//       } else if (lowerText.includes('thank') || lowerText.includes('thanks')) {
//         addMessage('You\'re welcome! Is there anything else I can help you with?', 'bot');
//       } else {
//         // Try to find relevant FAQ
//         const relevantFAQ = faqItems.find(faq => 
//           inputText.toLowerCase().includes(faq.question.toLowerCase().split(' ').slice(0, 3).join(' ').toLowerCase())
//         );

//         if (relevantFAQ) {
//           addMessage(relevantFAQ.answer, 'bot');
//         } else {
//           addMessage(`Thank you for your question. I've recorded your inquiry about "${inputText}" and our team will address this when they contact you.

// In the meantime, you might find these topics helpful:
// ${faqItems.slice(0, 3).map(item => `• ${item.question}`).join('\n')}`, 'bot');
//         }
//       }
//       setIsWaitingForResponse(false);
//     }, 1500);
//   };

//   const getInputPlaceholder = () => {
//     switch (currentStep) {
//       case 'name': return 'Enter your full name...';
//       case 'email': return 'Enter your email address...';
//       case 'phone': return 'Enter your phone number...';
//       case 'company': return 'Enter your company name...';
//       default: return 'Type your message...';
//     }
//   };

//   const getStepIcon = () => {
//     switch (currentStep) {
//       case 'name': return <User className="w-4 h-4" />;
//       case 'email': return <Mail className="w-4 h-4" />;
//       case 'phone': return <Phone className="w-4 h-4" />;
//       case 'company': return <Building className="w-4 h-4" />;
//       default: return <Send className="w-4 h-4" />;
//     }
//   };

//   const formatMessage = (content: string) => {
//     const parts = content.split('\n');
//     return parts.map((part, index) => {
//       if (part.startsWith('• ')) {
//         return (
//           <div key={index} className="flex items-start ml-2 mb-1">
//             <span className="mr-2">•</span>
//             <span>{part.substring(2)}</span>
//           </div>
//         );
//       }
//       if (part.startsWith('[System]')) {
//         return <div key={index} className="text-xs text-gray-500 italic">{part}</div>;
//       }
//       return <div key={index} className={part ? "mb-1" : "mb-2"}>{part}</div>;
//     });
//   };

//   return (
//     <div className="fixed bottom-6 right-6 z-50">
//       {/* Chat Button */}
//       <button
//         onClick={() => setIsOpen(true)}
//         className={`bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 ${isOpen ? 'hidden' : 'flex'} items-center justify-center group`}
//       >
//         <MessageCircle className="w-6 h-6" />
//         <span className="absolute -top-2 -left-2 bg-green-500 text-white text-xs rounded-full px-2 py-1 animate-pulse">
//           Chat
//         </span>
//       </button>

//       {/* Chat Window */}
//       {isOpen && (
//         <div className="bg-white rounded-lg shadow-2xl w-[400px] h-[600px] flex flex-col border border-gray-200">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-green-700 to-primary text-white p-4 rounded-t-lg flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
//                 <Building className="w-4 h-4" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-sm">Strategic Consulting</h3>
//                 <p className="text-xs text-blue-100">
//                   {currentStep === 'complete' ? 'Ready to help' : 'Collecting info...'}
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={() => setIsOpen(false)}
//               className="hover:bg-white/20 rounded-full p-1 transition-colors"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>

//           {/* Messages Area */}
//           <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-gray-50">
//             {messages.map((message, index) => (
//               <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
//                 <div className={`max-w-[85%] p-3 rounded-lg text-sm ${
//                   message.type === 'user' 
//                     ? 'bg-blue-500 text-white rounded-br-none' 
//                     : message.type === 'system'
//                     ? 'bg-yellow-100 text-yellow-800 border border-yellow-200 text-xs'
//                     : 'bg-white text-gray-800 shadow-sm border rounded-bl-none'
//                 }`}>
//                   {formatMessage(message.content)}
//                 </div>
//               </div>
//             ))}

//             {/* FAQ Quick Links */}
//             {currentStep === 'complete' && (
//               <div className="space-y-2 mt-4">
//                 <div className="text-xs text-gray-500 font-medium">Quick Questions:</div>
//                 <div className="grid grid-cols-1 gap-1">
//                   {faqItems.slice(0, 3).map((faq) => (
//                     <button
//                       key={faq.id}
//                       onClick={() => handleFAQClick(faq)}
//                       disabled={isWaitingForResponse}
//                       className="flex items-center space-x-2 p-2 bg-white border border-blue-100 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-sm text-left disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <span className="text-gray-700">{faq.question}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {isWaitingForResponse && (
//               <div className="flex justify-start">
//                 <div className="bg-white border rounded-lg rounded-bl-none p-3 text-sm">
//                   <div className="flex space-x-1">
//                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
//                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input Area */}
//           <div className="p-3 border-t bg-white rounded-b-lg">
//             <div className="flex space-x-2">
//               <div className="flex-1 relative">
//                 <input
//                   type="text"
//                   value={inputText}
//                   onChange={(e) => setInputText(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                   placeholder={getInputPlaceholder()}
//                   disabled={isWaitingForResponse}
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
//                 />
//                 {currentStep !== 'complete' && (
//                   <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
//                     {getStepIcon()}
//                   </div>
//                 )}
//               </div>
//               <button
//                 onClick={handleSendMessage}
//                 disabled={!inputText.trim() || isWaitingForResponse}
//                 className="bg-primary  hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg p-2 transition-colors disabled:cursor-not-allowed"
//               >
//                 <Send className="w-4 h-4 font-black text-black" />
//               </button>
//             </div>
//             <div className="text-xs text-gray-500 mt-1 text-center">
//               {currentStep === 'complete' ? `Connected as ${userData.name}` : 'We respect your privacy'}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ConsultingChatbot;


import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Mail, Phone, Building, MessageSquare } from 'lucide-react';

interface Message {
  type: 'bot' | 'user' | 'system';
  content: string;
  timestamp: Date;
}

interface UserData {
  name: string;
  email: string;
  phone: string;
  company: string;
  query: string;
}

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const ConsultingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: 'Hello! Welcome to FRACTIONAL CXO Consulting Services. I\'m here to help answer your questions about our services.\n\nBefore we begin, could you please provide your details so we can better assist you?',
      timestamp: new Date()
    }
  ]);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    query: ''
  });
  const [currentStep, setCurrentStep] = useState<'name' | 'email' | 'phone' | 'company' | 'query' | 'complete'>('name');
  const [inputText, setInputText] = useState('');
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "What services do you offer?",
      answer: `We provide a comprehensive suite of strategic consulting services tailored for C-suite executives, including market analysis, digital transformation, leadership development, and operational efficiency optimization. Our solutions are designed to address the unique challenges faced by modern enterprises.

Our core offerings include:

- Go-to-Market Strategy
- Change Management & Organizational Design
- Technology & Innovation Advisory
- Financial Modeling & Performance Management`
    },
    {
      id: 2,
      question: "How do you ensure data security?",
      answer: "We implement enterprise-grade security measures including end-to-end encryption, SOC 2 Type II compliance, regular security audits, and strict access controls. All data is stored in secure, compliant cloud infrastructure with 24/7 monitoring and threat detection."
    },
    {
      id: 3,
      question: "What is the onboarding process like?",
      answer: "Our onboarding process typically takes 2-4 weeks and includes: initial discovery session, needs assessment, solution design, implementation planning, and team training. We assign a dedicated onboarding specialist to ensure a smooth transition and quick time-to-value."
    },
    {
      id: 4,
      question: "Can I customize my service package?",
      answer: "Yes, all our service packages are modular and can be customized to meet your specific needs. You can mix and match services, adjust engagement levels, and scale resources up or down based on your requirements and budget."
    },
    {
      id: 5,
      question: "Who is the ideal customer for your services?",
      answer: "Our ideal customers are C-suite executives in mid-to-large enterprises across various industries who are facing strategic challenges related to digital transformation, market expansion, operational efficiency, or organizational change management."
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (content: string, type: 'bot' | 'user' | 'system') => {
    const newMessage: Message = {
      type,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const createChatbotInquiry = async (userData: UserData): Promise<boolean> => {
    try {
      const response = await fetch('/api/chatbot/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          company: userData.company,
          message: userData.query, // Include the user's query in the message field
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create inquiry');
      }

      const result = await response.json();
      console.log('✅ Inquiry created:', result);
      return true;
    } catch (error) {
      console.error('Error creating inquiry:', error);
      return false;
    }
  };

  const handleUserDataInput = async (value: string) => {
    const updatedUserData = { ...userData };

    switch (currentStep) {
      case 'name':
        updatedUserData.name = value;
        setUserData(updatedUserData);
        addMessage(value, 'user');
        addMessage('Thank you! What\'s your email address?', 'bot');
        setCurrentStep('email');
        break;

      case 'email':
        if (!validateEmail(value)) {
          addMessage('Please enter a valid email address.', 'bot');
          return;
        }
        updatedUserData.email = value;
        setUserData(updatedUserData);
        addMessage(value, 'user');
        addMessage('Great! What\'s your phone number?', 'bot');
        setCurrentStep('phone');
        break;

      case 'phone':
        updatedUserData.phone = value;
        setUserData(updatedUserData);
        addMessage(value, 'user');
        addMessage('Perfect! Which company do you represent?', 'bot');
        setCurrentStep('company');
        break;

      case 'company':
        updatedUserData.company = value;
        setUserData(updatedUserData);
        addMessage(value, 'user');
        addMessage('Thank you! Could you please tell us what you\'re looking for or any specific questions you have about our consulting services?', 'bot');
        setCurrentStep('query');
        break;

      case 'query':
        updatedUserData.query = value;
        setUserData(updatedUserData);
        addMessage(value, 'user');
        
        // Create inquiry in database with all data including the query
        setIsWaitingForResponse(true);
        console.log("Submitting inquiry with data:", updatedUserData);
        const success = await createChatbotInquiry(updatedUserData);
        
        setIsWaitingForResponse(false);
        
        if (success) {
          addMessage(`🎉 Thank you, ${userData.name}!

✅ Your inquiry has been submitted successfully
✅ Our team has been notified about your query: "${value}"
✅ We'll contact you at ${userData.email} within 24 hours

In the meantime, feel free to ask any additional questions about our services!`, 'bot');
        } else {
          addMessage(`Thank you for your details and query, ${userData.name}! Our team will review your message about "${value}" and contact you at ${userData.email} shortly.`, 'bot');
        }
        
        setCurrentStep('complete');
        break;
    }

    setInputText('');
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleFAQClick = (faq: FAQItem) => {
    addMessage(faq.question, 'user');
    
    // Simulate typing delay
    setIsWaitingForResponse(true);
    setTimeout(() => {
      addMessage(faq.answer, 'bot');
      setIsWaitingForResponse(false);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!inputText.trim() || isWaitingForResponse) return;

    if (currentStep !== 'complete') {
      handleUserDataInput(inputText);
      return;
    }

    // Handle regular conversation after user data collection
    addMessage(inputText, 'user');
    setInputText('');
    
    // Simulate AI response or human agent connection
    setIsWaitingForResponse(true);
    setTimeout(() => {
      const lowerText = inputText.toLowerCase();
      
      if (lowerText.includes('contact') || lowerText.includes('speak') || lowerText.includes('human')) {
        addMessage(`I've notified our team about your request to speak with someone. ${userData.name ? `${userData.name}, ` : ''}Our consultant will contact you at ${userData.email || 'your email'} shortly.

Is there anything specific you'd like to discuss in the meantime?`, 'bot');
      } else if (lowerText.includes('thank') || lowerText.includes('thanks')) {
        addMessage('You\'re welcome! Is there anything else I can help you with?', 'bot');
      } else {
        // Try to find relevant FAQ
        const relevantFAQ = faqItems.find(faq => 
          inputText.toLowerCase().includes(faq.question.toLowerCase().split(' ').slice(0, 3).join(' ').toLowerCase())
        );

        if (relevantFAQ) {
          addMessage(relevantFAQ.answer, 'bot');
        } else {
          addMessage(`Thank you for your question. I've recorded your inquiry about "${inputText}" and our team will address this when they contact you.

In the meantime, you might find these topics helpful:
${faqItems.slice(0, 3).map(item => `• ${item.question}`).join('\n')}`, 'bot');
        }
      }
      setIsWaitingForResponse(false);
    }, 1500);
  };

  const getInputPlaceholder = () => {
    switch (currentStep) {
      case 'name': return 'Enter your full name...';
      case 'email': return 'Enter your email address...';
      case 'phone': return 'Enter your phone number...';
      case 'company': return 'Enter your company name...';
      case 'query': return 'Tell us about your query or what you\'re looking for...';
      default: return 'Type your message...';
    }
  };

  const getStepIcon = () => {
    switch (currentStep) {
      case 'name': return <User className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      case 'company': return <Building className="w-4 h-4" />;
      case 'query': return <MessageSquare className="w-4 h-4" />;
      default: return <Send className="w-4 h-4" />;
    }
  };

  const formatMessage = (content: string) => {
    const parts = content.split('\n');
    return parts.map((part, index) => {
      if (part.startsWith('• ')) {
        return (
          <div key={index} className="flex items-start ml-2 mb-1">
            <span className="mr-2">•</span>
            <span>{part.substring(2)}</span>
          </div>
        );
      }
      if (part.startsWith('[System]')) {
        return <div key={index} className="text-xs text-gray-500 italic">{part}</div>;
      }
      return <div key={index} className={part ? "mb-1" : "mb-2"}>{part}</div>;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 ${isOpen ? 'hidden' : 'flex'} items-center justify-center group`}
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-2 -left-2 bg-green-500 text-white text-xs rounded-full px-2 py-1 animate-pulse">
          Chat
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-[400px] h-[600px] flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-700 to-primary text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Strategic Consulting</h3>
                <p className="text-xs text-blue-100">
                  {currentStep === 'complete' ? 'Ready to help' : 'Collecting info...'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-gray-50">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-lg text-sm ${
                  message.type === 'user' 
                    ? 'bg-blue-500 text-white rounded-br-none' 
                    : message.type === 'system'
                    ? 'bg-yellow-100 text-yellow-800 border border-yellow-200 text-xs'
                    : 'bg-white text-gray-800 shadow-sm border rounded-bl-none'
                }`}>
                  {formatMessage(message.content)}
                </div>
              </div>
            ))}

            {/* FAQ Quick Links */}
            {currentStep === 'complete' && (
              <div className="space-y-2 mt-4">
                <div className="text-xs text-gray-500 font-medium">Quick Questions:</div>
                <div className="grid grid-cols-1 gap-1">
                  {faqItems.slice(0, 3).map((faq) => (
                    <button
                      key={faq.id}
                      onClick={() => handleFAQClick(faq)}
                      disabled={isWaitingForResponse}
                      className="flex items-center space-x-2 p-2 bg-white border border-blue-100 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-sm text-left disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="text-gray-700">{faq.question}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isWaitingForResponse && (
              <div className="flex justify-start">
                <div className="bg-white border rounded-lg rounded-bl-none p-3 text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t bg-white rounded-b-lg">
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={getInputPlaceholder()}
                  disabled={isWaitingForResponse}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                {currentStep !== 'complete' && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                    {getStepIcon()}
                  </div>
                )}
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isWaitingForResponse}
                className="bg-primary hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg p-2 transition-colors disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4 font-black text-black" />
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-1 text-center">
              {currentStep === 'complete' ? `Connected as ${userData.name}` : 'We respect your privacy'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultingChatbot;