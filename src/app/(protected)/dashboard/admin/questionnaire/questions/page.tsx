// app/admin/questionnaire/questions/page.tsx
"use client";

import { useState, useEffect } from "react";

interface Option {
  id: string;
  optionText: string;
  optionValue: string;
  nextQuestionId: string | null;
  isTerminal: boolean;
  order: number;
}

interface Question {
  id: string;
  questionText: string;
  questionType: string;
  placeholder: string | null;
  isRequired: boolean;
  order: number;
  isRoot: boolean;
  isActive: boolean;
  options: Option[];
}

export default function AdminQuestionManagement() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/questionnaire/questions");
      const data = await response.json();

      if (data.success) {
        setQuestions(data.questions);
      }
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const getQuestionTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      YES_NO: "bg-blue-100 text-blue-700",
      SINGLE_CHOICE: "bg-purple-100 text-purple-700",
      MULTIPLE_CHOICE: "bg-pink-100 text-pink-700",
      TEXT_INPUT: "bg-green-100 text-green-700",
      EMAIL_INPUT: "bg-yellow-100 text-yellow-700",
      PHONE_INPUT: "bg-orange-100 text-orange-700",
      NUMBER_INPUT: "bg-red-100 text-red-700",
    };
    return colors[type] || "bg-gray-100 text-gray-700";
  };

  const renderFlowVisualization = (question: Question) => {
    return (
      <div className="bg-gray-50 rounded-lg p-4 mt-4">
        <h4 className="font-semibold text-gray-900 mb-3">Flow Connections:</h4>
        <div className="space-y-2">
          {question.options.length > 0 ? (
            question.options.map((option) => {
              const nextQ = questions.find((q) => q.id === option.nextQuestionId);
              return (
                <div
                  key={option.id}
                  className="flex items-center gap-2 text-sm"
                >
                  <div className="px-3 py-1 bg-white rounded border border-gray-300">
                    {option.optionText}
                  </div>
                  <span className="text-gray-400">→</span>
                  <div
                    className={`px-3 py-1 rounded ${
                      option.isTerminal
                        ? "bg-red-100 text-red-700 border border-red-300"
                        : "bg-blue-100 text-blue-700 border border-blue-300"
                    }`}
                  >
                    {option.isTerminal
                      ? "END"
                      : nextQ
                      ? `Q${nextQ.order}: ${nextQ.questionText.substring(0, 30)}...`
                      : "Not Set"}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-sm">
              Text input question - flows to next question in sequence
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Question Management
            </h1>
            <p className="text-gray-600">
              View and manage questionnaire flow
            </p>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            + Add Question
          </button>
        </div>

        {/* Questions List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map((question) => (
              <div
                key={question.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                          Q{question.order}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getQuestionTypeColor(
                            question.questionType
                          )}`}
                        >
                          {question.questionType.replace(/_/g, " ")}
                        </span>
                        {question.isRoot && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            ROOT
                          </span>
                        )}
                        {!question.isActive && (
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                            INACTIVE
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {question.questionText}
                      </h3>
                      {question.placeholder && (
                        <p className="text-sm text-gray-500">
                          Placeholder: {question.placeholder}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedQuestion(question);
                          setShowModal(true);
                        }}
                        className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium"
                      >
                        View Flow
                      </button>
                      <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        Edit
                      </button>
                    </div>
                  </div>

                  {/* Options Preview */}
                  {question.options.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Options ({question.options.length}):
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {question.options.map((option) => (
                          <span
                            key={option.id}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                          >
                            {option.optionText}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Flow Visualization Modal */}
      {showModal && selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Question Flow
                </h2>
                <p className="text-gray-600 mt-1">
                  Q{selectedQuestion.order}: {selectedQuestion.questionText}
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6">
              {/* Question Details */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Question Type</p>
                    <p className="font-semibold text-gray-900">
                      {selectedQuestion.questionType.replace(/_/g, " ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Order</p>
                    <p className="font-semibold text-gray-900">
                      {selectedQuestion.order}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Required</p>
                    <p className="font-semibold text-gray-900">
                      {selectedQuestion.isRequired ? "Yes" : "No"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-semibold text-gray-900">
                      {selectedQuestion.isActive ? "Active" : "Inactive"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Flow Visualization */}
              {renderFlowVisualization(selectedQuestion)}

              {/* Options Detail */}
              {selectedQuestion.options.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    All Options:
                  </h3>
                  <div className="space-y-3">
                    {selectedQuestion.options.map((option) => {
                      const nextQ = questions.find(
                        (q) => q.id === option.nextQuestionId
                      );
                      return (
                        <div
                          key={option.id}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium text-gray-900">
                                {option.optionText}
                              </p>
                              <p className="text-sm text-gray-500">
                                Value: {option.optionValue}
                              </p>
                            </div>
                            {option.isTerminal && (
                              <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                                TERMINAL
                              </span>
                            )}
                          </div>
                          <div className="mt-2 pt-2 border-t border-gray-100">
                            <p className="text-sm text-gray-600">
                              Next:{" "}
                              {option.isTerminal ? (
                                <span className="font-medium text-red-600">
                                  End of questionnaire
                                </span>
                              ) : nextQ ? (
                                <span className="font-medium text-blue-600">
                                  Q{nextQ.order}: {nextQ.questionText}
                                </span>
                              ) : (
                                <span className="font-medium text-gray-400">
                                  Not configured
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}