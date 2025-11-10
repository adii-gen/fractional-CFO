import {
  boolean,
  date,
  decimal,
  index,
  integer,
  json,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
  serial,
  time,
} from "drizzle-orm/pg-core";

// =====================
// Enums
// =====================

export const UserRole = pgEnum("user_role", [
  "USER",
  "ADMIN",
  "CONSULTANT"
]);

export const BookingStatus = pgEnum("booking_status", [
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
  "RESCHEDULED",
]);

export const ConsultationType = pgEnum("consultation_type", [
  "DISCOVERY_CALL",
  "STRATEGY_SESSION",
  "FOLLOW_UP",
  "EMERGENCY",
]);

export const DayOfWeek = pgEnum("day_of_week", [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
]);

// =====================
// Auth Tables (Core - Not Changed)
// =====================

export const EmailVerificationTokenTable = pgTable(
  "email_verification_tokens",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    email: text("email").notNull(),
    token: uuid("token").notNull(),
    expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
  },
  (table) => ({
    emailTokenKey: uniqueIndex("email_verification_tokens_email_token_key").on(
      table.email,
      table.token
    ),
    tokenKey: uniqueIndex("email_verification_tokens_token_key").on(
      table.token
    ),
  })
);

export const PasswordResetTokenTable = pgTable(
  "password_reset_tokens",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    email: text("email").notNull(),
    token: uuid("token").notNull(),
    expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
  },
  (table) => ({
    emailTokenKey: uniqueIndex("password_reset_tokens_email_token_key").on(
      table.email,
      table.token
    ),
    tokenKey: uniqueIndex("password_reset_tokens_token_key").on(table.token),
  })
);

export const UserTable = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    emailVerified: timestamp("email_verified", { mode: "date" }),
    emailVerifToken: varchar("email_verif_token", { length: 255 }),
    password: varchar("password", { length: 255 }),
    mobile: text("mobile"),
    role: UserRole("role").default("USER").notNull(),
    profilePic: text("profile_pic"),
    
    // Google OAuth fields
    googleId: varchar("google_id", { length: 255 }).unique(),
    googleAccessToken: text("google_access_token"),
    googleRefreshToken: text("google_refresh_token"),
    
    // Additional fields
    phone: varchar('phone', { length: 15 }).unique(),
    userType: UserRole('user_type'),
    firstName: varchar('first_name', { length: 100 }),
    lastName: varchar('last_name', { length: 100 }),
    isActive: boolean('is_active').default(true),
    isVerified: boolean('is_verified').default(false),
    emailVerifiedAt: timestamp('email_verified_at'),
    phoneVerifiedAt: timestamp('phone_verified_at'),
    lastLoginAt: timestamp('last_login_at'),
    twoFactorEnabled: boolean('two_factor_enabled').default(false),
    twoFactorSecret: varchar('two_factor_secret', { length: 32 }),
    
    // Consultant-specific pricing
    pricePerMinute: decimal("price_per_minute", { precision: 10, scale: 2 }), // For consultants
    
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    emailKey: uniqueIndex("users_email_key").on(table.email),
    googleIdKey: uniqueIndex("users_google_id_key").on(table.googleId),
    nameEmailIdx: index("users_name_email_idx").on(table.name, table.email),
  })
);

// =====================
// Master Tables for Fractional CFO Website
// =====================

export const ExpertiseTable = pgTable(
  "expertise",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    header: varchar("header", { length: 255 }).notNull(),
    description: text("description").notNull(),
    iconImage: text("icon_image"),
    order: integer("order").notNull().default(0),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    orderIdx: index("expertise_order_idx").on(table.order),
  })
);

export const ClientSuccessStoryTable = pgTable(
  "client_success_stories",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    testimonial: text("testimonial").notNull(),
    clientName: varchar("client_name", { length: 255 }).notNull(),
    clientInitials: varchar("client_initials", { length: 10 }).notNull(),
    designation: varchar("designation", { length: 255 }).notNull(),
    companyName: varchar("company_name", { length: 255 }).notNull(),
    rating: decimal("rating", { precision: 2, scale: 1 }).default("5.0"),
    order: integer("order").notNull().default(0),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    orderIdx: index("client_success_stories_order_idx").on(table.order),
  })
);

