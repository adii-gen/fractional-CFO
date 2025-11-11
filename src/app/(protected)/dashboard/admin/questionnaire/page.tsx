// // app/admin/questionnaire/page.tsx
// "use client";

// import { useState, useEffect } from "react";

// interface Session {
//   id: string;
//   sessionToken: string;
//   userName: string | null;
//   userEmail: string | null;
//   userPhone: string | null;
//   isCompleted: boolean;
//   completedAt: string | null;
//   createdAt: string;
//   result: {
//     businessType: string | null;
//     country: string | null;
//     facilityType: string | null;
//     budgetRange: string | null;
//     isReviewed: boolean;
//   } | null;
// }

// interface JourneyStep {
//   questionText: string;
//   questionOrder: number;
//   questionType: string;
//   selectedOption: {
//     text: string;
//     value: string;
//   } | null;
//   textAnswer: string | null;
//   answeredAt: string;
// }

// export default function AdminQuestionnaireDashboard() {
//   const [sessions, setSessions] = useState<Session[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState<"all" | "completed" | "in_progress">("all");
//   const [selectedSession, setSelectedSession] = useState<Session | null>(null);
//   const [journey, setJourney] = useState<JourneyStep[]>([]);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     fetchSessions();
//   }, [filter]);

//   const fetchSessions = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `/api/questionnaire/sessions?status=${filter}`
//       );
//       const data = await response.json();

//       if (data.success) {
//         setSessions(data.sessions);
//       }
//     } catch (error) {
//       console.error("Failed to fetch sessions:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const viewSessionDetails = async (session: Session) => {
//     try {
//       const response = await fetch("/api/questionnaire/sessions", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ sessionId: session.id }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         setSelectedSession(session);
//         setJourney(data.journey);
//         setShowModal(true);
//       }
//     } catch (error) {
//       console.error("Failed to fetch session details:", error);
//     }
//   };

//   const getStatusBadge = (isCompleted: boolean) => {
//     return isCompleted ? (
//       <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
//         ✓ Completed
//       </span>
//     ) : (
//       <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
//         ⏳ In Progress
//       </span>
//     );
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Questionnaire Responses
//           </h1>
//           <p className="text-gray-600">
//             View and manage all user questionnaire submissions
//           </p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm">Total Submissions</p>
//                 <p className="text-3xl font-bold text-gray-900 mt-1">
//                   {sessions.length}
//                 </p>
//               </div>
//               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                 <svg
//                   className="w-6 h-6 text-blue-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm">Completed</p>
//                 <p className="text-3xl font-bold text-green-600 mt-1">
//                   {sessions.filter((s) => s.isCompleted).length}
//                 </p>
//               </div>
//               <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                 <svg
//                   className="w-6 h-6 text-green-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm">In Progress</p>
//                 <p className="text-3xl font-bold text-yellow-600 mt-1">
//                   {sessions.filter((s) => !s.isCompleted).length}
//                 </p>
//               </div>
//               <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
//                 <svg
//                   className="w-6 h-6 text-yellow-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-lg shadow mb-6 p-4">
//           <div className="flex gap-2">
//             <button
//               onClick={() => setFilter("all")}
//               className={`px-4 py-2 rounded-lg font-medium transition ${
//                 filter === "all"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//               }`}
//             >
//               All
//             </button>
//             <button
//               onClick={() => setFilter("completed")}
//               className={`px-4 py-2 rounded-lg font-medium transition ${
//                 filter === "completed"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//               }`}
//             >
//               Completed
//             </button>
//             <button
//               onClick={() => setFilter("in_progress")}
//               className={`px-4 py-2 rounded-lg font-medium transition ${
//                 filter === "in_progress"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//               }`}
//             >
//               In Progress
//             </button>
//           </div>
//         </div>

