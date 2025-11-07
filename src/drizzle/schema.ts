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
} from "drizzle-orm/pg-core";


// =====================
// Enums
// =====================

export const UserRole = pgEnum("user_role", [
  "USER",
  "ADMIN",
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
    password: varchar("password", { length: 255 }), // Made nullable for OAuth users
    mobile: text("mobile"),
    role: UserRole("role").default("USER").notNull(),
    profilePic: text("profile_pic"),
    
    // Google OAuth fields
    googleId: varchar("google_id", { length: 255 }).unique(),
    googleAccessToken: text("google_access_token"),
    googleRefreshToken: text("google_refresh_token"),
    
    // Additional fields from new schema
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

// Our Expertise Master Table
export const ExpertiseTable = pgTable(
  "expertise",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    header: varchar("header", { length: 255 }).notNull(),
    description: text("description").notNull(),
    iconImage: text("icon_image"), // URL or path to icon image
    order: integer("order").notNull().default(0),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    orderIdx: index("expertise_order_idx").on(table.order),
  })
);

// Client Success Stories Master Table
export const ClientSuccessStoryTable = pgTable(
  "client_success_stories",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    testimonial: text("testimonial").notNull(),
    clientName: varchar("client_name", { length: 255 }).notNull(),
    clientInitials: varchar("client_initials", { length: 10 }).notNull(), // e.g., "VM"
    designation: varchar("designation", { length: 255 }).notNull(),
    companyName: varchar("company_name", { length: 255 }).notNull(),
    rating: decimal("rating", { precision: 2, scale: 1 }).default("5.0"), // e.g., 4.9
    order: integer("order").notNull().default(0),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    orderIdx: index("client_success_stories_order_idx").on(table.order),
  })
);

// Pricing Plans Master Table
export const PricingPlanTable = pgTable(
  "pricing_plans",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    planName: varchar("plan_name", { length: 255 }).notNull(), // e.g., "Corporates"
    tagline: varchar("tagline", { length: 255 }), // e.g., "Sustain & Grow"
    structure: varchar("structure", { length: 100 }), // e.g., "Complex"
    headCount: varchar("head_count", { length: 100 }), // e.g., "Over 25"
    transactions: varchar("transactions", { length: 100 }), // e.g., "Over 2000"
    revenue: varchar("revenue", { length: 100 }), // e.g., "Over AED 5M"
    budget: varchar("budget", { length: 100 }), // e.g., "Over AED 120K"
    compliance: varchar("compliance", { length: 100 }), // e.g., "High"
    
    // Pricing details
    monthlyPrice: decimal("monthly_price", { precision: 12, scale: 2 }),
    annualPrice: decimal("annual_price", { precision: 12, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 10 }).default("AED").notNull(),
    discountPercentage: integer("discount_percentage").default(0), // e.g., 20 for "Save 20%"
    
    // What's included - stored as JSON array
    includedFeatures: jsonb("included_features").notNull(), 
    // Example: ["Everything in SME", "Unlimited transactions", "Weekly financial reviews"]
    
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

// FAQ Master Table
export const FAQTable = pgTable(
  "faqs",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    category: varchar("category", { length: 100 }), // e.g., "general", "pricing", "services"
    question: text("question").notNull(),
    
    // Each object: { type: "text" | "bullet" | "check" | "numbered", content: "answer text" }
    answers: jsonb("answers").notNull(),
    /* Example structure:
    [
      { type: "text", content: "This is a text answer" },
      { type: "bullet", content: "First bullet point" },
      { type: "bullet", content: "Second bullet point" },
      { type: "check", content: "Feature included" }
    ]
    */
    
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
