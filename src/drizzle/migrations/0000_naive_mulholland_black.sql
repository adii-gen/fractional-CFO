DO $$ BEGIN
 CREATE TYPE "public"."booking_status" AS ENUM('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'RESCHEDULED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."consultation_type" AS ENUM('DISCOVERY_CALL', 'STRATEGY_SESSION', 'FOLLOW_UP', 'EMERGENCY');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."day_of_week" AS ENUM('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."question_type" AS ENUM('YES_NO', 'SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'TEXT_INPUT', 'NUMBER_INPUT', 'EMAIL_INPUT', 'PHONE_INPUT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."questionnaire_type" AS ENUM('BUSINESS_SETUP', 'CONSULTATION', 'ASSESSMENT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."user_role" AS ENUM('USER', 'ADMIN', 'CONSULTANT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "available_slots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"admin_id" uuid NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL,
	"date" date NOT NULL,
	"slot_duration" integer DEFAULT 30 NOT NULL,
	"max_bookings" integer DEFAULT 1 NOT NULL,
	"consultation_type" "consultation_type" DEFAULT 'DISCOVERY_CALL' NOT NULL,
	"is_available" boolean DEFAULT true,
	"is_recurring" boolean DEFAULT false,
	"recurring_pattern" varchar(50),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "client_success_stories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"testimonial" text NOT NULL,
	"client_name" varchar(255) NOT NULL,
	"client_initials" varchar(10) NOT NULL,
	"designation" varchar(255) NOT NULL,
	"company_name" varchar(255) NOT NULL,
	"rating" numeric(2, 1) DEFAULT '5.0',
	"order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "consultant_blocked_dates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"consultant_id" uuid NOT NULL,
	"blocked_date" date NOT NULL,
	"start_time" time,
	"end_time" time,
	"is_full_day_block" boolean DEFAULT true,
	"reason" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "consultant_weekly_schedule" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"consultant_id" uuid NOT NULL,
	"day_of_week" "day_of_week" NOT NULL,
	"start_time" time NOT NULL,
	"end_time" time NOT NULL,
	"price_per_minute" numeric(10, 2),
	"consultation_type" "consultation_type" DEFAULT 'DISCOVERY_CALL',
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "consultation_bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"consultant_id" uuid NOT NULL,
	"type" "consultation_type" DEFAULT 'DISCOVERY_CALL' NOT NULL,
	"status" "booking_status" DEFAULT 'PENDING' NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL,
	"timezone" varchar(50) DEFAULT 'UTC' NOT NULL,
	"duration_minutes" integer NOT NULL,
	"price_per_minute" numeric(10, 2) NOT NULL,
	"total_price" numeric(10, 2) NOT NULL,
	"currency" varchar(10) DEFAULT 'AED' NOT NULL,
	"user_email" varchar(255) NOT NULL,
	"user_name" varchar(255) NOT NULL,
	"user_phone" varchar(20),
	"meeting_link" text,
	"meeting_platform" varchar(100),
	"meeting_notes" text,
	"consultant_notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "email_verification_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"token" uuid NOT NULL,
	"expires_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "expertise" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"header" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"icon_image" text,
	"order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "faqs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category" varchar(100),
	"question" text NOT NULL,
	"answers" jsonb NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "password_reset_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"token" uuid NOT NULL,
	"expires_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pricing_plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"plan_name" varchar(255) NOT NULL,
	"tagline" varchar(255),
	"structure" varchar(100),
	"head_count" varchar(100),
	"transactions" varchar(100),
	"revenue" varchar(100),
	"budget" varchar(100),
	"compliance" varchar(100),
	"monthly_price" numeric(12, 2),
	"annual_price" numeric(12, 2) NOT NULL,
	"currency" varchar(10) DEFAULT 'AED' NOT NULL,
	"discount_percentage" integer DEFAULT 0,
	"included_features" jsonb NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true,
	"is_featured" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_options" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question_id" uuid NOT NULL,
	"option_text" text NOT NULL,
	"option_value" varchar(255) NOT NULL,
	"next_question_id" uuid,
	"is_terminal" boolean DEFAULT false,
	"result_message" text,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"questionnaire_type" "questionnaire_type" DEFAULT 'BUSINESS_SETUP' NOT NULL,
	"question_text" text NOT NULL,
	"question_type" "question_type" NOT NULL,
	"placeholder" varchar(255),
	"is_required" boolean DEFAULT true,
	"order" integer DEFAULT 0 NOT NULL,
	"is_root" boolean DEFAULT false,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questionnaire_responses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid NOT NULL,
	"question_id" uuid NOT NULL,
	"selected_option_id" uuid,
	"text_answer" text,
	"answered_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questionnaire_results" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid NOT NULL,
	"business_type" varchar(255),
	"country" varchar(100),
	"facility_type" varchar(100),
	"budget_range" varchar(100),
	"expected_revenue" varchar(100),
	"recommended_plan_id" uuid,
	"recommendations" jsonb,
	"is_reviewed" boolean DEFAULT false,
	"reviewed_by" uuid,
	"reviewed_at" timestamp,
	"admin_notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "questionnaire_results_session_id_unique" UNIQUE("session_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questionnaire_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"session_token" uuid DEFAULT gen_random_uuid() NOT NULL,
	"questionnaire_type" "questionnaire_type" DEFAULT 'BUSINESS_SETUP' NOT NULL,
	"current_question_id" uuid,
	"is_completed" boolean DEFAULT false,
	"completed_at" timestamp,
	"user_name" varchar(255),
	"user_email" varchar(255),
	"user_phone" varchar(20),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "questionnaire_sessions_session_token_unique" UNIQUE("session_token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"email_verified" timestamp,
	"email_verif_token" varchar(255),
	"password" varchar(255),
	"mobile" text,
	"role" "user_role" DEFAULT 'USER' NOT NULL,
	"profile_pic" text,
	"google_id" varchar(255),
	"google_access_token" text,
	"google_refresh_token" text,
	"phone" varchar(15),
	"user_type" "user_role",
	"first_name" varchar(100),
	"last_name" varchar(100),
	"is_active" boolean DEFAULT true,
	"is_verified" boolean DEFAULT false,
	"email_verified_at" timestamp,
	"phone_verified_at" timestamp,
	"last_login_at" timestamp,
	"two_factor_enabled" boolean DEFAULT false,
	"two_factor_secret" varchar(32),
	"price_per_minute" numeric(10, 2),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_google_id_unique" UNIQUE("google_id"),
	CONSTRAINT "users_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chatbot_inquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(15),
	"company" varchar(255),
	"status" varchar(50) DEFAULT 'new_inquiry',
	"source" varchar(50) DEFAULT 'chatbot',
	"message" text,
	"user_data" jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "available_slots" ADD CONSTRAINT "available_slots_admin_id_users_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "consultant_blocked_dates" ADD CONSTRAINT "consultant_blocked_dates_consultant_id_users_id_fk" FOREIGN KEY ("consultant_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "consultant_weekly_schedule" ADD CONSTRAINT "consultant_weekly_schedule_consultant_id_users_id_fk" FOREIGN KEY ("consultant_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "consultation_bookings" ADD CONSTRAINT "consultation_bookings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "consultation_bookings" ADD CONSTRAINT "consultation_bookings_consultant_id_users_id_fk" FOREIGN KEY ("consultant_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_options" ADD CONSTRAINT "question_options_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_options" ADD CONSTRAINT "question_options_next_question_id_questions_id_fk" FOREIGN KEY ("next_question_id") REFERENCES "public"."questions"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questionnaire_responses" ADD CONSTRAINT "questionnaire_responses_session_id_questionnaire_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."questionnaire_sessions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questionnaire_responses" ADD CONSTRAINT "questionnaire_responses_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questionnaire_responses" ADD CONSTRAINT "questionnaire_responses_selected_option_id_question_options_id_fk" FOREIGN KEY ("selected_option_id") REFERENCES "public"."question_options"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questionnaire_results" ADD CONSTRAINT "questionnaire_results_session_id_questionnaire_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."questionnaire_sessions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questionnaire_results" ADD CONSTRAINT "questionnaire_results_recommended_plan_id_pricing_plans_id_fk" FOREIGN KEY ("recommended_plan_id") REFERENCES "public"."pricing_plans"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questionnaire_results" ADD CONSTRAINT "questionnaire_results_reviewed_by_users_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questionnaire_sessions" ADD CONSTRAINT "questionnaire_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questionnaire_sessions" ADD CONSTRAINT "questionnaire_sessions_current_question_id_questions_id_fk" FOREIGN KEY ("current_question_id") REFERENCES "public"."questions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "available_slots_admin_id_idx" ON "available_slots" USING btree ("admin_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "available_slots_date_idx" ON "available_slots" USING btree ("date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "available_slots_start_time_idx" ON "available_slots" USING btree ("start_time");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "client_success_stories_order_idx" ON "client_success_stories" USING btree ("order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "consultant_blocked_dates_consultant_id_idx" ON "consultant_blocked_dates" USING btree ("consultant_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "consultant_blocked_dates_blocked_date_idx" ON "consultant_blocked_dates" USING btree ("blocked_date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "consultant_blocked_dates_consultant_date_idx" ON "consultant_blocked_dates" USING btree ("consultant_id","blocked_date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "consultant_weekly_schedule_consultant_id_idx" ON "consultant_weekly_schedule" USING btree ("consultant_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "consultant_weekly_schedule_day_of_week_idx" ON "consultant_weekly_schedule" USING btree ("day_of_week");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "consultant_weekly_schedule_consultant_day_idx" ON "consultant_weekly_schedule" USING btree ("consultant_id","day_of_week");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "consultation_bookings_user_id_idx" ON "consultation_bookings" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "consultation_bookings_consultant_id_idx" ON "consultation_bookings" USING btree ("consultant_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "consultation_bookings_start_time_idx" ON "consultation_bookings" USING btree ("start_time");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "consultation_bookings_status_idx" ON "consultation_bookings" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "consultation_bookings_consultant_start_idx" ON "consultation_bookings" USING btree ("consultant_id","start_time");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_verification_tokens_email_token_key" ON "email_verification_tokens" USING btree ("email","token");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_verification_tokens_token_key" ON "email_verification_tokens" USING btree ("token");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "expertise_order_idx" ON "expertise" USING btree ("order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "faqs_order_idx" ON "faqs" USING btree ("order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "faqs_category_idx" ON "faqs" USING btree ("category");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "password_reset_tokens_email_token_key" ON "password_reset_tokens" USING btree ("email","token");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "password_reset_tokens_token_key" ON "password_reset_tokens" USING btree ("token");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "pricing_plans_order_idx" ON "pricing_plans" USING btree ("order");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "pricing_plans_plan_name_key" ON "pricing_plans" USING btree ("plan_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "question_options_question_id_idx" ON "question_options" USING btree ("question_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "question_options_order_idx" ON "question_options" USING btree ("order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "questions_order_idx" ON "questions" USING btree ("order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "questions_type_idx" ON "questions" USING btree ("questionnaire_type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "questions_is_root_idx" ON "questions" USING btree ("is_root");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "questionnaire_responses_session_id_idx" ON "questionnaire_responses" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "questionnaire_responses_question_id_idx" ON "questionnaire_responses" USING btree ("question_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "questionnaire_results_session_id_idx" ON "questionnaire_results" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "questionnaire_results_is_reviewed_idx" ON "questionnaire_results" USING btree ("is_reviewed");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "questionnaire_sessions_user_id_idx" ON "questionnaire_sessions" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "questionnaire_sessions_session_token_idx" ON "questionnaire_sessions" USING btree ("session_token");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "questionnaire_sessions_type_idx" ON "questionnaire_sessions" USING btree ("questionnaire_type");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_google_id_key" ON "users" USING btree ("google_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_name_email_idx" ON "users" USING btree ("name","email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "inquiries_status_idx" ON "chatbot_inquiries" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "inquiries_email_idx" ON "chatbot_inquiries" USING btree ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "inquiries_created_at_idx" ON "chatbot_inquiries" USING btree ("created_at");