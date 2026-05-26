CREATE TABLE IF NOT EXISTS "uniauth_users" (
  "id" text PRIMARY KEY NOT NULL,
  "display_name" text,
  "email" text,
  "phone" text,
  "created_at" timestamp with time zone NOT NULL,
  "updated_at" timestamp with time zone NOT NULL,
  "disabled_at" timestamp with time zone,
  "metadata" jsonb
);

CREATE TABLE IF NOT EXISTS "uniauth_identities" (
  "id" text PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL REFERENCES "uniauth_users"("id") ON DELETE CASCADE,
  "provider" text NOT NULL,
  "provider_user_id" text NOT NULL,
  "status" text NOT NULL,
  "email" text,
  "email_verified" boolean,
  "phone" text,
  "phone_verified" boolean,
  "trust" jsonb,
  "created_at" timestamp with time zone NOT NULL,
  "updated_at" timestamp with time zone NOT NULL,
  "disabled_at" timestamp with time zone,
  "metadata" jsonb,
  CONSTRAINT "uniauth_identities_provider_user_unique" UNIQUE("provider", "provider_user_id")
);

CREATE TABLE IF NOT EXISTS "uniauth_credentials" (
  "id" text PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL REFERENCES "uniauth_users"("id") ON DELETE CASCADE,
  "type" text NOT NULL,
  "subject" text NOT NULL,
  "password_hash" text NOT NULL,
  "created_at" timestamp with time zone NOT NULL,
  "updated_at" timestamp with time zone NOT NULL,
  "metadata" jsonb,
  CONSTRAINT "uniauth_credentials_type_subject_unique" UNIQUE("type", "subject"),
  CONSTRAINT "uniauth_credentials_type_user_unique" UNIQUE("type", "user_id")
);

CREATE TABLE IF NOT EXISTS "uniauth_verifications" (
  "id" text PRIMARY KEY NOT NULL,
  "purpose" text NOT NULL,
  "target" text NOT NULL,
  "provider" text,
  "channel" text,
  "secret_hash" text NOT NULL,
  "status" text NOT NULL,
  "created_at" timestamp with time zone NOT NULL,
  "expires_at" timestamp with time zone NOT NULL,
  "consumed_at" timestamp with time zone,
  "metadata" jsonb
);

CREATE TABLE IF NOT EXISTS "uniauth_sessions" (
  "id" text PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL REFERENCES "uniauth_users"("id") ON DELETE CASCADE,
  "token_hash" text NOT NULL UNIQUE,
  "status" text NOT NULL,
  "created_at" timestamp with time zone NOT NULL,
  "expires_at" timestamp with time zone NOT NULL,
  "revoked_at" timestamp with time zone,
  "last_seen_at" timestamp with time zone,
  "metadata" jsonb
);

CREATE TABLE IF NOT EXISTS "uniauth_audit_events" (
  "id" text PRIMARY KEY NOT NULL,
  "type" text NOT NULL,
  "occurred_at" timestamp with time zone NOT NULL,
  "user_id" text,
  "identity_id" text,
  "session_id" text,
  "metadata" jsonb
);

CREATE INDEX IF NOT EXISTS "uniauth_identities_verified_email_idx"
  ON "uniauth_identities" ("email")
  WHERE "status" = 'active' AND "email_verified" = true;

CREATE INDEX IF NOT EXISTS "uniauth_identities_verified_phone_idx"
  ON "uniauth_identities" ("phone")
  WHERE "status" = 'active' AND "phone_verified" = true;

CREATE INDEX IF NOT EXISTS "uniauth_audit_events_user_idx" ON "uniauth_audit_events" ("user_id", "occurred_at");
