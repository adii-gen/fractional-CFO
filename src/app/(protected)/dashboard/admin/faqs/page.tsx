// components/AdminFAQForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Plus, Trash2, Edit2, X, Save, Loader2 } from "lucide-react";
import Swal from "sweetalert2";

interface FAQ {
  id: string;
  category: string | null;
  question: string;
  answers: {
    main: string;
    details?: string[];
  };
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface FAQFormData {
  category: string;
  question: string;
  mainAnswer: string;
  details: string;
  order: number;
}

export default function AdminFAQForm() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FAQFormData>({
    defaultValues: {
      category: "",
      question: "",
      mainAnswer: "",
      details: "",
      order: 0,
    },
  });

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await fetch("/api/faq");
      const result = await response.json();
      if (result.success) {
        setFaqs(result.data);
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      await Swal.fire({
        icon: "error",
        title: "Error Loading FAQs",
        text: "Failed to load FAQs. Please refresh the page.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: FAQFormData) => {
    setSubmitting(true);

    try {
      // Parse details into array if provided
      const detailsArray = data.details
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      const payload = {
        category: data.category || null,
        question: data.question,
        answers: {
          main: data.mainAnswer,
          ...(detailsArray.length > 0 && { details: detailsArray }),
        },
        order: Number(data.order),
      };

      const url = editingId ? `/api/faq/${editingId}` : "/api/faq";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        await Swal.fire({
          icon: "success",
          title: editingId ? "FAQ Updated!" : "FAQ Created!",
          text: editingId
            ? "The FAQ has been updated successfully."
            : "New FAQ has been added successfully.",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        reset();
        setEditingId(null);
        fetchFAQs();
      } else {
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.error || "Something went wrong!",
        });
      }
    } catch (error) {
      console.error("Error submitting FAQ:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to submit FAQ. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (faq: FAQ) => {
    setEditingId(faq.id);
    setValue("category", faq.category || "");
    setValue("question", faq.question);

    if (typeof faq.answers === "string") {
      setValue("mainAnswer", faq.answers);
      setValue("details", "");
    } else {
      setValue("mainAnswer", faq.answers.main);
      setValue("details", faq.answers.details?.join("\n") || "");
    }

    setValue("order", faq.order);

    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string, question: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      html: `You are about to permanently delete:<br/><br/><strong>"${question}"</strong><br/><br/>This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/faq/${id}`, {
        method: "DELETE",
      });

      const apiResult = await response.json();

      if (apiResult.success) {
        await Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "FAQ has been deleted.",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        fetchFAQs();
      } else {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: apiResult.error || "Failed to delete FAQ",
        });
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete FAQ. Please try again.",
      });
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    reset();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            FAQ Management
          </h1>
          <p className="text-gray-600">
            Create, edit, and manage frequently asked questions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingId ? "Edit FAQ" : "Add New FAQ"}
              </h2>
              {editingId && (
                <button
                  onClick={cancelEdit}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                  <span className="text-gray-400 text-xs ml-1">(Optional)</span>
                </label>
                <input
                  {...register("category")}
                  type="text"
                  placeholder="e.g., Services, Security, Pricing"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Question */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("question", {
                    required: "Question is required",
                  })}
                  type="text"
                  placeholder="What services do you offer?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.question && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.question.message}
                  </p>
                )}
              </div>

              {/* Main Answer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Main Answer <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("mainAnswer", {
                    required: "Main answer is required",
                  })}
                  rows={4}
                  placeholder="Provide a comprehensive answer to the question..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                {errors.mainAnswer && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mainAnswer.message}
                  </p>
                )}
              </div>

              {/* Additional Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Details
                  <span className="text-gray-400 text-xs ml-1">
                    (One per line)
                  </span>
                </label>
                <textarea
                  {...register("details")}
                  rows={4}
                  placeholder="Enter bullet points (one per line)&#10;Point 1&#10;Point 2&#10;Point 3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Order */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Order
                </label>
                <input
                  {...register("order", {
                    valueAsNumber: true,
                  })}
                  type="number"
                  min="0"
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {editingId ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    {editingId ? (
                      <>
                        <Save className="h-5 w-5" />
                        Update FAQ
                      </>
                    ) : (
                      <>
                        <Plus className="h-5 w-5" />
                        Add FAQ
                      </>
                    )}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* FAQ List Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Existing FAQs ({faqs.length})
            </h2>

            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {faqs.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p>No FAQs yet. Create your first FAQ!</p>
                </div>
              ) : (
                faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                      editingId === faq.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          {faq.category && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {faq.category}
                            </span>
                          )}
                          <span className="text-xs text-gray-500">
                            Order: {faq.order}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              faq.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {faq.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {typeof faq.answers === "string"
                            ? faq.answers
                            : faq.answers.main}
                        </p>
                      </div>

                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleEdit(faq)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Edit FAQ"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(faq.id, faq.question)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete FAQ"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}