export const PricingPlanTable = pgTable(
  "pricing_plans",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    planName: varchar("plan_name", { length: 255 }).notNull(),
    tagline: varchar("tagline", { length: 255 }),
    structure: varchar("structure", { length: 100 }),
    headCount: varchar("head_count", { length: 100 }),
    transactions: varchar("transactions", { length: 100 }),
    revenue: varchar("revenue", { length: 100 }),
    budget: varchar("budget", { length: 100 }),
    compliance: varchar("compliance", { length: 100 }),
    
    monthlyPrice: decimal("monthly_price", { precision: 12, scale: 2 }),
    annualPrice: decimal("annual_price", { precision: 12, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 10 }).default("AED").notNull(),
    discountPercentage: integer("discount_percentage").default(0),
    
    includedFeatures: jsonb("included_features").notNull(),
    
    order: integer("order").notNull().default(0),
    isActive: boolean("is_active").default(true),
    isFeatured: boolean("is_featured").default(false),
    
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    orderIdx: index("pricing_plans_order_idx").on(table.order),
    planNameKey: uniqueIndex("pricing_plans_plan_name_key").on(table.planName),
  })
);

export const FAQTable = pgTable(
  "faqs",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    category: varchar("category", { length: 100 }),
    question: text("question").notNull(),
    answers: jsonb("answers").notNull(),
    
    order: integer("order").notNull().default(0),
    isActive: boolean("is_active").default(true),
    
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    orderIdx: index("faqs_order_idx").on(table.order),
    categoryIdx: index("faqs_category_idx").on(table.category),
  })
);

// =====================
// NEW: Weekly Availability Schedule (Recurring Pattern)
// =====================

export const ConsultantWeeklyScheduleTable = pgTable(
  "consultant_weekly_schedule",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    consultantId: uuid("consultant_id")
      .references(() => UserTable.id, { onDelete: "cascade" })
      .notNull(),
    
    // Day and Time
    dayOfWeek: DayOfWeek("day_of_week").notNull(),
    startTime: time("start_time").notNull(), // e.g., "10:00:00"
    endTime: time("end_time").notNull(),     // e.g., "14:00:00"
    
    // Pricing (can override user's default)
    pricePerMinute: decimal("price_per_minute", { precision: 10, scale: 2 }),
    
    // Configuration
    consultationType: ConsultationType("consultation_type").default("DISCOVERY_CALL"),
    isActive: boolean("is_active").default(true),
    
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    consultantIdIdx: index("consultant_weekly_schedule_consultant_id_idx").on(table.consultantId),
    dayOfWeekIdx: index("consultant_weekly_schedule_day_of_week_idx").on(table.dayOfWeek),
    consultantDayIdx: index("consultant_weekly_schedule_consultant_day_idx").on(
      table.consultantId,
      table.dayOfWeek
    ),
  })
);

// =====================
// NEW: Blocked Dates (Exceptions to Weekly Schedule)
// =====================

export const ConsultantBlockedDatesTable = pgTable(
  "consultant_blocked_dates",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    consultantId: uuid("consultant_id")
      .references(() => UserTable.id, { onDelete: "cascade" })
      .notNull(),
    
    // Block specific date or date+time range
    blockedDate: date("blocked_date").notNull(),
    startTime: time("start_time"), // Optional: block only specific hours
    endTime: time("end_time"),     // Optional: block only specific hours
    
    // If startTime/endTime are null, entire day is blocked
    isFullDayBlock: boolean("is_full_day_block").default(true),
    
    reason: text("reason"), // Optional reason for blocking
    
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    consultantIdIdx: index("consultant_blocked_dates_consultant_id_idx").on(table.consultantId),
    blockedDateIdx: index("consultant_blocked_dates_blocked_date_idx").on(table.blockedDate),
    consultantDateIdx: index("consultant_blocked_dates_consultant_date_idx").on(
      table.consultantId,
      table.blockedDate
    ),
  })
);

// =====================
// UPDATED: Consultation Bookings
// =====================

