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
CREATE INDEX IF NOT EXISTS "questionnaire_sessions_type_idx" ON "questionnaire_sessions" USING btree ("questionnaire_type");