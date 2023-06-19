CREATE TABLE "users" (
  "user_id" SERIAL PRIMARY KEY,
  "username" varchar UNIQUE,
  "email" varchar UNIQUE,
  "password" varchar,
  "jwt" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "tokenBlacklist" (
  "id" serial PRIMARY KEY,
  "user_id" integer,
  "token_id" varchar(255),
  "blacklisted_at" timestamp
);

CREATE TABLE "diagrams" (
  "id" serial PRIMARY KEY,
  "diagram_data" varchar,
  "name" varchar,
  "slug" varchar UNIQUE,
  "description" varchar,
  "created_at" timestamp,
  "updated_at" timestamp,
  "created_by" integer,
  "sharing_settings" varchar
);

CREATE TABLE "instructions" (
  "id" serial PRIMARY KEY,
  "diagram_id" integer,
  "node_id" varchar,
  "type" varchar,
  "name" varchar,
  "slug" varchar UNIQUE,
  "description" varchar,
  "parameters" varchar,
  "priority" integer,
  "scheduled_time" timestamp,
  "retry_count" integer,
  "max_retry" integer,
  "created_at" timestamp,
  "updated_at" timestamp,
  "created_by" integer
);

CREATE TABLE "jobs" (
  "job_id" integer PRIMARY KEY,
  "instruction_id" integer,
  "trigger_time" timestamp,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "diagram_instructions" (
  "diagram_id" integer PRIMARY KEY,
  "node_id" varchar,
  "node_type" varchar,
  "parameters" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "avatars" (
  "id" serial PRIMARY KEY,
  "user_id" integer,
  "image_url" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "user_roles" (
  "user_id" integer PRIMARY KEY,
  "role" varchar
);

CREATE TABLE "action_logs" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "action" varchar,
  "timestamp" timestamp
);

CREATE TABLE "password_resets" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "reset_token" varchar,
  "expiry_time" timestamp
);

CREATE TABLE "email_templates" (
  "id" integer PRIMARY KEY,
  "template_name" varchar,
  "template_content" varchar
);

CREATE TABLE "notifications" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "content" varchar,
  "created_at" timestamp,
  "is_read" boolean
);

ALTER TABLE "diagrams" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("user_id");

ALTER TABLE "instructions" ADD FOREIGN KEY ("diagram_id") REFERENCES "diagrams" ("id");

ALTER TABLE "instructions" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("user_id");

ALTER TABLE "jobs" ADD FOREIGN KEY ("instruction_id") REFERENCES "instructions" ("id");

ALTER TABLE "diagram_instructions" ADD FOREIGN KEY ("diagram_id") REFERENCES "diagrams" ("id");

ALTER TABLE "avatars" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "user_roles" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "action_logs" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "password_resets" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "notifications" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");