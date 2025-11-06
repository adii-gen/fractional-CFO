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
  "platform_admin"
]);

// =====================
// Ticket Tables
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
    password: varchar("password", { length: 255 }).notNull(),
    mobile: text("mobile"),
    role: UserRole("role").default("USER").notNull(),
    profilePic: text("profile_pic"),
    
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
    nameEmailIdx: index("users_name_email_idx").on(table.name, table.email),
  })
);








/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// import { InferModel } from "drizzle-orm";
// import {
//   index,
//   jsonb,
//   pgEnum,
//   pgTable,
//   text,
//   timestamp,
//   uniqueIndex,
//   uuid,
//   boolean,
//   integer,
// } from "drizzle-orm/pg-core";

// // ===== ENUMS =====
// export const UserRole = pgEnum("user_role", ["ADMIN", "USER","DEVELOPER_ADMIN","REVIEWER","INSTRUCTOR"]);
// export const VerificationStatus = pgEnum("verification_status", ["PENDING", "APPROVED", "REJECTED"]);
// export const ProjectStatus = pgEnum("project_status", ["DRAFT", "PUBLISHED", "ARCHIVED"]);
// export const CXOLevel = pgEnum("cxo_level", ["CEO", "COO", "CFO", "CTO", "CISO", "CMO", "CHRO", "CCO", "CDO", "CPO", "CRO", "Other"]);
// export const IndustryExperience = pgEnum("industry_experience", ["Technology", "Healthcare", "Finance", "Manufacturing", "Retail", "Education", "Real_Estate", "Automotive", "Energy", "Other"]);
// export const ConsultantStatus = pgEnum("consultant_status", ["DRAFT", "PENDING", "APPROVED", "REJECTED", "SUSPENDED"]);
// export const InquiryRole = pgEnum("inquiry_role", ["CEO", "Owner", "President", "Executive", "Sales", "Marketing", "Consultant", "Other", "PE_Executive"]);

// // ===== USERS TABLE (unchanged as requested) =====
// export const UsersTable = pgTable(
//   "users",
//   {
//     id: uuid("id").defaultRandom().primaryKey().notNull(),
//     name: text("name").notNull(),
//     email: text("email").notNull(),
//     emailVerified: timestamp("email_verified", { mode: "date" }),
//     password: text("password").notNull(),
//     phone: text("phone"),
//     otherRoles: UserRole("other_roles").array(),
//     defaultPassword: text("default_password"),
//     phoneVerified: timestamp("phone_verified", { mode: "date" }),
//     role: UserRole("role").default("USER").notNull(),
//     organizationId: uuid("organization_id"),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//   },
//   (table) => [
//     uniqueIndex("users_email_key").on(table.email),
//     index("users_name_email_phone_idx").on(table.name, table.email, table.phone),
//     index("users_organization_idx").on(table.organizationId),
//   ]
// );
// export type User = InferModel<typeof UsersTable>;
// export type NewUser = InferModel<typeof UsersTable, "insert">;

// // ===== AUTH TABLES (unchanged) =====
// export const EmailVerificationTokenTable = pgTable(
//   "email_verification_tokens",
//   {
//     id: uuid("id").defaultRandom().primaryKey().notNull(),
//     email: text("email").notNull(),
//     token: uuid("token").notNull(),
//     expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
//   },
//   (table) => [
//     uniqueIndex("email_verification_tokens_email_token_key").on(table.email, table.token),
//     uniqueIndex("email_verification_tokens_token_key").on(table.token),
//   ]
// );

// export const PhoneVerificationTable = pgTable(
//   "phone_verification_tokens",
//   {
//     id: uuid("id").defaultRandom().primaryKey().notNull(),
//     phone: text("phone").notNull(),
//     otp: text("otp").notNull(),
//     expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
//   },
//   (table) => [
//     uniqueIndex("phone_verification_tokens_phone_otp_key").on(table.phone, table.otp),
//     uniqueIndex("phone_verification_tokens_otp_key").on(table.otp),
//   ]
// );

// export const PasswordResetTokenTable = pgTable(
//   "password_reset_tokens",
//   {
//     id: uuid("id").defaultRandom().primaryKey().notNull(),
//     email: text("email").notNull(),
//     token: uuid("token").notNull(),
//     expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
//   },
//   (table) => [
//     uniqueIndex("password_reset_tokens_email_token_key").on(table.email, table.token),
//     uniqueIndex("password_reset_tokens_token_key").on(table.token),
//   ]
// );