export const ConsultationBookingTable = pgTable(
  "consultation_bookings",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    userId: uuid("user_id").references(() => UserTable.id, { onDelete: "cascade" }),
    consultantId: uuid("consultant_id")
      .references(() => UserTable.id, { onDelete: "set null" })
      .notNull(), // Changed from adminId to consultantId for clarity
    
    // Booking Details
    type: ConsultationType("type").default("DISCOVERY_CALL").notNull(),
    status: BookingStatus("status").default("PENDING").notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    
    // Timing
    startTime: timestamp("start_time", { mode: "date" }).notNull(),
    endTime: timestamp("end_time", { mode: "date" }).notNull(),
    timezone: varchar("timezone", { length: 50 }).default("UTC").notNull(),
    durationMinutes: integer("duration_minutes").notNull(), // Calculated from start/end
    
    // Pricing
    pricePerMinute: decimal("price_per_minute", { precision: 10, scale: 2 }).notNull(),
    totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 10 }).default("AED").notNull(),
    
    // Contact Information
    userEmail: varchar("user_email", { length: 255 }).notNull(),
    userName: varchar("user_name", { length: 255 }).notNull(),
    userPhone: varchar("user_phone", { length: 20 }),
    
    // Meeting Details
    meetingLink: text("meeting_link"),
    meetingPlatform: varchar("meeting_platform", { length: 100 }),
    meetingNotes: text("meeting_notes"),
    
    // Admin/Consultant Notes
    consultantNotes: text("consultant_notes"),
    
    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index("consultation_bookings_user_id_idx").on(table.userId),
    consultantIdIdx: index("consultation_bookings_consultant_id_idx").on(table.consultantId),
    startTimeIdx: index("consultation_bookings_start_time_idx").on(table.startTime),
    statusIdx: index("consultation_bookings_status_idx").on(table.status),
    consultantStartIdx: index("consultation_bookings_consultant_start_idx").on(
      table.consultantId,
      table.startTime
    ),
  })
);

// =====================
// DEPRECATED: Available Slots (Keep for backward compatibility if needed)
// =====================

export const AvailableSlotTable = pgTable(
  "available_slots",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    adminId: uuid("admin_id").references(() => UserTable.id, { onDelete: "cascade" }).notNull(),
    
    startTime: timestamp("start_time", { mode: "date" }).notNull(),
    endTime: timestamp("end_time", { mode: "date" }).notNull(),
    date: date("date").notNull(),
    
    slotDuration: integer("slot_duration").default(30).notNull(),
    maxBookings: integer("max_bookings").default(1).notNull(),
    consultationType: ConsultationType("consultation_type").default("DISCOVERY_CALL").notNull(),
    
    isAvailable: boolean("is_available").default(true),
    isRecurring: boolean("is_recurring").default(false),
    recurringPattern: varchar("recurring_pattern", { length: 50 }),
    
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    adminIdIdx: index("available_slots_admin_id_idx").on(table.adminId),
    dateIdx: index("available_slots_date_idx").on(table.date),
    startTimeIdx: index("available_slots_start_time_idx").on(table.startTime),
  })
);

export const chatbotInquiries = pgTable(
  "chatbot_inquiries",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 15 }),
    company: varchar("company", { length: 255 }),
    status: varchar("status", { length: 50 }).default("new_inquiry"),
    source: varchar("source", { length: 50 }).default("chatbot"),
    message: text("message"),
    userData: jsonb("user_data"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    statusIdx: index("inquiries_status_idx").on(table.status),
    emailIdx: index("inquiries_email_idx").on(table.email),
    createdAtIdx: index("inquiries_created_at_idx").on(table.createdAt),
  })
);



















//QUESTIONNAIRE TABLES
// Add these to your existing schema.ts file

// =====================
// Questionnaire Enums
// =====================

export const QuestionnaireType = pgEnum("questionnaire_type", [
  "BUSINESS_SETUP",
  "CONSULTATION",
  "ASSESSMENT",
]);

export const QuestionType = pgEnum("question_type", [
  "YES_NO",
  "SINGLE_CHOICE",
  "MULTIPLE_CHOICE",
  "TEXT_INPUT",
  "NUMBER_INPUT",
  "EMAIL_INPUT",
  "PHONE_INPUT",
]);

// =====================
// Questionnaire Tables
// =====================

