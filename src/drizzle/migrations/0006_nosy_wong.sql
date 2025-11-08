DO $$ BEGIN
 CREATE TYPE "public"."day_of_week" AS ENUM('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TYPE "user_role" ADD VALUE 'CONSULTANT';--> statement-breakpoint
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
ALTER TABLE "consultation_bookings" RENAME COLUMN "admin_id" TO "consultant_id";--> statement-breakpoint
ALTER TABLE "consultation_bookings" RENAME COLUMN "admin_notes" TO "consultant_notes";--> statement-breakpoint
ALTER TABLE "consultation_bookings" DROP CONSTRAINT "consultation_bookings_admin_id_users_id_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "consultation_bookings_admin_id_idx";--> statement-breakpoint
ALTER TABLE "consultation_bookings" ALTER COLUMN "consultant_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "consultation_bookings" ADD COLUMN "duration_minutes" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "consultation_bookings" ADD COLUMN "price_per_minute" numeric(10, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "consultation_bookings" ADD COLUMN "total_price" numeric(10, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "consultation_bookings" ADD COLUMN "currency" varchar(10) DEFAULT 'AED' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "price_per_minute" numeric(10, 2);--> statement-breakpoint
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
CREATE INDEX IF NOT EXISTS "consultant_blocked_dates_consultant_id_idx" ON "consultant_blocked_dates" USING btree ("consultant_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "consultant_blocked_dates_blocked_date_idx" ON "consultant_blocked_dates" USING btree ("blocked_date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "consultant_blocked_dates_consultant_date_idx" ON "consultant_blocked_dates" USING btree ("consultant_id","blocked_date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "consultant_weekly_schedule_consultant_id_idx" ON "consultant_weekly_schedule" USING btree ("consultant_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "consultant_weekly_schedule_day_of_week_idx" ON "consultant_weekly_schedule" USING btree ("day_of_week");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "consultant_weekly_schedule_consultant_day_idx" ON "consultant_weekly_schedule" USING btree ("consultant_id","day_of_week");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "consultation_bookings" ADD CONSTRAINT "consultation_bookings_consultant_id_users_id_fk" FOREIGN KEY ("consultant_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "consultation_bookings_consultant_id_idx" ON "consultation_bookings" USING btree ("consultant_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "consultation_bookings_consultant_start_idx" ON "consultation_bookings" USING btree ("consultant_id","start_time");