// // ===== CXO CONSULTANT PROFILE TABLES =====

// // -- CXO CONSULTANTS (main profile for fractional executives)
// export const ConsultantsTable = pgTable(
//   "consultants",
//   {
//     id: uuid("id").defaultRandom().primaryKey().notNull(),
//     userId: uuid("user_id").references(() => UsersTable.id, { onDelete: "cascade" }).notNull(),
//     // userId: uuid("user_id").references(() => UsersTable.id).notNull(),
//     // Make new fields nullable initially to avoid migration issues
//     firstName: text("first_name"), 
//     lastName: text("last_name"),
//     profileImageUrl: text("profile_image_url"),
//     useAvatar: boolean("use_avatar").default(true),
//     bio: text("bio"), 
//     yearsOfExperience: text("years_of_experience"),
//     primaryExpertise: text("primary_expertise"),
//     secondaryExpertise: text("secondary_expertise").array(),
//     industryExperience: text("industry_experience").array(),
//     hourlyRate: text("hourly_rate"),
//     availability: text("availability"),
//     // Keep existing fields
//     dob: timestamp("dob", { mode: "date" }),
//     gender: text("gender"),
//     address: text("address"),
//     city: text("city"),
//     state: text("state"),
//     country: text("country"),
//     linkedin: text("linkedin"),
//     github: text("github"),
//     portfolio: text("portfolio"),
//     cvUrl: text("cv_url"),
//     // New status fields
//     status: ConsultantStatus("status").default("DRAFT").notNull(),
//     reviewerNotes: text("reviewer_notes"),
//     approvedAt: timestamp("approved_at", { mode: "date" }),
//     approvedBy: uuid("approved_by").references(() => UsersTable.id, { onDelete: "set null" }),
//     featuredConsultant: boolean("featured_consultant").default(false),
//     isActive: boolean("is_active").default(true),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//   },
//   (table) => [
//     uniqueIndex("consultants_user_id_key").on(table.userId),
//     index("consultants_status_idx").on(table.status),
//     index("consultants_expertise_idx").on(table.primaryExpertise),
//   ]
// );
// export type Consultant = InferModel<typeof ConsultantsTable>;
// export type NewConsultant = InferModel<typeof ConsultantsTable, "insert">;

// // -- EDUCATIONS (enhanced for executive profiles)
// export const EducationsTable = pgTable(
//   "educations",
//   {
//     id: uuid("id").defaultRandom().primaryKey().notNull(),
//     consultantId: uuid("consultant_id").references(() => ConsultantsTable.id, { onDelete: "cascade" }).notNull(),
//     degree: text("degree").notNull(),
//     institution: text("institution").notNull(),
//     fieldOfStudy: text("field_of_study"),
//     startDate: timestamp("start_date", { mode: "date" }),
//     endDate: timestamp("end_date", { mode: "date" }),
//     grade: text("grade"),
//     achievements: text("achievements"),
//   }
// );

// // -- EXECUTIVE EXPERIENCES (enhanced for C-level positions)
// export const ExperiencesTable = pgTable(
//   "experiences",
//   {
//     id: uuid("id").defaultRandom().primaryKey().notNull(),
//     consultantId: uuid("consultant_id").references(() => ConsultantsTable.id, { onDelete: "cascade" }).notNull(),
//     company: text("company").notNull(),
//     position: text("position").notNull(), // This was "role" before
//     department: text("department"),
//     description: text("description"),
//     keyAchievements: text("key_achievements"),
//     companySizeAtJoining: text("company_size_at_joining"),
//     companySizeAtLeaving: text("company_size_at_leaving"),
//     industryType: text("industry_type"),
//     startDate: timestamp("start_date", { mode: "date" }),
//     endDate: timestamp("end_date", { mode: "date" }),
//     // Keep the original jsonb type to avoid casting issues
//     currentlyWorking: jsonb("currently_working").$type<boolean>().default(false),
//   }
// );