export const QuestionTable = pgTable(
  "questions",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    questionnaireType: QuestionnaireType("questionnaire_type").default("BUSINESS_SETUP").notNull(),
    questionText: text("question_text").notNull(),
    questionType: QuestionType("question_type").notNull(),
    placeholder: varchar("placeholder", { length: 255 }),
    isRequired: boolean("is_required").default(true),
    order: integer("order").notNull().default(0),
    isRoot: boolean("is_root").default(false),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    orderIdx: index("questions_order_idx").on(table.order),
    typeIdx: index("questions_type_idx").on(table.questionnaireType),
    isRootIdx: index("questions_is_root_idx").on(table.isRoot),
  })
);

export const QuestionOptionTable = pgTable(
  "question_options",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    questionId: uuid("question_id")
      .references(() => QuestionTable.id, { onDelete: "cascade" })
      .notNull(),
    optionText: text("option_text").notNull(),
    optionValue: varchar("option_value", { length: 255 }).notNull(),
    nextQuestionId: uuid("next_question_id").references(() => QuestionTable.id, { onDelete: "set null" }),
    isTerminal: boolean("is_terminal").default(false),
    resultMessage: text("result_message"),
    order: integer("order").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    questionIdIdx: index("question_options_question_id_idx").on(table.questionId),
    orderIdx: index("question_options_order_idx").on(table.order),
  })
);

export const QuestionnaireSessionTable = pgTable(
  "questionnaire_sessions",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    userId: uuid("user_id").references(() => UserTable.id, { onDelete: "set null" }),
    sessionToken: uuid("session_token").defaultRandom().notNull().unique(),
    questionnaireType: QuestionnaireType("questionnaire_type").default("BUSINESS_SETUP").notNull(),
    currentQuestionId: uuid("current_question_id").references(() => QuestionTable.id),
    isCompleted: boolean("is_completed").default(false),
    completedAt: timestamp("completed_at"),
    userName: varchar("user_name", { length: 255 }),
    userEmail: varchar("user_email", { length: 255 }),
    userPhone: varchar("user_phone", { length: 20 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index("questionnaire_sessions_user_id_idx").on(table.userId),
    sessionTokenIdx: uniqueIndex("questionnaire_sessions_session_token_idx").on(table.sessionToken),
    typeIdx: index("questionnaire_sessions_type_idx").on(table.questionnaireType),
  })
);

export const QuestionnaireResponseTable = pgTable(
  "questionnaire_responses",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    sessionId: uuid("session_id")
      .references(() => QuestionnaireSessionTable.id, { onDelete: "cascade" })
      .notNull(),
    questionId: uuid("question_id")
      .references(() => QuestionTable.id, { onDelete: "cascade" })
      .notNull(),
    selectedOptionId: uuid("selected_option_id").references(() => QuestionOptionTable.id),
    textAnswer: text("text_answer"),
    answeredAt: timestamp("answered_at").defaultNow().notNull(),
  },
  (table) => ({
    sessionIdIdx: index("questionnaire_responses_session_id_idx").on(table.sessionId),
    questionIdIdx: index("questionnaire_responses_question_id_idx").on(table.questionId),
  })
);

export const QuestionnaireResultTable = pgTable(
  "questionnaire_results",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    sessionId: uuid("session_id")
      .references(() => QuestionnaireSessionTable.id, { onDelete: "cascade" })
      .notNull()
      .unique(),
    businessType: varchar("business_type", { length: 255 }),
    country: varchar("country", { length: 100 }),
    facilityType: varchar("facility_type", { length: 100 }),
    budgetRange: varchar("budget_range", { length: 100 }),
    expectedRevenue: varchar("expected_revenue", { length: 100 }),
    recommendedPlanId: uuid("recommended_plan_id").references(() => PricingPlanTable.id),
    recommendations: jsonb("recommendations"),
    isReviewed: boolean("is_reviewed").default(false),
    reviewedBy: uuid("reviewed_by").references(() => UserTable.id),
    reviewedAt: timestamp("reviewed_at"),
    adminNotes: text("admin_notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    sessionIdIdx: uniqueIndex("questionnaire_results_session_id_idx").on(table.sessionId),
    isReviewedIdx: index("questionnaire_results_is_reviewed_idx").on(table.isReviewed),
  })
);