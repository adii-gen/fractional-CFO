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
CREATE TABLE IF NOT EXISTS "consultation_bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"admin_id" uuid,
	"type" "consultation_type" DEFAULT 'DISCOVERY_CALL' NOT NULL,
	"status" "booking_status" DEFAULT 'PENDING' NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL,
	"timezone" varchar(50) DEFAULT 'UTC' NOT NULL,
	"user_email" varchar(255) NOT NULL,
	"user_name" varchar(255) NOT NULL,
	"user_phone" varchar(20),
	"meeting_link" text,
	"meeting_platform" varchar(100),
	"meeting_notes" text,
	"admin_notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
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
 ALTER TABLE "consultation_bookings" ADD CONSTRAINT "consultation_bookings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "consultation_bookings" ADD CONSTRAINT "consultation_bookings_admin_id_users_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "available_slots_admin_id_idx" ON "available_slots" USING btree ("admin_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "available_slots_date_idx" ON "available_slots" USING btree ("date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "available_slots_start_time_idx" ON "available_slots" USING btree ("start_time");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "consultation_bookings_user_id_idx" ON "consultation_bookings" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "consultation_bookings_admin_id_idx" ON "consultation_bookings" USING btree ("admin_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "consultation_bookings_start_time_idx" ON "consultation_bookings" USING btree ("start_time");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "consultation_bookings_status_idx" ON "consultation_bookings" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "inquiries_status_idx" ON "chatbot_inquiries" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "inquiries_email_idx" ON "chatbot_inquiries" USING btree ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "inquiries_created_at_idx" ON "chatbot_inquiries" USING btree ("created_at");