// // -- EXPERTISE AREAS (this was "skills" table before)
// export const ExpertiseAreasTable = pgTable(
//   "expertise_areas",
//   {
//     id: uuid("id").defaultRandom().primaryKey().notNull(),
//     consultantId: uuid("consultant_id").references(() => ConsultantsTable.id, { onDelete: "cascade" }).notNull(),
//     areaName: text("area_name").notNull(), // This was "name" before
//     proficiencyLevel: text("proficiency_level").notNull(), // This was "level" before  
//     yearsOfExperience: text("years_of_experience"), // Changed from text to 
//     certifications: text("certifications"),
//   }
// );

// export const CertificationsTable = pgTable(
//   "certifications",
//   {
//     id: uuid("id").defaultRandom().primaryKey().notNull(),
//     consultantId: uuid("consultant_id").references(() => ConsultantsTable.id, { onDelete: "cascade" }).notNull(),
//     certificationName: text("certification_name").notNull(),
//     issuingOrganization: text("issuing_organization"),
//     issueDate: timestamp("issue_date", { mode: "date" }), // Optional
//     expiryDate: timestamp("expiry_date", { mode: "date" }), // Optional
//     credentialId: text("credential_id"),
//     credentialUrl: text("credential_url"),
//     certificateImageUrl: text("certificate_image_url"), // New field for certificate image
//     isActive: boolean("is_active").default(true),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//   },
//   (table) => [
//     index("certifications_consultant_idx").on(table.consultantId),
//     index("certifications_active_idx").on(table.isActive),
//   ]
// );

// // -- SUCCESS STORIES/CASE STUDIES (replacing generic projects)
// export const CaseStudiesTable = pgTable(
//   "case_studies",
//   {
//     id: uuid("id").defaultRandom().primaryKey().notNull(),
//     consultantId: uuid("consultant_id").references(() => ConsultantsTable.id, { onDelete: "cascade" }).notNull(),
//     title: text("title").notNull(),
//     companyType: text("company_type"),
//     challenge: text("challenge").notNull(),
//     solution: text("solution").notNull(),
//     results: text("results").notNull(),
//     duration: text("duration"),
//     isPublic: boolean("is_public").default(false),
//   }
// );

// // -- CONSULTANT INQUIRIES (for contact form submissions)
// export const ConsultantInquiriesTable = pgTable(
//   "consultant_inquiries",
//   {
//     id: uuid("id").defaultRandom().primaryKey().notNull(),
//     consultantId: uuid("consultant_id").references(() => ConsultantsTable.id, { onDelete: "cascade" }).notNull(),
//     firstName: text("first_name").notNull(),
//     lastName: text("last_name").notNull(),
//     email: text("email").notNull(),
//     companyName: text("company_name").notNull(),
//     roleAtCompany: InquiryRole("role_at_company").notNull(),
//     phoneNumber: text("phone_number").notNull(),
//     message: text("message"),
//     inquiryType: text("inquiry_type"),
//     preferredContactMethod: text("preferred_contact_method"),
//     budget: text("budget"),
//     timeline: text("timeline"),
//     isContacted: boolean("is_contacted").default(false),
//     contactedAt: timestamp("contacted_at", { mode: "date" }),
//     contactedBy: uuid("contacted_by").references(() => UsersTable.id),
//     notes: text("notes"),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//   },
//   (table) => [
//     index("inquiries_consultant_idx").on(table.consultantId),
//     index("inquiries_created_at_idx").on(table.createdAt),
//   ]
// );

// // -- TESTIMONIALS (for approved consultants)
// export const TestimonialsTable = pgTable(
//   "testimonials",
//   {
//     id: uuid("id").defaultRandom().primaryKey().notNull(),
//     consultantId: uuid("consultant_id").references(() => ConsultantsTable.id, { onDelete: "cascade" }).notNull(),
//     clientName: text("client_name").notNull(),
//     clientPosition: text("client_position"),
//     companyName: text("company_name"),
//     testimonialText: text("testimonial_text").notNull(),
//     rating: text("rating"),
//     projectType: text("project_type"),
//     isApproved: boolean("is_approved").default(false),
//     isPublic: boolean("is_public").default(false),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//   }
// );

// // Keep the old tables for backward compatibility during migration
// // You can remove these after successful migration

// // -- SKILLS (old table - will be renamed to expertise_areas)
// export const SkillsTable = pgTable(
//   "skills",
//   {
//     id: uuid("id").defaultRandom().primaryKey().notNull(),
//     consultantId: uuid("consultant_id").references(() => ConsultantsTable.id, { onDelete: "cascade" }).notNull(),
//     name: text("name").notNull(),
//     level: text("level"),
//     yearsOfExperience: text("years_of_experience"),
//   }
// );

