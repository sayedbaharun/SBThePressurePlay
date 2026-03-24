CREATE TABLE "ab_test_events" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"test_name" text NOT NULL,
	"variant_id" text NOT NULL,
	"event_type" text NOT NULL,
	"session_id" text NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contact_messages" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"country" text,
	"subject" text,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "episodes" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"number" integer,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"cover" text,
	"duration" integer,
	"published_at" timestamp NOT NULL,
	"platforms" json,
	"guests" json DEFAULT '[]'::json,
	"topics" json DEFAULT '[]'::json,
	"transcript" text,
	"highlights" json,
	"youtube_id" text,
	"audio_url" text,
	"preview_url" text,
	"waveform_data" json,
	"featured" boolean DEFAULT false,
	CONSTRAINT "episodes_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "guests" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"role" text,
	"bio" text,
	"headshot" text,
	"socials" json,
	"tags" json DEFAULT '[]'::json,
	"episode_slugs" json DEFAULT '[]'::json,
	CONSTRAINT "guests_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "newsletter_subscribers" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"phone" text,
	"country" text,
	"subscribed_at" timestamp DEFAULT now() NOT NULL,
	"confirmed" boolean DEFAULT false,
	"referral_code" text,
	"referred_by" text,
	"tier" text DEFAULT 'insider',
	"signup_number" integer,
	"referral_count" integer DEFAULT 0,
	CONSTRAINT "newsletter_subscribers_email_unique" UNIQUE("email"),
	CONSTRAINT "newsletter_subscribers_referral_code_unique" UNIQUE("referral_code")
);
--> statement-breakpoint
CREATE TABLE "topics" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"color" text DEFAULT '#FF1B6B',
	CONSTRAINT "topics_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
