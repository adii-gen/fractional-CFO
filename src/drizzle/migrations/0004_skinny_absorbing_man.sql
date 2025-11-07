ALTER TYPE "user_role" ADD VALUE 'ADMIN';--> statement-breakpoint
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
ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "google_id" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "google_access_token" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "google_refresh_token" text;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "client_success_stories_order_idx" ON "client_success_stories" USING btree ("order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "expertise_order_idx" ON "expertise" USING btree ("order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "faqs_order_idx" ON "faqs" USING btree ("order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "faqs_category_idx" ON "faqs" USING btree ("category");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "pricing_plans_order_idx" ON "pricing_plans" USING btree ("order");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "pricing_plans_plan_name_key" ON "pricing_plans" USING btree ("plan_name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_google_id_key" ON "users" USING btree ("google_id");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_google_id_unique" UNIQUE("google_id");