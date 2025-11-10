// app/questionnaire/page.tsx
"use client";

import Sidebar from "@/components/user/sidebar";
import { useState, useEffect } from "react";

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

  // Start questionnaire
  useEffect(() => {
    startQuestionnaire();
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
    if (!sessionToken || !currentQuestion) return;

    // Validate required fields
    if (currentQuestion.isRequired) {
      if (
        currentQuestion.type.includes("CHOICE") &&
        !selectedOption
      ) {
        setError("Please select an option");
        return;
      }
      if (
        currentQuestion.type.includes("INPUT") &&
        !answer.trim()
      ) {
        setError("This field is required");
        return;
      }
    }

    try {
      setLoading(true);
      setError("");

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
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
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
            placeholder={currentQuestion.placeholder}
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none"
          />
        );

      case "EMAIL_INPUT":
        return (
          <input
            type="email"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={currentQuestion.placeholder}
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none"
          />
        );

      case "PHONE_INPUT":
        return (
          <input
            type="tel"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={currentQuestion.placeholder}
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none"
          />
        );

      case "NUMBER_INPUT":
        return (
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={currentQuestion.placeholder}
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none"
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
            disabled={loading}
            className="w-full py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Processing...
              </span>
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}