// // -- PROJECTS (old table - keeping for now)
// export const ProjectsTable = pgTable(
//   "projects",
//   {
//     id: uuid("id").defaultRandom().primaryKey().notNull(),
//     consultantId: uuid("consultant_id").references(() => ConsultantsTable.id, { onDelete: "cascade" }).notNull(),
//     title: text("title").notNull(),
//     description: text("description"),
//     techStack: text("tech_stack"),
//     projectUrl: text("project_url"),
//     githubUrl: text("github_url"),
//   }
// );




// // Add these master tables to your schema file

// // ===== MASTER TABLES FOR SELECT OPTIONS =====

// // CXO Levels Master Table
// export const MasterCXOLevelsTable = pgTable(
//   "master_cxo_levels",
//   {
//     id: uuid("id").defaultRandom().primaryKey().notNull(),
//     name: text("name").notNull().unique(),
//     description: text("description"),
//     isActive: boolean("is_active").default(true).notNull(),
//     sortOrder: integer("sort_order").default(0),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//   },
//   (table) => [
//     index("idx_master_cxo_levels_name").on(table.name),
//     index("idx_master_cxo_levels_active").on(table.isActive),
//   ]
// );

// // Industries Master Table
// export const MasterIndustriesTable = pgTable(
//   "master_industries",
//   {
//     id: uuid("id").defaultRandom().primaryKey().notNull(),
//     name: text("name").notNull().unique(),
//     description: text("description"),
//     isActive: boolean("is_active").default(true).notNull(),
//     sortOrder: integer("sort_order").default(0),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//   },
//   (table) => [
//     index("idx_master_industries_name").on(table.name),
//     index("idx_master_industries_active").on(table.isActive),
//   ]
// );

// // Expertise Levels Master Table
// export const MasterExpertiseLevelsTable = pgTable(
//   "master_expertise_levels",
//   {
//     id: uuid("id").defaultRandom().primaryKey().notNull(),
//     name: text("name").notNull().unique(),
//     description: text("description"),
//     isActive: boolean("is_active").default(true).notNull(),
//     sortOrder: integer("sort_order").default(0),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//   },
//   (table) => [
//     index("idx_master_expertise_levels_name").on(table.name),
//     index("idx_master_expertise_levels_active").on(table.isActive),
//   ]
// );

// // Company Sizes Master Table
// export const MasterCompanySizesTable = pgTable(
//   "master_company_sizes",
//   {
//     id: uuid("id").defaultRandom().primaryKey().notNull(),
//     name: text("name").notNull().unique(),
//     description: text("description"),
//     isActive: boolean("is_active").default(true).notNull(),
//     sortOrder: integer("sort_order").default(0),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//   },
//   (table) => [
//     index("idx_master_company_sizes_name").on(table.name),
//     index("idx_master_company_sizes_active").on(table.isActive),
//   ]
// );

// // Education Degrees Master Table
// export const MasterEducationDegreesTable = pgTable(
//   "master_education_degrees",
//   {
//     id: uuid("id").defaultRandom().primaryKey().notNull(),
//     name: text("name").notNull().unique(),
//     description: text("description"),
//     isActive: boolean("is_active").default(true).notNull(),
//     sortOrder: integer("sort_order").default(0),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//   },
//   (table) => [
//     index("idx_master_education_degrees_name").on(table.name),
//     index("idx_master_education_degrees_active").on(table.isActive),
//   ]
// );

// // Company Types Master Table
// export const MasterCompanyTypesTable = pgTable(
//   "master_company_types",
//   {
//     id: uuid("id").defaultRandom().primaryKey().notNull(),
//     name: text("name").notNull().unique(),
//     description: text("description"),
//     isActive: boolean("is_active").default(true).notNull(),
//     sortOrder: integer("sort_order").default(0),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//   },
//   (table) => [
//     index("idx_master_company_types_name").on(table.name),
//     index("idx_master_company_types_active").on(table.isActive),
//   ]
// );