//         {/* Sessions Table */}
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     User
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Contact
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Business Type
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Country
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Date
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {loading ? (
//                   <tr>
//                     <td colSpan={7} className="px-6 py-12 text-center">
//                       <div className="flex justify-center">
//                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : sessions.length === 0 ? (
//                   <tr>
//                     <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
//                       No sessions found
//                     </td>
//                   </tr>
//                 ) : (
//                   sessions.map((session) => (
//                     <tr key={session.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4">
//                         <div className="font-medium text-gray-900">
//                           {session.userName || "Anonymous"}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="text-sm text-gray-600">
//                           {session.userEmail || "-"}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           {session.userPhone || "-"}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         {getStatusBadge(session.isCompleted)}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-600">
//                         {session.result?.businessType?.replace(/_/g, " ") || "-"}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-600">
//                         {session.result?.country?.toUpperCase() || "-"}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-600">
//                         {formatDate(session.createdAt)}
//                       </td>
//                       <td className="px-6 py-4">
//                         <button
//                           onClick={() => viewSessionDetails(session)}
//                           className="text-blue-600 hover:text-blue-800 font-medium"
//                         >
//                           View Journey
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Modal for Journey Details */}
//       {showModal && selectedSession && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900">
//                   User Journey
//                 </h2>
//                 <p className="text-gray-600 mt-1">
//                   {selectedSession.userName} ({selectedSession.userEmail})
//                 </p>
//               </div>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>

//             <div className="p-6 space-y-4">
//               {journey.map((step, index) => (
//                 <div
//                   key={index}
//                   className="border-l-4 border-blue-600 pl-4 py-2"
//                 >
//                   <div className="flex items-start justify-between mb-2">
//                     <p className="font-semibold text-gray-900">
//                       Q{step.questionOrder}: {step.questionText}
//                     </p>
//                     <span className="text-xs text-gray-500">
//                       {formatDate(step.answeredAt)}
//                     </span>
//                   </div>
//                   <p className="text-blue-600 font-medium">
//                     {step.selectedOption?.text || step.textAnswer}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



"use client";

import { useState, useEffect, useRef } from "react";

interface Question {
  id: string;
  text: string;
  type: string;
  placeholder?: string;
  isRequired: boolean;
  order: number;
}

interface Option {
  id: string;
  text: string;
  value: string;
}

export default function QuestionnairePage() {
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [options, setOptions] = useState<Option[]>([]);
  const [answer, setAnswer] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [completionMessage, setCompletionMessage] = useState("");
  const [error, setError] = useState("");
  
  // Prevent duplicate calls
  const isSubmitting = useRef(false);
  const hasStarted = useRef(false);

  // Start questionnaire - only once
  useEffect(() => {
    if (!hasStarted.current) {
      hasStarted.current = true;
      startQuestionnaire();
    }
  }, []);

  const startQuestionnaire = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/questionnaire/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionnaireType: "BUSINESS_SETUP" }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSessionToken(data.sessionToken);
        setSessionId(data.sessionId);
        setCurrentQuestion(data.question);
        setOptions(data.options || []);
      } else {
        setError(data.error || "Failed to start questionnaire");
      }
    } catch (err) {
      setError("Failed to start questionnaire");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    // Prevent duplicate submissions
    if (isSubmitting.current || loading) {
      console.log("Already submitting, ignoring...");
      return;
    }

    if (!sessionToken || !currentQuestion) return;

    // Validate required fields
    if (currentQuestion.isRequired) {
      if (currentQuestion.type.includes("CHOICE") && !selectedOption) {
        setError("Please select an option");
        return;
      }
      if (currentQuestion.type.includes("INPUT") && !answer.trim()) {
        setError("This field is required");
        return;
      }
    }

    try {
      isSubmitting.current = true; // Lock submissions
      setLoading(true);
      setError("");

      console.log("Submitting answer:", {
        sessionToken,
        questionId: currentQuestion.id,
        selectedOptionId: selectedOption,
        textAnswer: answer.trim() || null,
      });

      const response = await fetch("/api/questionnaire/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionToken,
          questionId: currentQuestion.id,
          selectedOptionId: selectedOption,
          textAnswer: answer.trim() || null,
        }),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (data.success) {
        if (data.completed) {
          setCompleted(true);
          setCompletionMessage(data.message);
        } else {
          setCurrentQuestion(data.question);
          setOptions(data.options || []);
          setAnswer("");
          setSelectedOption(null);
        }
      } else {
        setError(data.error || "Failed to submit answer");
      }
    } catch (err) {
      setError("Failed to submit answer");
      console.error(err);
    } finally {
      setLoading(false);
      // Release lock after a short delay to prevent rapid clicks
      setTimeout(() => {
        isSubmitting.current = false;
      }, 500);
    }
  };

  const renderQuestionInput = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case "YES_NO":
      case "SINGLE_CHOICE":
        return (
          <div className="space-y-3">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                disabled={loading}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  selectedOption === option.id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedOption === option.id
                        ? "border-blue-600"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedOption === option.id && (
                      <div className="w-3 h-3 rounded-full bg-blue-600" />
                    )}
                  </div>
                  <span className="font-medium">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        );

      case "TEXT_INPUT":
        return (
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submitAnswer();
              }
            }}
            placeholder={currentQuestion.placeholder}
            disabled={loading}
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none disabled:opacity-50 disabled:bg-gray-50"
          />
        );

      case "EMAIL_INPUT":
        return (
          <input
            type="email"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submitAnswer();
              }
            }}
            placeholder={currentQuestion.placeholder}
            disabled={loading}
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none disabled:opacity-50 disabled:bg-gray-50"
          />
        );

      case "PHONE_INPUT":
        return (
          <input
            type="tel"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submitAnswer();
              }
            }}
            placeholder={currentQuestion.placeholder}
            disabled={loading}
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none disabled:opacity-50 disabled:bg-gray-50"
          />
        );

      case "NUMBER_INPUT":
        return (
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submitAnswer();
              }
            }}
            placeholder={currentQuestion.placeholder}
            disabled={loading}
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none disabled:opacity-50 disabled:bg-gray-50"
          />
        );

      default:
        return null;
    }
  };

  if (loading && !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading questionnaire...</p>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Questionnaire Completed!
          </h1>
          <p className="text-gray-600 text-lg mb-8">{completionMessage}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Start New Questionnaire
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestion?.order || 1} of 16
            </span>
            <span className="text-sm font-medium text-blue-600">
              {Math.round(((currentQuestion?.order || 1) / 16) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion?.order || 1) / 16) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {currentQuestion?.text}
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}

          <div className="mb-8">{renderQuestionInput()}</div>

          <button
            onClick={submitAnswer}
            disabled={loading || isSubmitting.current}
            className="w-full py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            {loading || isSubmitting.current ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Processing...
              </span>
            ) : (
              "Continue"
            )}
          </button>
        </div>

        {/* Debug Info (Remove in production) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-4 bg-gray-100 rounded text-xs text-gray-600">
            <p>Session: {sessionToken?.substring(0, 8)}...</p>
            <p>Question ID: {currentQuestion?.id.substring(0, 8)}...</p>
            <p>Submitting: {isSubmitting.current ? "Yes" : "No"}</p>
          </div>
        )}
      </div>
    </div>
  );
}