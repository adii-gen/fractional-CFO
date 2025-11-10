// types/questionnaire.ts

export type QuestionnaireType = "BUSINESS_SETUP" | "CONSULTATION" | "ASSESSMENT";

export type QuestionType =
  | "YES_NO"
  | "SINGLE_CHOICE"
  | "MULTIPLE_CHOICE"
  | "TEXT_INPUT"
  | "NUMBER_INPUT"
  | "EMAIL_INPUT"
  | "PHONE_INPUT";

export interface Question {
  id: string;
  questionnaireType: QuestionnaireType;
  questionText: string;
  questionType: QuestionType;
  placeholder: string | null;
  isRequired: boolean;
  order: number;
  isRoot: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestionOption {
  id: string;
  questionId: string;
  optionText: string;
  optionValue: string;
  nextQuestionId: string | null;
  isTerminal: boolean;
  resultMessage: string | null;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestionnaireSession {
  id: string;
  userId: string | null;
  sessionToken: string;
  questionnaireType: QuestionnaireType;
  currentQuestionId: string | null;
  isCompleted: boolean;
  completedAt: Date | null;
  userName: string | null;
  userEmail: string | null;
  userPhone: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestionnaireResponse {
  id: string;
  sessionId: string;
  questionId: string;
  selectedOptionId: string | null;
  textAnswer: string | null;
  answeredAt: Date;
}

export interface QuestionnaireResult {
  id: string;
  sessionId: string;
  businessType: string | null;
  country: string | null;
  facilityType: string | null;
  budgetRange: string | null;
  expectedRevenue: string | null;
  recommendedPlanId: string | null;
  recommendations: Record<string, any> | null;
  isReviewed: boolean;
  reviewedBy: string | null;
  reviewedAt: Date | null;
  adminNotes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// API Response Types
export interface StartQuestionnaireResponse {
  success: boolean;
  sessionToken: string;
  sessionId: string;
  question: {
    id: string;
    text: string;
    type: QuestionType;
    placeholder?: string;
    isRequired: boolean;
    order: number;
  };
  options: Array<{
    id: string;
    text: string;
    value: string;
  }>;
}

export interface SubmitAnswerRequest {
  sessionToken: string;
  questionId: string;
  selectedOptionId?: string;
  textAnswer?: string;
}

export interface SubmitAnswerResponse {
  success: boolean;
  completed: boolean;
  message?: string;
  question?: {
    id: string;
    text: string;
    type: QuestionType;
    placeholder?: string;
    isRequired: boolean;
    order: number;
  };
  options?: Array<{
    id: string;
    text: string;
    value: string;
  }>;
  results?: Record<string, any>;
}

// Admin Types
export interface SessionWithResult {
  id: string;
  sessionToken: string;
  userName: string | null;
  userEmail: string | null;
  userPhone: string | null;
  isCompleted: boolean;
  completedAt: Date | null;
  createdAt: Date;
  result: {
    businessType: string | null;
    country: string | null;
    facilityType: string | null;
    budgetRange: string | null;
    isReviewed: boolean;
  } | null;
}

export interface JourneyStep {
  questionId: string;
  questionText: string;
  questionOrder: number;
  questionType: QuestionType;
  selectedOption: {
    id: string;
    text: string;
    value: string;
  } | null;
  textAnswer: string | null;
  answeredAt: Date;
}

export interface SessionDetailResponse {
  success: boolean;
  session: {
    id: string;
    userName: string | null;
    userEmail: string | null;
    userPhone: string | null;
    isCompleted: boolean;
    completedAt: Date | null;
    createdAt: Date;
  };
  journey: JourneyStep[];
  result: QuestionnaireResult | null;
}

export interface QuestionWithOptions extends Question {
  options: QuestionOption[];
}

// Validation Types
export interface ValidationError {
  field: string;
  message: string;
}

export interface QuestionValidation {
  isValid: boolean;
  errors: ValidationError[];
}

// Analytics Types
export interface QuestionnaireAnalytics {
  totalSubmissions: number;
  completedSubmissions: number;
  inProgressSubmissions: number;
  averageCompletionTime: number; // in minutes
  dropoffPoints: Array<{
    questionId: string;
    questionText: string;
    dropoffRate: number;
  }>;
  popularPaths: Array<{
    path: string;
    count: number;
    percentage: number;
  }>;
  businessTypeDistribution: Record<string, number>;
  countryDistribution: Record<string, number>;
}

// Filter Types
export type SessionStatus = "all" | "completed" | "in_progress";

export interface SessionFilters {
  status: SessionStatus;
  startDate?: Date;
  endDate?: Date;
  businessType?: string;
  country?: string;
  limit?: number;
  offset?: number;
}