// // Availability Options Master Table
// export const MasterAvailabilityTable = pgTable(
//   "master_availability",
//   {
//     id: uuid("id").defaultRandom().primaryKey().notNull(),
//     name: text("name").notNull().unique(),
//     description: text("description"),
//     isActive: boolean("is_active").default(true).notNull(),
//     sortOrder: integer("sort_order").default(0),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//   },
//   (table) => [
//     index("idx_master_availability_name").on(table.name),
//     index("idx_master_availability_active").on(table.isActive),
//   ]
// );

// // Inquiry Roles Master Table (for contact forms)
// export const MasterInquiryRolesTable = pgTable(
//   "master_inquiry_roles",
//   {
//     id: uuid("id").defaultRandom().primaryKey().notNull(),
//     name: text("name").notNull().unique(),
//     description: text("description"),
//     isActive: boolean("is_active").default(true).notNull(),
//     sortOrder: integer("sort_order").default(0),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//   },
//   (table) => [
//     index("idx_master_inquiry_roles_name").on(table.name),
//     index("idx_master_inquiry_roles_active").on(table.isActive),
//   ]
// );

// // Expertise Areas Master Table (for consultant expertise)
// export const MasterExpertiseAreasTable = pgTable(
//   "master_expertise_areas",
//   {
//     id: uuid("id").defaultRandom().primaryKey().notNull(),
//     name: text("name").notNull().unique(),
//     description: text("description"),
//     category: text("category"), // e.g., "Strategy", "Operations", "Technology"
//     isActive: boolean("is_active").default(true).notNull(),
//     sortOrder: integer("sort_order").default(0),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//   },
//   (table) => [
//     index("idx_master_expertise_areas_name").on(table.name),
//     index("idx_master_expertise_areas_category").on(table.category),
//     index("idx_master_expertise_areas_active").on(table.isActive),
//   ]
// );

// export const MasterIssuingOrganizationsTable = pgTable('master_issuing_organizations', {
//   id: uuid('id').defaultRandom().primaryKey().notNull(),
//   name: text('name').notNull().unique(),
//   description: text('description'), // Added description field
//   createdAt: timestamp('created_at').defaultNow().notNull(),
//   isActive: boolean("is_active").default(true),
//   sortOrder: integer("sort_order").default(0),
//   updatedAt: timestamp('updated_at').defaultNow().notNull(),
// });

// // Master table for certificate names
// export const MasterCertificationsTable = pgTable('master_certifications', {
//   id: uuid('id').defaultRandom().primaryKey().notNull(),
//   name: text('name').notNull().unique(),
//   description: text('description'), // Added description field
//   isActive: boolean("is_active").default(true),
//   sortOrder: integer("sort_order").default(0),
//   createdAt: timestamp('created_at').defaultNow().notNull(),
//   updatedAt: timestamp('updated_at').defaultNow().notNull(),
// });

// // User Roles Master Table
// export const MasterUserRolesTable = pgTable(
//   "master_user_roles",
//   {
//     id: uuid("id").defaultRandom().primaryKey().notNull(),
//     name: text("name").notNull().unique(),
//     description: text("description"),
//     permissions: jsonb("permissions"), // Store role permissions as JSON
//     isActive: boolean("is_active").default(true).notNull(),
//     sortOrder: integer("sort_order").default(0),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//   },
//   (table) => [
//     index("idx_master_user_roles_name").on(table.name),
//     index("idx_master_user_roles_active").on(table.isActive),
//   ]
// );

// // Export types for TypeScript
// export type Certification = InferModel<typeof CertificationsTable>;
// export type NewCertification = InferModel<typeof CertificationsTable, "insert">;
// export type MasterCXOLevel = InferModel<typeof MasterCXOLevelsTable>;
// export type MasterIndustry = InferModel<typeof MasterIndustriesTable>;
// export type MasterExpertiseLevel = InferModel<typeof MasterExpertiseLevelsTable>;
// export type MasterCompanySize = InferModel<typeof MasterCompanySizesTable>;
// export type MasterEducationDegree = InferModel<typeof MasterEducationDegreesTable>;
// export type MasterCompanyType = InferModel<typeof MasterCompanyTypesTable>;
// export type MasterAvailability = InferModel<typeof MasterAvailabilityTable>;
// export type MasterInquiryRole = InferModel<typeof MasterInquiryRolesTable>;
// export type MasterExpertiseArea = InferModel<typeof MasterExpertiseAreasTable>;
// export type MasterUserRole = InferModel<typeof MasterUserRolesTable>;
